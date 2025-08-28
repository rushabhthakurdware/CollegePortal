import { useEffect, useRef } from "react";
import {gsap }from "gsap";
  



export default function MessagesCard() {

    const cardRef = useRef(null);

    useEffect(() => {
gsap.fromTo(
    cardRef.current,
    { x: 2500, opacity: 0 }, // start 300px left and invisible
    { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.4 } // animate to normal position
  );
}, []);

  const messages = [
    { id: 1, sender: "Teacher A", text: "Please check the assignment" },
    { id: 2, sender: "Classmate", text: "Are you joining study group?" },
  ];

  return (
    <div 
    ref={cardRef}
    className="bg-green-100 p-6 rounded-2xl shadow-lg  hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Messages</h2>
      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="p-3 bg-green-50 rounded-lg">
            <p className="font-semibold text-gray-800">{msg.sender}</p>
            <p className="text-gray-600">{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
