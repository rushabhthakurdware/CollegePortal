import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Sorting Algorithms Report",
      course: "Data Structures & Algorithms",
      submitted: true,
      graded: false,
      dueDate: "2025-09-10",
      status: "Pending",
      description:
        "Write a detailed report on different sorting algorithms, covering time complexity, space complexity, and practical applications.",
      grade: null,
      feedback: "",
    },
    {
      id: 2,
      title: "Process Synchronization Essay",
      course: "Operating Systems",
      dueDate: "2025-09-15",
      status: "Submitted",
      description:
        "Explain process synchronization problems and solutions such as semaphores, monitors, and mutex locks.",
      grade: null,
      feedback: "",
    },
    {
      id: 3,
      title: "OSI Layers Quiz",
      course: "Computer Networks",
      dueDate: "2025-09-20",
      status: "Graded",
      description:
        "Complete a quiz covering OSI model layers, their responsibilities, and real-world examples.",
      grade: "85/100",
      feedback: "Good work, but improve on Transport layer concepts.",
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = (id) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Submitted" } : a))
    );
    setSelectedAssignment(null);
    setFile(null);
  };

  const undoSubmission = (id) => {
  setAssignments((prev) =>
    prev.map((a) =>
      a.id === id ? { ...a, status: "Pending", submitted: false } : a
    )
  );
  setSelectedAssignment(null);
};


  return (
    <div className="p-8 bg-indigo-600 min-h-screen">
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
          <h1 className="text-4xl font-bold text-white">Assignments</h1>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              {assignment.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">📘 {assignment.course}</p>
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-indigo-500" /> Due:{" "}
              {assignment.dueDate}
            </p>

            {/* Status */}
            <p className="flex items-center gap-2 mt-2">
              <CheckCircle
                className={`w-4 h-4 ${
                  assignment.status === "Pending"
                    ? "text-yellow-500"
                    : assignment.status === "Submitted"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              />
              <span
                className={`px-2 py-1 rounded text-sm ${
                  assignment.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : assignment.status === "Submitted"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {assignment.status}
              </span>
            </p>

            {/* If Graded → Show grade + feedback */}
            {assignment.status === "Graded" && (
              <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold">Grade: {assignment.grade}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Feedback: {assignment.feedback}
                </p>
              </div>
            )}

            {/* View Details */}
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

    

      {/* Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedAssignment(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              {selectedAssignment.title}
            </h2>
            <p className="text-white mb-4">{selectedAssignment.description}</p>
            <p className="mb-2 text-indigo-200">
              <span className="font-semibold">Course:</span>{" "}
              {selectedAssignment.course}
            </p>
            <p className="mb-4 text-indigo-200">
              <span className="font-semibold">Due Date:</span>{" "}
              {selectedAssignment.dueDate}
            </p>

            {/* File Upload */}
            {selectedAssignment.status === "Pending" && (
              <div className="mb-4 text-indigo-200">
                <label className="block font-semibold mb-2">Upload File:</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-400 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                />
                {file && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            )}

            
            {/* Modal Actions */}
<div className="flex gap-3">
  {selectedAssignment.status === "Pending" && (
    <button
      onClick={() => handleSubmit(selectedAssignment.id)}
      className="flex-1 py-2 rounded-lg font-semibold transition bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2"
    >
      <Upload className="w-4 h-4" />
      Submit Assignment
    </button>
  )}

  {selectedAssignment.status === "Submitted" && (
    <button
      onClick={() => undoSubmission(selectedAssignment.id)}
      className="flex-1 py-2 rounded-lg font-semibold transition bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2"
    >
      <X className="w-4 h-4" />
      Undo Submission
    </button>
  )}

  <button
    onClick={() => setSelectedAssignment(null)}
    className="flex-1 py-2 rounded-lg font-semibold transition bg-gray-500 text-white hover:bg-gray-600"
  >
    Close
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
}
