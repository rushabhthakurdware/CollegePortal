import React, { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Timetable() {
  const navigate = useNavigate();

  // Sample timetable data (can be later updated from admin dashboard)
  const [timetable] = useState({
    Monday: [
      { time: "9:00 - 10:00", subject: "Maths", teacher: "Mr. Sharma" },
      { time: "10:00 - 11:00", subject: "Physics", teacher: "Dr. Singh" },
      { time: "11:00 - 12:00", subject: "Computer Science", teacher: "Mrs. Rao" },
       { time: "12:00 - 1:00", subject: "Theory of Computation", teacher: "Mrs. Sharma" },
        { time: "1:00 - 2:00", subject: "Recess", teacher: "" },
         { time: "2:00 - 3:00", subject: "Networking", teacher: "Mr. Kumar" },
          { time: "3:00 - 4:00", subject: "Operating Systems", teacher: "Mrs. Verma" },
            { time: "4:00 - 5:00", subject: "Library", teacher: "" },

    ],
    Tuesday: [
      { time: "9:00 - 10:00", subject: "Chemistry", teacher: "Mr. Gupta" },
      { time: "10:00 - 11:00", subject: "Biology", teacher: "Dr. Mehta" },
      { time: "11:00 - 12:00", subject: "English", teacher: "Mrs. Kapoor" },
        { time: "12:00 - 1:00", subject: "English", teacher: "Mrs. Kapoor" },
          { time: "1:00 - 2:00", subject: "Recess", teacher: "" },
            { time: "2:00 - 3:00", subject: "Networking", teacher: "Mrs. Sharma" },
              { time: "3:00 - 4:00", subject: "Operating Systems", teacher: "Mrs. Verma" },
                { time: "4:00 - 5:00", subject: "Library", teacher: "" },

    ],
    Wednesday: [
      { time: "9:00 - 10:00", subject: "Operating Systems", teacher: "Mr. Verma" },
      { time: "10:00 - 11:00", subject: "Theory of Computation", teacher: "Ms. Sharma" },
       { time: "11:00 - 12:00", subject: "English", teacher: "Mrs. Kapoor" },
      { time: "12:00 - 1:00", subject: "Physics", teacher: "Mrs. Verma" },
          { time: "1:00 - 2:00", subject: "Recess", teacher: "" },
            { time: "2:00 - 3:00", subject: "Networking", teacher: "Mrs. Sharma" },
              { time: "3:00 - 4:00", subject: "Operating Systems", teacher: "Mrs. Verma" },
                { time: "4:00 - 5:00", subject: "Maths", teacher: "Mrs. Gupta" },

    ],
    Thursday: [
     { time: "9:00 - 10:00", subject: "Operating Systems", teacher: "Mr. Verma" },
      { time: "10:00 - 11:00", subject: "Theory of Computation", teacher: "Ms. Sharma" },
       { time: "11:00 - 12:00", subject: "English", teacher: "Mrs. Kapoor" },
      { time: "12:00 - 1:00", subject: "Physics", teacher: "Mrs. Verma" },
          { time: "1:00 - 2:00", subject: "Recess", teacher: "" },
            { time: "2:00 - 3:00", subject: "Networking", teacher: "Mrs. Sharma" },
              { time: "3:00 - 4:00", subject: "Library", teacher: "Mrs. Verma" },
                { time: "4:00 - 5:00", subject: "Maths", teacher: "Mrs. Gupta" },

    ],
    Friday: [
    { time: "9:00 - 10:00", subject: "Operating Systems", teacher: "Mr. Verma" },
      { time: "10:00 - 11:00", subject: "Theory of Computation", teacher: "Ms. Sharma" },
       { time: "11:00 - 12:00", subject: "English", teacher: "Mrs. Kapoor" },
      { time: "12:00 - 1:00", subject: "Physics", teacher: "Mrs. Verma" },
          { time: "1:00 - 2:00", subject: "Recess", teacher: "" },
            { time: "2:00 - 3:00", subject: "Networking", teacher: "Mrs. Sharma" },
              { time: "3:00 - 4:00", subject: "Maths", teacher: "Mrs. Verma" },
                { time: "4:00 - 5:00", subject: "Maths", teacher: "Mrs. Gupta" },

    ],
  });


  // subject → color mapping
const subjectColors = {
  Maths: "bg-yellow-200 text-yellow-800",
  Physics: "bg-blue-200 text-blue-800",
  "Computer Science": "bg-green-200 text-green-800",
  Chemistry: "bg-pink-200 text-pink-800",
  Biology: "bg-purple-200 text-purple-800",
  English: "bg-red-200 text-red-800",
  History: "bg-orange-200 text-orange-800",
  Geography: "bg-teal-200 text-teal-800",
  Economics: "bg-cyan-200 text-cyan-800",
  "Political Science": "bg-indigo-200 text-indigo-800",
  Sports: "bg-lime-200 text-lime-800",
  Music: "bg-rose-200 text-rose-800",
  Recess: "bg-white text-gray-800",
  "Operating Systems": "bg-red-800 text-gray-800",
  "Theory of Computation": "bg-green-400 text-gray-800",
  "Networking": "bg-blue-400 text-gray-800",
  "Library": "bg-yellow-400 text-gray-800",
};


  return (
    <div className="p-8 bg-indigo-600 min-h-screen text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/student")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg w-fit">
          <Clock className="w-7 h-7 text-white" />
          <h1 className="text-4xl font-bold text-white">Weekly Timetable</h1>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="grid md:grid-cols-5 gap-6 bg-indigo-300 p-6 rounded-xl shadow-lg">
        {Object.keys(timetable).map((day) => (
          <div
            key={day}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-lg p-4"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-3">{day}</h2>
            {timetable[day].map((slot, index) => (
              <div
                key={index}
                className={`mb-3 p-3 border rounded-lg ${
      subjectColors[slot.subject] || "bg-gray-100 text-gray-800"
    }`}
              >
                <p className="text-sm font-semibold">{slot.time}</p>
                <p>{slot.subject}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {slot.teacher}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
