import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ResourcesCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: 800, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0 }
    );
  }, []);

  const resources = [
    { id: 1, title: "Maths" },
    { id: 2, title: "Physics" },
    { id: 3, title: "Chemistry" },
    { id: 4, title: "Biology" },
    { id: 5, title: "History" },
    { id: 6, title: "English" },
  ];

  return (
    <div
      ref={cardRef}
      className="bg-purple-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:bg-purple-200"
    >
      <h2 className="text-xl font-bold mb-6 text-purple-900 flex items-center gap-2">
        <i className="ri-book-open-fill"></i> Subject Resources
      </h2>

      {/* 3 Columns, 2 Rows Grid */}
      <div className="grid grid-cols-3 gap-3">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-white/80 p-3 rounded-xl flex items-center justify-between border border-purple-200 hover:border-purple-400 hover:shadow-sm transition-all"
          >
            <span className="font-bold text-gray-700 text-sm">{res.title}</span>

            {/* Compact Download Button */}
            <button
              onClick={() => alert(`Downloading ${res.title} notes...`)}
              className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors active:scale-90 flex items-center justify-center group"
              title="Download"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-[10px] text-purple-600 mt-4 text-center font-semibold uppercase tracking-widest opacity-70">
        New study materials added today
      </p>
    </div>
  );
}