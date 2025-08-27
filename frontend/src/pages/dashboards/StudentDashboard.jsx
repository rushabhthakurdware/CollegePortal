import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

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
      // Fade in overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.3, ease: "power1.out" }
      );

      // Pop-in modal
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
      );
    } else {
      if (modalRef.current && overlayRef.current) {
        // Animate out
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
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
        {/* Header Text */}
        <span
          ref={headerTextRef}
          className=" text-xl font-bold tracking-wide select-none"
        >
             <i className="ri-graduation-cap-fill p-2"></i>
          Student Dashboard
        </span>

        {/* Logout Button */}
        <button
          className="bg-red-600 pl-6 pr-6  pt-4 pb-4 rounded-2xl text-white "
          ref={logoutBtnRef}
          onMouseEnter={() =>
            gsap.to(logoutBtnRef.current, { scale: 1.15, duration: 0.3 })
          }
          onMouseLeave={() =>
            gsap.to(logoutBtnRef.current, { scale: 1, duration: 0.3 })
          }
          onClick={()=>setShowModal(true)}
        >
          Logout
        </button>

        {/* Modal */}
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
          >
            {/* Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black backdrop-blur-sm"
            ></div>

            {/* Modal content */}
            <div
              ref={modalRef}
              className="bg-white rounded-2xl p-6 w-80 z-50 relative shadow-2xl"
            >
              <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">
                Are you sure you want to logout?
              </h2>

              <div className="flex justify-around mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg font-semibold shadow-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Placeholder for stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-yellow-400 p-6 rounded-lg shadow-md ">Courses: 5</div>
          <div className="bg-yellow-400 p-6 rounded-lg shadow-md">Assignments: 3</div>
          <div className="bg-yellow-400 p-6 rounded-lg shadow-md">Attendance: 90%</div>
        </div>
    </>
  );
}
