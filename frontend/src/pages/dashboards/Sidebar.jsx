
// Sidebar.jsx
import React, { useEffect, useRef , useState } from "react";
import gsap from "gsap";
import LogoutButton from "../../components/LogoutButton";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null);
  const linksRef = useRef([]);
  const overlayRef = useRef(null);
  const tl = useRef();

  const navItems = [
    { name: "🧑‍🎓 Profile", path: "/profile" },
    { name: "📘 Courses", path: "/courses" },
    { name: "📝 Assignments", path: "/assignments" },
    { name: "📅 Timetable", path: "/timetable" },
    { name: "📊 Grades", path: "/grades" },
    { name: "💳 Payment Portal", path: "/payment" },
  ];

  const [username, setUsername] = useState("");


  useEffect(() => {
    // Create timeline only once
    tl.current = gsap.timeline({ paused: true });

    // Overlay fade in
    tl.current.fromTo(
      overlayRef.current,
      { opacity: 0, pointerEvents: "none" },
      { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power1.out" }
    );

    // Sidebar slide in
    tl.current.fromTo(
      sidebarRef.current,
      { x: "100%" },
      { x: "0%", duration: 0.3, delay: 0, ease: "power1.in" }
    );

    // Stagger links in
    tl.current.fromTo(
      linksRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.1,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.2"
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user?.username) {
    setUsername(user.username);
  }
}, []);


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
        style={{ transform: "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-indigo-500">
          <h2 className="text-lg font-bold">Welcome  {username}</h2>
          <button
            className="text-2xl hover:text-red-400"
            onClick={onClose}
          >
            <i className="ri-close-line text-3xl"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              ref={(el) => (linksRef.current[i] = el)}
              className="hover:bg-indigo-600 px-3 py-2 rounded-lg transition opacity-0"
              onClick={onClose} // close sidebar on navigation
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 w-full px-4">
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
