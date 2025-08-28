// Sidebar.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Sidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null);
  const linksRef = useRef([]);
  const overlayRef = useRef(null);
  const tl = useRef();

  useEffect(() => {
    // Create timeline only once
    tl.current = gsap.timeline({ paused: true });

    // Overlay fade in
    tl.current.fromTo(
      overlayRef.current,
      { opacity: 0, pointerEvents: "none" },
      { opacity: 1, pointerEvents: "auto", duration: 0.4, ease: "power1.out" }
    );

    // Sidebar slide in
    tl.current.fromTo(
      sidebarRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.5, delay: 0.1, ease: "power3.in" }
    );

    // Stagger links in
    tl.current.fromTo(
      linksRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.3,
        ease: "power3.out",
      },
      "-=0.2" // overlap a bit with sidebar
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current.play(); // play forward (open)
    } else {
      tl.current.reverse(); // play backward (close)
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0  bg-opacity-50 opacity-0 pointer-events-none z-40"
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-94 bg-indigo-700 text-white shadow-2xl z-50"
        style={{ transform: "translateX(100%)" }} // default hidden
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          <h2 className="text-lg font-bold">Student Portal</h2>
          <button
            className="text-2xl hover:text-red-400 "
            onClick={onClose} // triggers parent to set isOpen=false
          >
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6 space-y-4">
          {[
            "🧑‍🎓 Profile",
            "📘 Courses",
            "📝 Assignments",
            "📅 Timetable",
            "📊 Grades",
            "💳 Payment Portal",
          ].map((item, i) => (
            <a
              key={i}
              ref={(el) => (linksRef.current[i] = el)}
              href="#"
              className="hover:bg-indigo-600 px-3 py-2 rounded-lg transition opacity-0"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 w-full px-4">
          <button className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
