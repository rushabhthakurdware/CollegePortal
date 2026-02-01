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

  const showDialog = (type, title, message) => {
    setDialog({ open: true, type, title, message });
  };
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form);

      const { role, username } = res.data;

      // Save full logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(res.data));

      // Redirect based on role
      if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
      else navigate("/admin");
    } catch {
      showDialog(
        "error",
        "Login Failed",
        "Invalid username or password. Please try again.",
      );
    }
  };

  const handleRegister = async () => {
    console.log("REGISTER BUTTON CLICKED"); // 🔥 DEBUG LINE

    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      console.log("REGISTER RESPONSE:", res.data);
      showDialog(
        "success",
        "Registration Successful",
        "Your account has been created. Please login.",
      );
    } catch (error) {
      showDialog(
        "error",
        "Registration Failed",
        error.response?.data?.msg || "Please check your details and try again.",
      );
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      showDialog(
        "info",
        "Email Required",
        "Please enter your email to reset your password.",
      );
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email: form.email, role: form.role },
      );
      showDialog("success", "Password Reset", res.data.msg);
    } catch (error) {
      showDialog(
        "error",
        "Reset Failed",
        error.response?.data?.msg || "Password reset failed.",
      );
    }
  };

  useEffect(() => {
    localStorage.removeItem("loggedInUser");
  }, []);
  // Dynamic classes for dark/light mode
  const textColor = darkMode ? "text-white" : "text-gray-800";

  const inputTextColor = darkMode
    ? "text-white placeholder-gray-400"
    : "text-gray-800 placeholder-gray-500";

  const inputBg = darkMode
    ? "bg-gray-700 border-gray-600"
    : "bg-gray-300 border-gray-300";

  const buttonBg = darkMode
    ? "bg-indigo-700 hover:bg-indigo-800"
    : "bg-indigo-600 hover:bg-indigo-700";

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
        className="absolute top-6  w-10 right-6 p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition"
      >
        <i className={darkMode ? "ri-sun-fill" : "ri-moon-fill"}></i>
      </motion.button>

      {/* Form Card */}
      <motion.div
        initial={{ y: -100, opacity: 0 }} // starts 50px above and invisible
        animate={{
          y: 0, // slides down to normal position
          opacity: 1, // fades in
          rotateY: darkMode ? 360 : 0, // 3D rotation
          scale: darkMode ? 0.95 : 1, // shrink slightly in dark mode
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={`p-8 rounded-2xl shadow-2xl w-130 h-130 transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Title */}
        <motion.h2
          //   animate={{ opacity: darkMode ? 0 : 1 }}
          transition={{ duration: 0.6 }}
          //   style={{ backfaceVisibility: "hidden" }}
          className={`text-3xl font-extrabold mb-6 text-center transition-colors duration-500 outline-none  ${inputTextColor}`}
        >
          Welcome to YCCE College portal
        </motion.h2>

        {/* Inputs */}
        <input
          type="text"
          autoComplete="off"
          className={`w-full mb-4 p-3 rounded-lg  focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-500 ${inputBg} ${inputTextColor}`}
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

        {/* Select */}
        <select
          className={`w-full mb-6 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none transition-colors duration-500 ${inputBg} ${inputTextColor}`}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="student">👨‍🎓 Student</option>
          <option value="teacher">👩‍🏫 Teacher</option>
          <option value="admin">⚙️ Admin</option>
        </select>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegister}
          className={`w-full mb-4 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 text-white ${
            darkMode
              ? "bg-green-700 hover:bg-green-800"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Register
        </motion.button>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className={`w-full py-3 rounded-lg font-semibold shadow-md transition-all duration-300 text-white ${buttonBg}`}
        >
          Login
        </motion.button>

        {/* Forgot Password */}
        <p
          className={`text-sm text-center mt-4 transition-colors duration-500 ${textColor}`}
        >
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
