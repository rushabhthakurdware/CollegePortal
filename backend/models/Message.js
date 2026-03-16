const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: String, default: "System/Teacher" },
  recipient: { type: String, required: true }, // The username of the student
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", MessageSchema);