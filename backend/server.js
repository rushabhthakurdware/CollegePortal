const express = require("express");
const router = express.Router(); // ✅ ADD THIS
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();



dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

// Import routes

// server.js - Change this line:
const authRoutes = require("./routes/auth/auth");
const paymentRoutes = require("./routes/payments");

const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teacher");
const adminRoutes = require("./routes/admin");

const attedanceRoutes = require("./routes/attendance");
const noticeRoutes = require("./routes/notices");
const resourceRoutes = require("./routes/resources");

const messageRoutes = require("./routes/messages");// Use routes
const assignmentRoutes = require("./routes/assignments");
const payment = require("./models/Payment");
const courseRoutes = require("./routes/courses"); // 1. Import

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/students", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/admins", adminRoutes);

app.use("/api/attendance", attedanceRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/resources", resourceRoutes);

app.use("/api/messages", messageRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/courses", courseRoutes); // 2. Register

const PORT =process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
module.exports = app;