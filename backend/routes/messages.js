const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Send a notification to a specific student
router.post("/send", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch notifications for the logged-in student
router.get("/user/:username", async (req, res) => {
  try {
    const messages = await Message.find({ recipient: req.params.username }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;