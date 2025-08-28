import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Header({ onMenuClick, showModal, setShowModal, handleLogout }) {
  const headerTextRef = useRef();
  const iconTextRef = useRef();
  const modalRef = useRef();
  const overlayRef = useRef();

  // Animate header on mount
  useEffect(() => {
    gsap.fromTo(
      headerTextRef.current,
      { x: -150, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
    gsap.fromTo(
      iconTextRef.current,
      { x: 100, opacity: 0 }, // start 300px left and invisible
    { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) setShowModal(false);
  };

  return (
    <>
      <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
        {/* Header Text */}
        <span ref={headerTextRef} className="text-xl font-bold tracking-wide select-none">
          <i className="ri-graduation-cap-fill p-2"></i>
          Student Dashboard
        </span>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Menu Icon */}
          <i
            ref={iconTextRef}
            className="ri-menu-line text-2xl cursor-pointer hover:scale-110 transition"
            onClick={onMenuClick}
          ></i>
        </div>

        {/* Logout Modal */}
        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={handleOverlayClick}
          >
            {/* Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            ></div>

            {/* Modal Content */}
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
    </>
  );
}
