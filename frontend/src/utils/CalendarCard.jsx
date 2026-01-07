import { useEffect,useRef } from "react";
import {gsap} from "gsap";
export default function CalendarCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: 2500, opacity: 0 }, // start 300px left and invisible
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0 } // animate to normal position
    );
  }, []);

  const events = [
    { id: 1, event: "Math Exam", date: "02 Sep 2025" },
    { id: 2, event: "Project Submission", date: "05 Sep 2025" },
  ];

  return (
    <div 
    ref={cardRef}
    className="bg-yellow-100 p-6 rounded-2xl shadow-lg  hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Calendar</h2>
      <ul className="space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="p-3 bg-yellow-50 rounded-lg flex justify-between"
          >
            <span className="text-gray-700">{event.event}</span>
            <span className="text-sm text-gray-500">{event.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
