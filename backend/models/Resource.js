const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Maths Notes"
  link: { type: String, required: true },  // e.g., "https://drive.google.com/..."
  subject: { type: String },               // e.g., "Maths"
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resource", ResourceSchema);