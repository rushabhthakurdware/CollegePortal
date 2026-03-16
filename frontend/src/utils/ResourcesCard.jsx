import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";

export default function ResourcesCard() {
  const cardRef = useRef(null);
  const [dbResources, setDbResources] = useState([]);

  useEffect(() => {
    // GSAP Animation
    gsap.fromTo(cardRef.current, { x: 800, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 });

    // Fetch real data
    const fetchRes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resources/all");
        setDbResources(res.data);
      } catch (err) { console.log(err); }
    };
    fetchRes();
  }, []);

  return (
    <div ref={cardRef} className="bg-purple-100 p-6 rounded-3xl shadow-lg border border-purple-200">
      <h2 className="text-xl font-bold mb-6 text-purple-900 flex items-center gap-2">
        <i className="ri-book-open-fill"></i> Subject Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {dbResources.map((res) => (
          <div key={res._id} className="bg-white p-3 rounded-xl flex items-center justify-between border border-purple-200 hover:border-purple-400 transition-all">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 text-sm">{res.title}</span>
              <span className="text-[9px] text-purple-500 uppercase">{res.subject}</span>
            </div>

            https://www.youtube.com/
            <a
              href={res.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-transform active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}