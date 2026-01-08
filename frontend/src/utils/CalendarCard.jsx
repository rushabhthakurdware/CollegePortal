import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarCard() {
  const cardRef = useRef(null);
  const [showNotices, setShowNotices] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: 800, opacity: 0 }, // Reduced from 2500 to avoid 'slingshot' jump
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0 }
    );
  }, []);

  const events = [
    { id: 1, event: "Math Exam", date: "02 Sep 2025" },
    { id: 2, event: "Project Submission", date: "05 Sep 2025" },
  ];

  // Extended notices for the popup
  const allNotices = [
    { id: 1, title: "Math Exam", date: "02 Sep", type: "Exam", desc: "Room 302, 10:00 AM. Carry your ID cards." },
    { id: 2, title: "Project Submission", date: "05 Sep", type: "Deadline", desc: "Submit the React project documentation on the portal." },
    { id: 3, title: "Cultural Fest Meet", date: "10 Sep", type: "Event", desc: "Volunteers meeting in the main auditorium." },
    { id: 4, title: "Holiday Notice", date: "15 Sep", type: "Holiday", desc: "College closed for Mid-term break." },
  ];

  return (
    <>
      {/* Main Card */}
      <div
        ref={cardRef}
        onClick={() => setShowNotices(true)}
        className="bg-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:bg-yellow-200 cursor-pointer select-none"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Calendar & Notices</h2>
        <ul className="space-y-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="p-3 bg-yellow-50/50 rounded-lg flex justify-between items-center border border-yellow-200"
            >
              <span className="text-gray-700 font-medium">{event.event}</span>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm">{event.date}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-yellow-700 mt-4 text-center font-medium underline">Click to view all notices</p>
      </div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {showNotices && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Darkened Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotices(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Notices & Events</h3>
                <button 
                  onClick={() => setShowNotices(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                {allNotices.map((notice) => (
                  <div key={notice.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${
                        notice.type === 'Exam' ? 'bg-red-100 text-red-600' : 
                        notice.type === 'Holiday' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {notice.type}
                      </span>
                      <span className="text-sm font-semibold text-gray-400">{notice.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{notice.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notice.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                <button
                  onClick={() => setShowNotices(false)}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}