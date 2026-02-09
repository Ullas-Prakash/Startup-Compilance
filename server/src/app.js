// server/src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "backend up" });
});

module.exports = app;
