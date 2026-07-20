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
  res.send("Use /articles for the short list or /articles/:slug for a single article's full detail");
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
