import {gsap} from "gsap";
import { useEffect, useRef } from "react";


export default function NoticesCard() {


    const cardRef = useRef(null);

  useEffect(() => {
  gsap.fromTo(
    cardRef.current,
    { x: 2500, opacity: 0 }, // start 300px left and invisible
    { x: 0, opacity: 1, duration: 0.8, ease: "expo.out",delay:0 } // animate to normal position
  );
}, []);


  const notices = [
    { id: 1, title: "Exam on Monday", date: "28 Aug 2025" },
    { id: 2, title: "Submit Assignment 3", date: "30 Aug 2025" },
  ];

  return (
    <div 
     ref={cardRef}
    className="bg-red-100 p-6 rounded-2xl shadow-lg  hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Notices</h2>
      <ul className="space-y-2">
        {notices.map((notice) => (
          <li
            key={notice.id}
            className="p-3 bg-indigo-50 rounded-lg flex justify-between items-center"
          >
            <span className="text-gray-700">{notice.title}</span>
            <span className="text-sm text-gray-500">{notice.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
