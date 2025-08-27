// src/pages/dashboard/Topbar.jsx
import React from "react";

export default function Topbar() {
  return (
    <div className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
      <h1 className="font-bold text-xl">Dashboard</h1>
      <div>User Info / Profile</div>
    </div>
  );
}
