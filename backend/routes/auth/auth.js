const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Models - Ensure these paths match your folder structure
const Student = require("../../models/User"); // You mentioned Student is in User collection
const Teacher = require("../../models/Teacher");
const Admin = require("../../models/Admin");
const OTP = require("../../models/OTP");
const sendEmail = require("../../utils/sendEmail");

// --- 1. FORGOT PASSWORD ---
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        // Save OTP to temp collection for verification later
        await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });

        await sendEmail({
            email: email,
            subject: "YCCE Security: Your OTP Code",
            html: `<h2>Your verification code is ${otp}.</h2><p>It expires in 10 minutes.</p>`
        });

        res.status(200).json({ message: "OTP sent to email!" });
    } catch (err) {
        res.status(500).json({ error: "Email could not be sent." });
    }
});

// --- 2. SEND REGISTRATION OTP ---
router.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    try {
        // Check if user exists in ANY collection before sending OTP
        const existingUser = await Student.findOne({ email }) || 
                             await Teacher.findOne({ email }) || 
                             await Admin.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "Email already registered" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });

        await sendEmail({
            email,
            subject: "Verify your YCCE Account",
            html: `<h1>Your Registration OTP is: ${otp}</h1>`
        });

        res.status(200).json({ message: "OTP sent to email" });
    } catch (err) {
        res.status(500).json({ message: "Error sending email" });
    }
});

// --- 3. FINAL REGISTRATION ---
router.post("/verify-and-register", async (req, res) => {
    const { name, username, email, password, role, otp } = req.body;

    try {
        const validOtp = await OTP.findOne({ email, otp });
        if (!validOtp) return res.status(400).json({ message: "Invalid or expired OTP" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { name, username, email, password: hashedPassword, role };

        let newUser;
        if (role === "student") {
            newUser = new Student(userData);
        } else if (role === "teacher") {
            newUser = new Teacher(userData);
        } else if (role === "admin") {
            newUser = new Admin(userData);
        } else {
            return res.status(400).json({ message: "Invalid role selected" });
        }

        await newUser.save();
        await OTP.deleteOne({ email }); 

        res.status(201).json({ message: `${role} account created successfully!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Registration failed. Email may already exist." });
    }
});

// --- 4. LOGIN ---
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body; // Added role to make searching faster

    try {
        let user;
        // Search in the specific collection based on the role chosen at login
        if (role === "student") user = await Student.findOne({ email });
        else if (role === "teacher") user = await Teacher.findOne({ email });
        else if (role === "admin") user = await Admin.findOne({ email });

        if (!user) return res.status(404).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "your_default_secret",
            { expiresIn: "1d" }
        );

        res.json({
            token,
            id: user._id,
            role: user.role,
            username: user.username,
            name: user.name,
              email: user.email,
              department: user.department || null // Only teachers will have this
        });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;