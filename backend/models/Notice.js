const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  type: { type: String, enum: ["Exam", "Assignment", "General"], default: "General" },
  // Changing this to Date type for better flexibility
  date: { type: Date, default: Date.now }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notice", NoticeSchema);