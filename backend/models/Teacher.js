const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "teacher" }
});

module.exports = mongoose.model("Teacher", TeacherSchema);
