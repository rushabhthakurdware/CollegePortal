import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "../../components/header";
import Sidebar from "./Sidebar";

import AttendanceCard from "../../utils/AttendanceCard";
import NoticesCard from "../../utils/NoticesCard";
import MessagesCard from "../../utils/MessagesCard";
import CalendarCard from "../../utils/CalendarCard";
import ResourcesCard from "../../utils/ResourcesCard";

export default function StudentDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const headerTextRef = useRef();
  const logoutBtnRef = useRef();
  const modalRef = useRef();
  const overlayRef = useRef();

  const handleLogout = () => {
    window.location.href = "/";
  };

  // Animate header text and logout button on mount
  useEffect(() => {
    gsap.fromTo(
      headerTextRef.current,
      { x: -150, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      logoutBtnRef.current,
      { x: 150, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  // Animate modal on show
  useEffect(() => {
    if (showModal) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.3, ease: "power1.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    } else {
      if (modalRef.current && overlayRef.current) {
        gsap.to(modalRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.4,
          ease: "power1.in",
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power1.in",
        });
      }
    }
  }, [showModal]);

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setShowModal(false);
    }
  };

  const mainRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      mainRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 }
    );
  }, []);

  return (
    <>
      <Header
        onMenuClick={() => setIsSidebarOpen(true)}
        showModal={showModal}
        setShowModal={setShowModal}
        handleLogout={() => (window.location.href = "/")}
      />

      {/* Sidebar Integration */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Stats cards */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-1">
          <AttendanceCard  delay={0}/>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <NoticesCard  delay={1}/>
        </div>

        <div className="col-span-2 lg:col-span-2">
          <MessagesCard />
        </div>

        <div className="col-span-1 lg:col-span-1">
          <CalendarCard />
        </div>

        <div className="col-span-1 lg:col-span-3 m-5">
          <ResourcesCard />
        </div>
      </main>
    </>
  );
}
