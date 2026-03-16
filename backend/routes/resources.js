const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");

// ✅ 1. POST: Teacher adds a new resource
router.post("/add", async (req, res) => {
  try {
    const { title, link, subject } = req.body;
    const newResource = new Resource({ title, link, subject });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 2. GET: Everyone fetches resources
router.get("/all", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 3. DELETE: Teacher removes a resource
router.delete("/:id", async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.json({ message: "Resource deleted" });
});

module.exports = router;