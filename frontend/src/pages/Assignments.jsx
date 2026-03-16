import React, { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Added axios
import {
  BookOpen,
  ArrowLeft,
  Calendar,
  CheckCircle,
  FileText,
  Upload,
  X,
} from "lucide-react";

export default function Assignments() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);

  // 1. Fetch from Backend on Mount
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/assignments/all");
        // We initialize a 'status' locally if it doesn't exist in the DB
        const dataWithStatus = res.data.map(asgn => ({
            ...asgn,
            status: asgn.status || "Pending" 
        }));
        setAssignments(dataWithStatus);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  // 2. Handle Submission (Local UI update)
  const handleSubmit = (id) => {
    setAssignments((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: "Submitted" } : a))
    );
    setSelectedAssignment(null);
    setFile(null);
    alert("Assignment submitted successfully!");
  };

  const undoSubmission = (id) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a._id === id ? { ...a, status: "Pending", submitted: false } : a
      )
    );
    setSelectedAssignment(null);
  };

  if (loading) return <div className="p-8 text-white">Loading assignments...</div>;

  return (
    <div className="p-8 bg-indigo-600 min-h-screen">
      <button
        onClick={() => navigate("/student")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg w-fit">
          <BookOpen className="w-7 h-7 text-white" />
          <h1 className="text-4xl font-bold text-white">Assignments</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment._id} // Changed id to _id for MongoDB
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {assignment.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">📘 {assignment.subject || assignment.course}</p>
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-indigo-500" /> Due:{" "}
              {new Date(assignment.dueDate).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-2 mt-2">
              <CheckCircle
                className={`w-4 h-4 ${
                  assignment.status === "Pending" ? "text-yellow-500" : 
                  assignment.status === "Submitted" ? "text-blue-500" : "text-green-500"
                }`}
              />
              <span className={`px-2 py-1 rounded text-sm ${
                  assignment.status === "Pending" ? "bg-yellow-100 text-yellow-600" : 
                  assignment.status === "Submitted" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                }`}
              >
                {assignment.status}
              </span>
            </p>

            <button
              onClick={() => setSelectedAssignment(assignment)}
              className="mt-4 w-full py-2 rounded-lg font-semibold transition bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {selectedAssignment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg relative text-gray-900 dark:text-white">
            <button onClick={() => setSelectedAssignment(null)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-indigo-600 mb-2">{selectedAssignment.title}</h2>
            <p className="mb-4 opacity-80">{selectedAssignment.description || "No description provided."}</p>
            <p className="mb-2"><span className="font-semibold">Subject:</span> {selectedAssignment.subject}</p>
            <p className="mb-4"><span className="font-semibold">Due Date:</span> {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>

            {selectedAssignment.status === "Pending" && (
              <div className="mb-4">
                <label className="block font-semibold mb-2">Upload File:</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer" />
                {file && <p className="mt-2 text-sm text-green-600 font-medium italic">Selected: {file.name}</p>}
              </div>
            )}

            <div className="flex gap-3">
              {selectedAssignment.status === "Pending" && (
                <button onClick={() => handleSubmit(selectedAssignment._id)} className="flex-1 py-2 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" /> Submit
                </button>
              )}
              {selectedAssignment.status === "Submitted" && (
                <button onClick={() => undoSubmission(selectedAssignment._id)} className="flex-1 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2">
                  <X className="w-4 h-4" /> Undo
                </button>
              )}
              <button onClick={() => setSelectedAssignment(null)} className="flex-1 py-2 rounded-lg font-semibold bg-gray-500 text-white hover:bg-gray-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}