import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";

export default function MessagesCard() {
  const cardRef = useRef(null);
  
  // 1. Define state for messages (initialized as empty array)
  const [dbMessages, setDbMessages] = useState([]);
  
  // 2. Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // Animation logic
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: 2500, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out" }
    );
  }, []);

  // 3. Data fetching logic (Separate from animation)
  useEffect(() => {
    const fetchMyAlerts = async () => {
      try {
        const res = await axios.get(`https://college-portal-backend-xi64.onrender.com/api/messages/user/${user.username}`);
        setDbMessages(res.data);
      } catch (err) {
        console.log("Error fetching alerts", err);
      }
    };

    if (user?.username) {
      fetchMyAlerts();
    }
  }, [user?.username]);

  return (
    <div 
      ref={cardRef}
      className="bg-green-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] hover:bg-white border-l-8 border-green-500"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Direct Alerts</h2>
      
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {dbMessages.length > 0 ? (
          dbMessages.map((msg) => (
            <div key={msg._id} className="p-3 bg-white rounded-lg shadow-sm border border-green-500/20">
              <p className="font-semibold text-green-700 text-sm">{msg.sender}</p>
              <p className="text-gray-600 text-sm">{msg.text}</p>
              <span className="text-[10px] text-gray-400">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No new alerts from teachers.</p>
        )}
      </div>
    </div>
  );
}