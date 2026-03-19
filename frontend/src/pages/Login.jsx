import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DialogBox from "../components/DialogBox";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const [dialog, setDialog] = useState({
    open: false,
    type: "info",
    title: "",
    message: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const showDialog = (type, title, message) => {
    setDialog({ open: true, type, title, message });
  };

  // Inside Login.jsx
const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      
      console.log("Login Response Data:", res.data); 

      // 1. Destructure the ID from the response
      const { role, token, id } = res.data; 

      // 2. Save the individual userId string (Fixes the 'null' error)
      localStorage.setItem("userId", id);
      
      // 3. Save the token and full object
      localStorage.setItem("token", token);
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));

      if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
      else navigate("/admin");
    } catch (error) {
      showDialog("error", "Login Failed", "Invalid credentials.");
    }
  };

  const handleSendOtp = async () => {
    if (!form.email || !form.username) {
      showDialog("info", "Details Required", "Please enter username and email first.");
      return;
    }
    try {
      setIsVerifying(true);
      await axios.post("http://localhost:5000/api/auth/send-otp", { email: form.email });
      setOtpSent(true);
      showDialog("success", "OTP Sent", "Please check your email for the 6-digit code.");
    } catch (error) {
      showDialog("error", "Failed", error.response?.data?.message || "Error sending OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/verify-and-register", {
        name: form.username,
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
        otp: otpInput,
      });

      showDialog("success", "Registration Successful", "Account created! You can now login.");
      setOtpSent(false);
      setOtpInput("");
    } catch (error) {
      showDialog("error", "Verification Failed", error.response?.data?.message || "Invalid OTP.");
    }
  };

  useEffect(() => {
    localStorage.removeItem("loggedInUser");
  }, []);

  const textColor = darkMode ? "text-white" : "text-gray-800";
  const inputTextColor = darkMode ? "text-white placeholder-gray-400" : "text-gray-800 placeholder-gray-500";
  const inputBg = darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-300 border-gray-300";
  const buttonBg = darkMode ? "bg-indigo-700 hover:bg-indigo-800" : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <div
      className={`flex h-screen items-center justify-center font-[Poppins] transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-indigo-400"
      }`}
      style={{ perspective: "1200px" }}
    >
      {/* Dark Mode Toggle */}
      <motion.button
        id="darkModeToggle"
        onClick={() => setDarkMode(!darkMode)}
        whileTap={{ scale: 0.8 }}
        animate={{ rotate: darkMode ? 360 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-6 w-10 right-6 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
      >
        <i className={darkMode ? "ri-sun-fill" : "ri-moon-fill"}></i>
      </motion.button>

      {/* Form Card */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          rotateY: darkMode ? 360 : 0,
          scale: darkMode ? 0.95 : 1,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={`p-8 rounded-2xl shadow-2xl w-130 min-h-[500px] h-auto transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.h2
          transition={{ duration: 0.6 }}
          className={`text-3xl font-extrabold mb-6 text-center transition-colors duration-500 outline-none ${inputTextColor}`}
        >
          Welcome to YCCE College portal
        </motion.h2>

        <input
          type="text"
          autoComplete="off"
          className={`w-full mb-4 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-500 ${inputBg} ${inputTextColor}`}
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          autoComplete="off"
          className={`w-full mb-4 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-500 ${inputBg} ${inputTextColor}`}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          autoComplete="new-password"
          className={`w-full mb-4 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-500 ${inputBg} ${inputTextColor}`}
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className={`w-full mb-6 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-500 ${inputBg} ${inputTextColor}`}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">👨‍🎓 Student</option>
          <option value="teacher">👩‍🏫 Teacher</option>
          <option value="admin">⚙️ Admin</option>
        </select>

        {otpSent && (
          <motion.input
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            type="text"
            placeholder="Enter 6-digit OTP"
            className={`w-full mb-4 p-3 rounded-lg border-2 border-indigo-500 font-mono tracking-widest text-center transition-colors duration-500 ${inputBg} ${inputTextColor}`}
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
          />
        )}

        {!otpSent ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendOtp}
            disabled={isVerifying}
            className={`w-full mb-4 py-3 rounded-lg font-semibold shadow-md text-white ${
              isVerifying ? "bg-gray-500" : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {isVerifying ? "Sending..." : "Get OTP to Register"}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRegister}
            className="w-full mb-4 py-3 rounded-lg font-semibold shadow-md text-white bg-green-600 hover:bg-green-700"
          >
            Verify & Complete Registration
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all duration-300 text-white ${buttonBg}`}
        >
          Login
        </motion.button>

        <p className={`text-sm text-center mt-4 transition-colors duration-500 ${textColor}`}>
          Forgot your password?{" "}
          <span
            onClick={() => navigate("/reset-password")}
            className="text-indigo-400 font-semibold cursor-pointer hover:underline"
          >
            Reset here
          </span>
        </p>
      </motion.div>

      <DialogBox
        open={dialog.open}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        onClose={() => setDialog({ ...dialog, open: false })}
      />
    </div>
  );
}