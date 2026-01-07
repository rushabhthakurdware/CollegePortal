import { useEffect,useRef } from "react";
import {gsap}from "gsap";


export default function ResourcesCard() {

    const cardRef = useRef(null);

    useEffect(() => {
      gsap.fromTo(
        cardRef.current,
        { x: 2500, opacity: 0 }, // start 300px left and invisible
        { x: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0 } // animate to normal position
      );
    }, []);

  const resources = [
    { id: 1, title: "Math Notes", type: "PDF" },
    { id: 2, title: "Physics Slides", type: "PPT" },
  ];

  return (
    <div 
    ref={cardRef}
    className="bg-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-300">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Resources</h2>
      <ul className="space-y-2">
        {resources.map((res) => (
          <li
            key={res.id}
            className="p-3 bg-purple-50 rounded-lg flex justify-between"
          >
            <span className="text-gray-700">{res.title}</span>
            <span className="text-sm text-gray-500">{res.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
