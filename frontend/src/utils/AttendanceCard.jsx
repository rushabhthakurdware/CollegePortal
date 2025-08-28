// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// export default function AttendanceCard() {
//   const cardRef = useRef(null);

//   useEffect(() => {
//   gsap.from(cardRef.current, {
//     x: window.innerWidth, // start off-screen
//     opacity: 0,           // invisible at start
//     duration: 1,
//     ease: "power3.out"
//   });
// }, []);


//   const data = [
//     { name: "Present", value: 90 },
//     { name: "Absent", value: 10 },
//   ];

//   const COLORS = ["#4CAF50", "#FF5252"];

//   return (
//     <div
//       ref={cardRef} // attach ref to outer container
//       className="bg-blue-100 p-6 rounded-2xl select-none shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-300"
//     >
//       <h2 className="text-lg font-semibold mb-4 text-gray-800">Attendance</h2>
//       <div className="h-40">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               innerRadius={50}
//               outerRadius={70}
//               dataKey="value"
//               label
//             >
//               {data.map((entry, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       <p className="text-center mt-2 font-semibold text-gray-700">
//         90% Present
//       </p>
//     </div>
//   );
// }


import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AttendanceCard() {
  const cardRef = useRef(null);

  useEffect(() => {
      gsap.fromTo(
        cardRef.current,
        { x: 6000, opacity: 0 }, // start 300px left and invisible
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 } // animate to normal position
      );
    }, []);


  const data = [
    { name: "Present", value: 90 },
    { name: "Absent", value: 10 },
  ];

  const COLORS = ["#4CAF50", "#FF5252"];

  return (
    <div
      ref={cardRef}
      className="bg-blue-100 p-6 rounded-2xl select-none shadow-lg hover:shadow-2xl transition-all hover:scale-105 hover:bg-gray-300"
    >
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Attendance</h2>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={50}
              outerRadius={70}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-center mt-2 font-semibold text-gray-700">
        90% Present
      </p>
    </div>
  );
}
