const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// --- 1. GET ALL COURSES ---
router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. SEED DATA (TEMPORARY) ---
router.get("/seed", async (req, res) => {
  try {
    const sampleCourses = [
      {
        title: "Advanced Web Development",
        code: "CS501",
        instructor: "Dr. A. Verma",
        duration: "4 Months",
        status: "Ongoing",
        description: "Master React, Node.js, and MongoDB.",
        enrolledStudents: []
      },
      {
        title: "Data Structures & Algorithms",
        code: "CS302",
        instructor: "Prof. S. Patil",
        duration: "5 Months",
        status: "Ongoing",
        description: "In-depth study of arrays, trees, and graphs.",
        enrolledStudents: []
      }
    ];
    await Course.deleteMany({}); 
    await Course.insertMany(sampleCourses);
    res.send("Database Seeded Successfully!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// --- 3. TEACHER: ADD NEW COURSE ---
router.post("/add", async (req, res) => {
  try {
    const { title, code, instructor, duration, description, syllabus } = req.body;
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) return res.status(400).json({ error: "Course code already exists!" });

    const newCourse = new Course({
      title,
      code,
      instructor,
      duration,
      description,
      syllabus: typeof syllabus === 'string' ? syllabus.split(",").map(t => t.trim()) : syllabus,
      enrolledStudents: []
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. STUDENT: ENROLL/UNENROLL ---
router.post("/enroll", async (req, res) => {
  const { courseId, username } = req.body;
  try {
    await Course.findByIdAndUpdate(courseId, { $addToSet: { enrolledStudents: username } });
    res.status(200).json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/unenroll", async (req, res) => {
  const { courseId, username } = req.body;
  try {
    await Course.findByIdAndUpdate(courseId, { $pull: { enrolledStudents: username } });
    res.status(200).json({ message: "Unenrolled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. GET SINGLE COURSE BY ID (KEEP THIS AT THE BOTTOM) ---
// This route is dynamic. If it were at the top, it would try to treat "/all" as an ID.
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found in database" });
    }
    res.json(course);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Invalid Course ID format" });
  }
});

module.exports = router;