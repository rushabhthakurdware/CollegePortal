import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    try {
      // later you’ll connect backend here
      const res = await axios.post("http://localhost:5000/auth/forgot-password", { email });
      alert(res.data.message);
    } catch (err) {
      alert("❌ Failed to send reset link!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-indigo-400 font-[Poppins]">
      <div className="p-8 bg-white rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Reset Password
        </h2>

        <input
          type="email"
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
        >
          Send Reset Link
        </motion.button>
      </div>
    </div>
  );
}
