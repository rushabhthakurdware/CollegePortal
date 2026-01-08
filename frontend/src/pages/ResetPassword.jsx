import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    role: "student",
  });

  const handleResetPassword = async () => {
    if (!form.email || !form.newPassword || !form.role) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/reset-password",
        {
          email: form.email,
          newPassword: form.newPassword,
          role: form.role,
        }
      );

      alert(res.data.msg);
    } catch (error) {
      alert(error.response?.data?.msg || "Password reset failed");
    }
  };

  return (
    <>
    <div className="bg-blue-500 min-h-screen flex items-center justify-center p-4 "> 
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg align-center mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="mb-4 p-2 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-500"
      />

      <input
        type="password"
        placeholder="New Password"
        value={form.newPassword}
        className="mb-4 p-2 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-500"
        onChange={(e) =>
          setForm({ ...form, newPassword: e.target.value })
        }
      />

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="mb-4 p-2 rounded-lg w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors duration-500"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleResetPassword}>Confirm</button>
    </div>
    </div>
    </>
  );
}
