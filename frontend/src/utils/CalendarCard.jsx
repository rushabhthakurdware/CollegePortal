import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function CalendarCard() {
  const cardRef = useRef(null);
  const [showNotices, setShowNotices] = useState(false);
  
  // States for real data
  const [deadlines, setDeadlines] = useState([]);
  const [officialNotices, setOfficialNotices] = useState([]);

  useEffect(() => {
    // GSAP Animation
    gsap.fromTo(
      cardRef.current,
      { x: 800, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }
    );

    // Fetch both Assignments and Notices
    const fetchAllData = async () => {
      try {
        const [assignRes, noticeRes] = await Promise.all([
          axios.get("https://college-portal-backend-xi64.onrender.com/api/assignments/all"),
          axios.get("https://college-portal-backend-xi64.onrender.com/api/notices")
        ]);
        
        setDeadlines(assignRes.data.slice(0, 2)); // Show top 2 on card
        setOfficialNotices(noticeRes.data);       // Show all in popup
      } catch (err) {
        console.error("Error fetching calendar data:", err);
      }
    };
    fetchAllData();
  }, []);

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
          {deadlines.map((item) => (
            <li
              key={item._id}
              className="p-3 bg-yellow-50/50 rounded-lg flex justify-between items-center border border-yellow-200"
            >
              <span className="text-gray-700 font-medium text-sm">{item.title}</span>
              <span className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded-md shadow-sm">
                {new Date(item.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-[10px] text-yellow-700 mt-4 text-center font-medium underline">Click to view all notices</p>
      </div>

      {/* Popup Overlay */}
      {/* Popup Overlay */}
      <AnimatePresence>
        {showNotices && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotices(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden z-10"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Upcoming Deadlines</h3>
                <button onClick={() => setShowNotices(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl">✕</button>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                {/* ✅ CHANGE: Map over deadlines instead of notices */}
                {deadlines.length > 0 ? (
                  deadlines.map((item) => (
                    <div key={item._id} className="p-4 rounded-2xl bg-yellow-50 dark:bg-gray-800 border border-yellow-100 dark:border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-yellow-200 text-yellow-800">
                          {item.subject}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                           {new Date(item.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{item.title}</h4>
                      {/* Show the description of the assignment/event */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description || "No additional details provided."}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-10 italic">No upcoming events or deadlines.</p>
                )}
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                <button
                  onClick={() => setShowNotices(false)}
                  className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  Close Calendar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}