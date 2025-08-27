// src/pages/dashboard/TeacherDashboard.jsx
import React from "react";
import DashboardLayout from "./Dashboard";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">User Management</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Content Moderation</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Analytics</div>
      </div>
    </DashboardLayout>
  );
}
