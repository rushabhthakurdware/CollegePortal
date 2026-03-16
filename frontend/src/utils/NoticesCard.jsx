import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import axios from "axios"; // Ensure axios is installed

export default function NoticesCard() {
  const cardRef = useRef(null);
  const [notices, setNotices] = useState([]); // Dynamic state for backend data
  const [loading, setLoading] = useState(true);

  // Animation effect
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: 2500, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0 }
    );
  }, []);

  const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years ago";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days ago";
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " hours ago";
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " mins ago";
  return "Just now";
};
  // Fetch data from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notices/all");
        setNotices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] dark:bg-gray-800"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b pb-2">Notices</h2>
      
      {loading ? (
        <p className="text-gray-500 italic">Loading notices...</p>
      ) : (
        <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <li
                key={notice._id}
                className="p-4 bg-indigo-50 dark:bg-gray-700 rounded-xl flex flex-col gap-2 border-l-4 border-indigo-500"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-indigo-400 font-semibold">
  {formatTimeAgo(notice.createdAt || notice.date)}
</span>
                  <span className="text-indigo-900 dark:text-indigo-200 font-bold text-lg">
                    {notice.title}
                  </span>
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap ml-4">
                    {notice.date}
                  </span>
                </div>

                {/* ✅ DISPLAY THE DESCRIPTION HERE */}
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {notice.content}
                </p>

                {/* Optional: Display the Type/Category badge */}
                {notice.type && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">
                    {notice.type}
                  </span>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No new notices</p>
          )}
        </ul>
      )}
    </div>
  );
}