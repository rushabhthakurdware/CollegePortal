const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// ✅ Post a new assignment
router.post("/add", async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all assignments (sorted by closest deadline)
router.get("/all", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT: Teacher updates the grade for a specific assignment
router.put("/grade/:id", async (req, res) => {
  try {
    const { marks, grade, feedback } = req.body;
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      { marks, grade, feedback, status: "Graded" },
      { new: true }
    );
    res.json(updatedAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;