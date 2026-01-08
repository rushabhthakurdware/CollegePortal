const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: String, default: "student" }
});

module.exports = mongoose.model("Student", StudentSchema);
