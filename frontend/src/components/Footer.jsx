import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Footer({darkmode}) {
  const marqueeRef = useRef();
  
  useEffect(() => {
    const el = marqueeRef.current;
    const contentWidth = el.scrollWidth / 2; // because we will duplicate

    gsap.to(el, {
      x: `${contentWidth}px`,
      duration:7,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <footer className="fixed bottom-0 w-full bg-indigo-600 py-2 overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap"
        style={{ display: "inline-flex" }}
      >
        {/* Original content */}
        <div className="flex gap-4 text-white font-bold text-xl">
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          <span>XYZ College</span>
          <img
            src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
            alt="arrow"
            className="h-6 w-6"
          />
          {/* <span>XYZ College </span> */}
        </div>

        
       
        
      </div>
    </footer>
  );
}
