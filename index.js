require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Entry = require("./models/Entry");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
console.log("MONGO_URI =", process.env.MONGO_URI);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// POST API
app.post("/api/entry", async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const { name, email, howDidYouKnow } = req.body;

    const entry = new Entry({
      name,
      email,
      howDidYouKnow,
    });

    const savedEntry = await entry.save();

    console.log("Saved Successfully:", savedEntry);

    res.status(201).json({
      success: true,
      message: "Entry saved successfully",
      data: savedEntry,
    });
  } catch (err) {
    console.error("❌ Save Error:", err);

    res.status(500).json({
      success: false,
      message: "Unable to save entry",
      error: err.message,
    });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
