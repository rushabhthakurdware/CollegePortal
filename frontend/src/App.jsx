import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import "./App.css";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
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
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Sidebar Pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<ViewCourse />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/payment" element={<PaymentPortal />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
