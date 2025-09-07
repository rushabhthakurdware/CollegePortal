// src/pages/Grades.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function Grades() {
  const navigate = useNavigate();
  const studentName = localStorage.getItem("studentName") || "Student";

  // Dummy data (later will come from backend/teacher)
  const grades = [
    {
      course: "Data Structures & Algorithms",
      assignment: "Sorting Report",
      marks: 92,
      grade: "A",
      feedback: "Excellent explanation of complexities."
    },
    {
      course: "Operating Systems",
      assignment: "Process Synchronization Essay",
      marks: 78,
      grade: "B+",
      feedback: "Good examples, but needs more depth."
    },
    {
      course: "Computer Networks",
      assignment: "OSI Layers Quiz",
      marks: 85,
      grade: "A-",
      feedback: "Solid answers. Review Transport layer."
    },{
      course: "Database Management Systems",
      assignment: "ER Diagram Project",
      marks: 88,
      grade: "A",
      feedback: "Well-structured diagram, good use of notation."
    },{
      course: "Software Engineering",
      assignment: "Agile Methodologies Report",
      marks: 90,
      grade: "A",
      feedback: "Great insights on Agile practices."
    },{
      course: "Web Development",
      assignment: "Full-Stack App",
      marks: 95,
      grade: "A+",
      feedback: "Outstanding implementation and UI design."
    }
  ];

  // Function to download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Grade Report", 14, 22);
    doc.setFontSize(12);
    doc.text("Generated on: " + new Date().toLocaleDateString(), 14, 32);

    const tableColumn = ["Course", "Assignment", "Marks", "Grade", "Feedback"];
    const tableRows = grades.map((g) => [
      g.course,
      g.assignment,
      g.marks,
      g.grade,
      g.feedback
    ]);

    autoTable(doc, {
  head: [tableColumn],
  body: tableRows,
  startY: 40
});


    doc.save(`${studentName.replace(/\s+/g, "_")}_Grade_Report.pdf`);

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">📊 Grades</h1>
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <FileDown className="w-5 h-5" /> Download PDF
        </button>
      </div>

      {/* Grades Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-indigo-700 text-white">
              <th className="p-3">Course</th>
              <th className="p-3">Assignment</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((g, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="p-3">{g.course}</td>
                <td className="p-3">{g.assignment}</td>
                <td className="p-3">{g.marks}</td>
                <td className="p-3 font-semibold text-indigo-600">{g.grade}</td>
                <td className="p-3">{g.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
