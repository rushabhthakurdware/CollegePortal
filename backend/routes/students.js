const express = require("express");
const router = express.Router();

// ✅ IMPORT STUDENT MODEL
const Student = require("../models/Student");

// GET all students from MongoDB
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
