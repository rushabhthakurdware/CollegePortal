import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    otp: "", // Added OTP field
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // Basic Validation
    if (!form.email || !form.otp || !form.newPassword) {
      alert("All fields (Email, OTP, and New Password) are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://college-portal-backend-xi64.onrender.com/auth/reset-password",
        {
          email: form.email,
          otp: form.otp, // Send OTP to backend
          newPassword: form.newPassword,
        }
      );

      alert(res.data.msg);
      // Redirect to login page after successful reset
      navigate("/login"); 
    } catch (error) {
      alert(error.response?.data?.msg || "Password reset failed. Check your OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-400 min-h-screen flex items-center justify-center p-4 font-[Poppins]"> 
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Reset Password</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">Enter the code sent to your YCCE email</p>

        <div className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Your Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* OTP Input */}
          <input
            type="text"
            placeholder="6-Digit OTP"
            maxLength="6"
            value={form.otp}
            onChange={(e) => setForm({ ...form, otp: e.target.value })}
            className="p-3 rounded-lg w-full border-2 border-indigo-100 focus:border-indigo-500 outline-none font-mono tracking-[0.5em] text-center text-xl"
          />

          {/* New Password Input */}
          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="p-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Confirm Button */}
          <button 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
            onClick={handleResetPassword}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          <button 
            onClick={() => navigate("/login")}
            className="w-full text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}