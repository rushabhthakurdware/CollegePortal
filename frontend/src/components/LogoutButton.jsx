// src/components/LogoutButton.jsx
import { useState, useRef } from "react";

export default function LogoutButton() {
  const [showModal, setShowModal] = useState(false);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // redirect to login
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>

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
    </>
  );
}
