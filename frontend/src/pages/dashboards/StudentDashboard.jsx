import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "../../components/header";
import Sidebar from "./Sidebar";
import AttendanceCard from "../../utils/AttendanceCard";
import NoticesCard from "../../utils/NoticesCard";
import MessagesCard from "../../utils/MessagesCard";
import CalendarCard from "../../utils/CalendarCard";
import ResourcesCard from "../../utils/ResourcesCard";
import axios from "axios";

export default function StudentDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notices, setNotices] = useState([]);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [student, setStudent] = useState(null);

  const headerTextRef = useRef();
  const logoutBtnRef = useRef();
  const mainRef = useRef();

  // 1. Get user data safely
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    
    if (userData && userData.username) {
      axios
        .get(`https://college-portal-backend-xi64.onrender.com/api/students/user/${userData.username}`)
        .then((res) => setStudent(res.data))
        .catch((err) => console.error("Fetch Student Error:", err));
    }
  }, []);

  // 2. Fetch Dashboard Content
  useEffect(() => {
    axios.get("https://college-portal-backend-xi64.onrender.com/api/notices").then((res) => setNotices(res.data));
    axios.get("https://college-portal-backend-xi64.onrender.com/api/assignments/all").then(res => setAssignmentCount(res.data.length));
  }, []);

  // 3. Responsive GSAP Animations
  useEffect(() => {
    if (student) {
      const tl = gsap.timeline();
      // Reduced x values for mobile so they don't fly in from off-screen-too-far
      tl.fromTo(headerTextRef.current, 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(mainRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
        "-=0.4"
      );
    }
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Use the consistent key!
    window.location.href = "/";
  };

  if (!student) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading YCCE Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
        headerRef={headerTextRef}
        logoutRef={logoutBtnRef}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* RESPONSIVE GRID LOGIC:
         - grid-cols-1: Single column on mobile
         - md:grid-cols-2: Two columns on tablets
         - lg:grid-cols-3: Three columns on desktop
      */}
      <main ref={mainRef} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Attendance - Full width on mobile, 1 col on desktop */}
        <div className="col-span-1">
          <AttendanceCard 
            attendance={{ present: student.presentCount, absent: student.absentCount }} 
          />
        </div>

        {/* Notices - Full width on mobile, 2 cols on desktop */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <NoticesCard notices={notices} />
        </div>

        {/* Messages - Full width on mobile/tablet, 2 cols on desktop */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <MessagesCard messages={student.messages || []} />
        </div>

        {/* Calendar/Assignments */}
        <div className="col-span-1">
          <CalendarCard count={assignmentCount} />
        </div>

        {/* Resources - Always full width */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <ResourcesCard resources={student.resources || []} />
        </div>
      </main>
    </div>
  );
}