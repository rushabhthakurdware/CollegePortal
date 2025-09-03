import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";
import Footer from "./components/Footer";

import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";


import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import ViewCourse from "./pages/ViewCourse"; // 👈 import at top

import Assignments from "./pages/Assignments";
import Timetable from "./pages/Timetable";
import Grades from "./pages/Grades";
import PaymentPortal from "./pages/PaymentPortal";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <div className="flex-grow">
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Dashboards */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Sidebar Pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<ViewCourse />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/payment" element={<PaymentPortal />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
