const express = require("express");
const router = express.Router();

// ✅ IMPORT STUDENT MODEL
const Student = require("../models/Student");

// GET all students from MongoDB
router.get("/:username", async (req, res) => {
  try {
    const student = await Student.findOne({
      username:req.params.username
    });
    if(!student){return res.status(404).json({message:"Student not found"})}
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
