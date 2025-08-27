// src/pages/dashboard/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-indigo-600 text-white flex flex-col p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-8">XYZ Portal</h2>
      <Link to="/dashboard/student" className="hover:bg-indigo-500 p-2 rounded">Student</Link>
      <Link to="/dashboard/teacher" className="hover:bg-indigo-500 p-2 rounded">Teacher</Link>
      <Link to="/dashboard/admin" className="hover:bg-indigo-500 p-2 rounded">Admin</Link>
    </div>
  );
}
