// server/src/app.js
const express = require("express");
const cors = require("cors");

const app = express();

// middleware
//app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Vite default
  credentials: true
}));
app.use(express.json());

// health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "backend up" });
});

const healthRoutes = require("./routes/healthRoutes");
app.use("/api", healthRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

module.exports = app;



