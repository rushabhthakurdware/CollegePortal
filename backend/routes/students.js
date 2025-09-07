const express = require("express");
const router = express.Router();

// dummy endpoint
router.get("/", (req, res) => {
  res.json({ message: "Student API working" });
});

module.exports = router;
