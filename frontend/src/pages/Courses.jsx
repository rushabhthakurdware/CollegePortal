// src/pages/Courses.jsx
import React, { useState } from "react";


import {
  BookOpen,
  User,
  Clock,
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { Link } from "react-router-dom";
import ConfirmDialog from "../context/ConfirmDialog";


export default function Courses() {
  const navigate = useNavigate();
  const { courses, enrollCourse, unenrollCourse } = useCourses();

  const [query, setQuery] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

 
  // Filtered courses
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 bg-indigo-600 min-h-screen ">
      {/* Back Button */}
      <button
        onClick={() => navigate("/student")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg w-fit">
          <BookOpen className="w-7 h-7 text-white" />
          <h1 className="text-4xl font-bold text-white">Courses</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 w-full text-black bg-white rounded-lg">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{course.code}</p>

              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />{" "}
                  {course.instructor}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" />{" "}
                  {course.duration}
                </p>

                <p className="flex items-center gap-2">
                  {course.status === "Ongoing" ? (
                    <PlayCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                  )}
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      course.status === "Ongoing"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </p>
              </div>

              {/* Action Button */}
              {course.enrolled ? (
                <button
                  onClick={() => setConfirmAction({ type: "unenroll", course })}
                  className="mt-4 w-full py-2 rounded-lg font-semibold transition bg-red-500 text-white hover:bg-red-600"
                >
                  Unenroll
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setConfirmAction({ type: "enroll", course })}
                    className="mt-4 w-full py-2 rounded-lg font-semibold transition bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    {course.status === "Completed" ? "Re-enroll" : "Enroll"}
                  </button>

                  {confirmAction && (
                    <ConfirmDialog
                      message={`Are you sure you want to ${
                        confirmAction.type === "enroll"
                          ? "enroll in"
                          : "unenroll from"
                      } "${confirmAction.course.title}"?`}
                      onConfirm={() => {
                        if (confirmAction.type === "enroll") {
                          enrollCourse(confirmAction.course.id);
                        } else {
                          unenrollCourse(confirmAction.course.id);
                        }
                        setConfirmAction(null);
                      }}
                      onCancel={() => setConfirmAction(null)}
                    />
                  )}

                  <Link
                    to={`/courses/${course.id}`}
                    className="mt-2 block w-full py-2 rounded-lg font-semibold text-center transition bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View Course
                  </Link>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No courses found
          </p>
        )}
      </div>
    </div>
  );
}
