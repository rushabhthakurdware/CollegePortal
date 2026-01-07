import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Footer({ darkmode }) {
  const marqueeRef = useRef();

  useEffect(() => {
    const el = marqueeRef.current;

    // We animate from -100% (hidden on left) to 100vw (past the right edge)
    gsap.fromTo(
      el,
      {x: "-30vw" }, // Start completely off-screen to the left
      {
        x: "130vw",     // End completely off-screen to the right
        duration: 6,   // Adjust time for speed (higher = slower)
        ease: "linear",
        repeat: -1,
      }
    );
  }, []);

  return (
    <footer className={`fixed bottom-0 w-full py-2 overflow-hidden transition-colors duration-500 ${darkmode ? "bg-gray-800" : "bg-indigo-600"}`}>
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        style={{ display: "inline-flex", willChange: "transform" }}
      >
        <div className="text-white font-bold text-xl px-4">
          Yeshwantrao Chavan College Of Engineering, Nagpur  
        </div>
      </div>
    </footer>
  );
}