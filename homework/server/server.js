const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const ARTICLES_PATH = path.join(__dirname, "articles.json");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Use /articles for the short list, /articles/:slug for a single article's full detail, or /cats for the cats API (see README.md)"
  );
});

// Short data for the home / articles list page
app.get("/articles", (req, res) => {
  fs.readFile(ARTICLES_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.articles);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// Detailed data for a single article page
app.get("/articles/:slug", (req, res) => {
  fs.readFile(ARTICLES_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      const jsonData = JSON.parse(data);
      const article = jsonData.articleDetails[req.params.slug];
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.json(article);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

// ---------------------------------------------------------------------------
// Cats: an in-memory CRUD API for the Next.js caching lesson.
// Every /cats call waits CATS_DELAY_MS, like a slow database would.
// ---------------------------------------------------------------------------

const CATS_PATH = path.join(__dirname, "cats.json");
const CATS_DELAY_MS = Number(process.env.CATS_DELAY_MS ?? 500);
const CATS_SEED = JSON.parse(fs.readFileSync(CATS_PATH, "utf8")).cats;

// Changes live only in memory: restarting the server (or POST /cats/reset) brings the seed back
let cats = structuredClone(CATS_SEED);
let nextCatId = Math.max(...CATS_SEED.map((cat) => cat.id)) + 1;

const findCat = (id) => cats.find((cat) => cat.id === Number(id));

const clockTime = () => {
  const now = new Date();
  return `${now.toTimeString().slice(0, 8)}.${String(now.getMilliseconds()).padStart(3, "0")}`;
};

// Returns an error message, or null when the body is valid
const validateCat = (body, { partial }) => {
  const { name, breed, imageUrl, likes } = body;
  if (!partial || name !== undefined) {
    if (typeof name !== "string" || !name.trim() || name.trim().length > 30) {
      return "name must be a non-empty string of at most 30 characters";
    }
  }
  if (breed !== undefined && (typeof breed !== "string" || breed.trim().length > 30)) {
    return "breed must be a string of at most 30 characters";
  }
  if (imageUrl !== undefined && (typeof imageUrl !== "string" || !/^(\/images\/|https?:\/\/)/.test(imageUrl))) {
    return "imageUrl must start with /images/ or http(s)://";
  }
  if (likes !== undefined && (!Number.isInteger(likes) || likes < 0)) {
    return "likes must be a non-negative integer";
  }
  return null;
};

// Cat pictures, served without delay
app.use("/images", express.static(path.join(__dirname, "images")));

// Delay + one log line per call, so you can see every request that reaches the "database"
app.use("/cats", (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(`[${clockTime()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - start} ms)`);
  });
  setTimeout(next, CATS_DELAY_MS);
});

app.get("/cats", (req, res) => {
  res.json(cats);
});

app.get("/cats/:id", (req, res) => {
  const cat = findCat(req.params.id);
  if (!cat) {
    return res.status(404).json({ error: "Cat not found" });
  }
  res.json(cat);
});

app.post("/cats", (req, res) => {
  const error = validateCat(req.body, { partial: false });
  if (error) {
    return res.status(400).json({ error });
  }
  const cat = {
    id: nextCatId++,
    name: req.body.name.trim(),
    breed: req.body.breed?.trim() || "Unknown",
    imageUrl: req.body.imageUrl ?? "/images/shadow.jpg",
    likes: 0,
  };
  cats.push(cat);
  res.status(201).json(cat);
});

app.patch("/cats/:id", (req, res) => {
  const cat = findCat(req.params.id);
  if (!cat) {
    return res.status(404).json({ error: "Cat not found" });
  }
  const error = validateCat(req.body, { partial: true });
  if (error) {
    return res.status(400).json({ error });
  }
  const { name, breed, imageUrl, likes } = req.body;
  if (name !== undefined) cat.name = name.trim();
  if (breed !== undefined) cat.breed = breed.trim();
  if (imageUrl !== undefined) cat.imageUrl = imageUrl;
  if (likes !== undefined) cat.likes = likes;
  res.json(cat);
});

// Adds one like on the server, whatever number the client last saw
app.post("/cats/:id/like", (req, res) => {
  const cat = findCat(req.params.id);
  if (!cat) {
    return res.status(404).json({ error: "Cat not found" });
  }
  cat.likes += 1;
  res.json(cat);
});

app.delete("/cats/:id", (req, res) => {
  const cat = findCat(req.params.id);
  if (!cat) {
    return res.status(404).json({ error: "Cat not found" });
  }
  cats = cats.filter((other) => other.id !== cat.id);
  res.status(204).end();
});

// Puts the seed data back, handy between lesson steps
app.post("/cats/reset", (req, res) => {
  cats = structuredClone(CATS_SEED);
  nextCatId = Math.max(...CATS_SEED.map((cat) => cat.id)) + 1;
  res.json(cats);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
