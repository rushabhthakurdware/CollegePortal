const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Added this as your auth.js uses 'name'
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["student"], // If this collection is ONLY for students, lock it to student
    default: "student"
  },
  department: { type: String },
  section: { type: String },
  rollNo: { type: String }, // Useful for YCCE records
  
  // Attendance tracking
  presentCount: { type: Number, default: 0 },
  absentCount: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);