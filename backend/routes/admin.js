const express = require("express");
const router = express.Router();

// ✅ Import Admin model
const Admin = require("../models/Admin");

// GET all admins from MongoDB
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
