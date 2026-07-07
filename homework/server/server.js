const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "db.json");
const GENERATED_PATH = path.join(__dirname, "generated_articles.json");

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Use /articles, /articles-html or /article-html");
});

app.get("/articles", (req, res) => {
  fs.readFile(DB_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.articles || jsonData);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.get("/articles-html", (req, res) => {
  fs.readFile(GENERATED_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading generated JSON:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.blogList);
    } catch (parseError) {
      console.error("Error parsing generated JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.get("/article-html", (req, res) => {
  fs.readFile(GENERATED_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading generated JSON:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.articlePage);
    } catch (parseError) {
      console.error("Error parsing generated JSON:", parseError);
      res.status(500).json({ error: "Invalid JSON format" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
