// src/pages/dashboard/TeacherDashboard.jsx
import React from "react";
import DashboardLayout from "./Dashboard";

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Courses Teaching</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Assignments to Review</div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded">Student Queries</div>
      </div>
    </DashboardLayout>
  );
}
