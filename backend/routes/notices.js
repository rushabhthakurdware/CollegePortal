const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// 1. POST a new notice (Teacher/Admin uses this)
router.post("/add", async (req, res) => {
  try {
    const newNotice = new Notice(req.body);
    const savedNotice = await newNotice.save();
    res.status(201).json(savedNotice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET all notices (Student Dashboard uses this)
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE: Remove a notice by ID
router.delete("/:id", async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notice" });
  }
});
module.exports = router;