const express = require("express");
const router = express.Router();
const Student = require("../models/Student"); // ✅ Import your Student model

router.get("/stats/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    // 🛑 Check if studentId is actually valid before querying
    if (!studentId || studentId === "null") {
        return res.status(400).json({ message: "Invalid Student ID" });
    }

    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const present = student.presentCount || 0;
    const absent = student.absentCount || 0;
    const total = present + absent;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.json({ total, present, absent, percentage });
  } catch (err) {
    // This will catch the error if the ID string is malformed
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;