const express = require("express");

const login = require("./login");
const register = require("./register");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

const router = express.Router();

router.use("/login", login);
router.use("/register", register);
router.use("/forgot-password", forgotPassword);
router.use("/reset-password", resetPassword);

module.exports = router;
