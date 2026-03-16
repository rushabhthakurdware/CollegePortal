const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },

  studentUsername: { type: String }, // To link to a specific student
  marks: { type: Number, default: null },
  grade: { type: String, default: "" },
  feedback: { type: String, default: "" },
  status: { type: String, default: "Pending" }

});

module.exports = mongoose.model("Assignment", AssignmentSchema);