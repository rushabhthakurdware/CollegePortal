const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  instructor: { type: String, required: true },
  duration: { type: String, default: "4 Months" },
  status: { type: String, enum: ["Ongoing", "Completed"], default: "Ongoing" },
  description: { type: String },
  syllabus: [String], // Array of topics
  enrolledStudents: [{ type: String }] // Array of student usernames
});

module.exports = mongoose.model("Course", CourseSchema);