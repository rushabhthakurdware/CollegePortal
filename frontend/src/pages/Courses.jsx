import React, { useState, useEffect } from "react";
import { BookOpen, User, Clock, ArrowLeft, CheckCircle, PlayCircle, Search, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ConfirmDialog from "../context/ConfirmDialog";
import axios from "axios";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // const myCourses = allCourses.filter(c => c.enrolledStudents.includes(user.username));
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/courses/all");
      // Map through courses to see if the current user is in the 'enrolledStudents' array
      const processedData = res.data.map(c => ({
        ...c,
        isEnrolled: c.enrolledStudents?.includes(user.username)
      }));
      setCourses(processedData);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollmentToggle = async (courseId, actionType) => {
    const endpoint = actionType === "enroll" ? "enroll" : "unenroll";
    try {
      await axios.post(`http://localhost:5000/api/courses/${endpoint}`, {
        courseId,
        username: user.username
      });
      alert(`Successfully ${actionType}ed!`);
      fetchCourses(); // Refresh to show updated enrollment status
    } catch (err) {
      alert(`${actionType}ment failed. Please try again.`);
    }
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.code.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 bg-indigo-600 min-h-screen text-gray-900">
      {/* Back Button */}
      <button
        onClick={() => navigate("/student")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-black transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 p-4 bg-gray-900 rounded-2xl shadow-2xl">
          <BookOpen className="w-8 h-8 text-indigo-400" />
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Academic Catalog</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by course name or code (e.g. CS101)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-none shadow-xl focus:ring-4 focus:ring-indigo-400 outline-none text-lg"
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-white">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest text-sm">Syncing with YCCE Database...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-[32px] p-6 shadow-2xl border border-indigo-100 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-black uppercase">
                    {course.code}
                  </span>
                  <div className={`flex items-center gap-1 text-xs font-bold ${course.status === 'Ongoing' ? 'text-green-500' : 'text-gray-400'}`}>
                    {course.status === 'Ongoing' ? <PlayCircle size={14}/> : <CheckCircle size={14}/>}
                    {course.status}
                  </div>
                </div>
                
                <h2 className="text-2xl font-black text-gray-800 leading-tight mb-4">
                  {course.title}
                </h2>

                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-3 text-gray-500 font-medium italic text-sm">
                    <User className="w-4 h-4 text-indigo-400" /> {course.instructor}
                  </p>
                  <p className="flex items-center gap-3 text-gray-500 font-medium text-sm">
                    <Clock className="w-4 h-4 text-indigo-400" /> {course.duration || '4 Months'}
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="pt-4 border-t border-gray-50">
                {course.isEnrolled ? (
                  <div className="space-y-2">
                    <Link
                      to={`/courses/${course._id}`}
                      className="block w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold text-center shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      Enter Classroom
                    </Link>
                    <button
                      onClick={() => setConfirmAction({ type: "unenroll", course })}
                      className="w-full py-2 text-red-500 font-bold text-sm hover:underline"
                    >
                      Unenroll from Course
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmAction({ type: "enroll", course })}
                    className="w-full py-3 bg-gray-100 text-gray-800 rounded-2xl font-bold hover:bg-gray-200 transition-all border-2 border-transparent hover:border-indigo-200"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmAction && (
        <ConfirmDialog
          message={`Are you sure you want to ${confirmAction.type} in "${confirmAction.course.title}"?`}
          onConfirm={() => {
            handleEnrollmentToggle(confirmAction.course._id, confirmAction.type);
            setConfirmAction(null);
          }}
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}