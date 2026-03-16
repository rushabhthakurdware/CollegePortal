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

  const headerTextRef = useRef();
  const logoutBtnRef = useRef();
  const modalRef = useRef();
  const overlayRef = useRef();
  const mainRef = useRef();

  // 1. Consistent LocalStorage Key (Make sure this matches your Login.jsx)
// Change "user" to "loggedInUser"
// StudentDashboard.jsx

// 1. Get the data using the CORRECT key
// Inside StudentDashboard.jsx

// Use the key from Login.jsx
const userData = JSON.parse(localStorage.getItem("loggedInUser")); 
const [student, setStudent] = useState(null);

useEffect(() => {
  // Debug to see if username exists here
  console.log("Dashboard userData:", userData);

  if (userData && userData.username) {
    axios
      .get(`http://localhost:5000/api/students/user/${userData.username}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        console.error("Fetch Student Error:", err);
      });
  } else {
    console.warn("Username missing! User is not logged in correctly.");
  }
}, []);

  // Fetch Notices
  useEffect(() => {
    axios.get("http://localhost:5000/api/notices")
      .then((res) => setNotices(res.data))
      .catch((err) => console.error("Error fetching notices:", err));
  }, []);

  // Fetch Assignments
  useEffect(() => {
    axios.get("http://localhost:5000/api/assignments/all")
      .then(res => setAssignmentCount(res.data.length))
      .catch(err => console.log(err));
  }, []);

  // --- GSAP ANIMATIONS ---
  // We move these to a single effect that depends on [student]
  // This ensures the elements exist in the DOM before GSAP tries to find them.
  useEffect(() => {
    if (student) {
      const tl = gsap.timeline();

      tl.fromTo(headerTextRef.current, 
        { x: -150, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
      .fromTo(logoutBtnRef.current, 
        { x: 150, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
        "-=0.8" // Start slightly before header finishes
      )
      .fromTo(mainRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, 
        "-=0.5"
      );
    }
  }, [student]); 

  // Modal Animation Logic
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 0.5, duration: 0.3 });
      gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" });
    }
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear the correct key
    window.location.href = "/";
  };

  // --- THE GATEKEEPER ---
  if (!student) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <p className="text-xl font-semibold text-white animate-pulse">Loading Student Profile...</p>
      </div>
    );
  }

  return (
    <>
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
        // These refs are passed to Header component via props if Header supports it, 
        // otherwise, ensure they are attached to elements inside this component.
        headerRef={headerTextRef}
        logoutRef={logoutBtnRef}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main ref={mainRef} className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-1">
          {/* Note: In your model, attendance fields were presentCount/absentCount */}
          <AttendanceCard 
            attendance={{ present: student.presentCount, absent: student.absentCount }} 
            delay={1} 
          />
        </div>

        <div className="col-span-1 lg:col-span-2">
          <NoticesCard notices={notices} delay={1} />
        </div>

        <div className="col-span-2 lg:col-span-2">
          <MessagesCard messages={student.messages || []} />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <CalendarCard count={assignmentCount} />
        </div>

        <div className="col-span-1 lg:col-span-3 m-5">
          <ResourcesCard resources={student.resources || []} />
        </div>
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div 
          ref={overlayRef} 
          className="fixed inset-0 bg-black z-40" 
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </>
  );
}