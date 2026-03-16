import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function AttendanceCard() {
  const cardRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // New state to hold real data
 const [stats, setStats] = useState({
  total: 0,
  present: 0,
  absent: 0,
  percentage: 0
});
  useEffect(() => {
  // GSAP Animation remains same...
  gsap.fromTo(
    cardRef.current,
    { x: 500, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }
  );

  const fetchAttendance = async () => {
  const studentId = localStorage.getItem("userId"); 
  
  // 🛑 STOP if ID is missing or the string "null"
  if (!studentId || studentId === "null") {
    console.warn("Skipping fetch: No valid Student ID found.");
    return; 
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/attendance/stats/${studentId}`);
    const { present , absent , total , percentage  } = response.data;
      // Update state with all necessary fields
      setStats({
        total: total,
        present: present,
        absent: absent,
        percentage: percentage
      });
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  fetchAttendance();
}, []);

  // Format data for Recharts
 const chartData = stats.total > 0 
  ? [
      { name: "Present", value: stats.present },
      { name: "Absent", value: stats.absent },
    ]
  : [
      { name: "No Data", value: 1 } // This keeps the circle visible but gray
    ];

const COLORS = stats.total > 0 ? ["#4CAF50", "#FF5252"] : ["#cbd5e1"];

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setShowPopup(true)}
        className="bg-blue-100 p-6 rounded-2xl select-none shadow-lg hover:shadow-2xl cursor-pointer transition-all hover:scale-105 hover:bg-gray-200"
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Attendance</h2>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center mt-2 font-semibold text-gray-700">
          {stats.percentage}% Present
        </p>
      </div>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md z-10"
            >
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Attendance Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between p-4 bg-green-50 rounded-xl">
                  <span className="font-medium text-green-700">Days Present</span>
                  <span className="font-bold text-green-700">{stats.present}</span>
                </div>
                <div className="flex justify-between p-4 bg-red-50 rounded-xl">
                  <span className="font-medium text-red-700">Days Absent</span>
                  <span className="font-bold text-red-700">{stats.absent}</span>
                </div>
                <div className="flex justify-between p-4 bg-blue-50 rounded-xl">
                  <span className="font-medium text-blue-700">Total Days</span>
                  <span className="font-bold text-blue-700">{stats.total}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}