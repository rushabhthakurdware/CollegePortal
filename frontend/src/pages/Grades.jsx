import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileDown, Loader2, Award } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

export default function Grades() {
  const navigate = useNavigate();
  
  // 1. STATE MANAGEMENT
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current user info
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const studentName = user?.name || "Student";

  // 2. FETCH GRADED ASSIGNMENTS FROM BACKEND
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await axios.get("https://college-portal-backend-xi64.onrender.com/api/assignments/all");
        
        // Filter for assignments that are marked as "Graded"
        // Note: In a production app, you'd also filter by user.username
        const gradedOnly = res.data.filter((a) => a.status === "Graded");
        
        setGrades(gradedOnly);
      } catch (err) {
        console.error("Error fetching grades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  useEffect(() => {
  const fetchMyData = async () => {
    // 1. Get the logged-in student's username
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    try {
      const res = await axios.get("https://college-portal-backend-xi64.onrender.com/api/assignments/all");
      
      // 2. Filter: Only show items where recipient matches this student
      const myItems = res.data.filter(a => a.recipient === user.username);
      
      setAssignments(myItems); // Or setGrades(myItems)
    } catch (err) {
      console.error(err);
    }
  };
  fetchMyData();
}, []);
  // 3. PDF GENERATION LOGIC
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("YCCE Academic Grade Report", 14, 22);
    
    // Student Info
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Student Name: ${studentName}`, 14, 32);
    doc.text(`Report Date: ${new Date().toLocaleDateString()}`, 14, 39);

    const tableColumn = ["Subject", "Assignment", "Marks", "Grade", "Feedback"];
    const tableRows = grades.map((g) => [
      g.subject,
      g.title,
      g.marks || "N/A",
      g.grade || "N/A",
      g.feedback || "No feedback provided"
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] }, // Indigo-600
      styles: { fontSize: 10 }
    });

    doc.save(`${studentName.replace(/\s+/g, "_")}_Grades.pdf`);
  };

  return (
    <div className="p-8 bg-indigo-600 min-h-screen text-gray-900">
      {/* Navigation */}
      <button
        onClick={() => navigate("/student")}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-black transition-all shadow-lg active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Portal
      </button>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Award className="w-10 h-10 text-yellow-400" />
            My Grades
          </h1>
          <p className="text-indigo-100 mt-1">Review your academic performance and feedback.</p>
        </div>
        
        {grades.length > 0 && (
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 shadow-xl transition-all active:scale-95 border-b-4 border-green-700"
          >
            <FileDown className="w-5 h-5" /> Export PDF Report
          </button>
        )}
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-200/50">
        {loading ? (
          <div className="p-24 flex flex-col items-center justify-center text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-indigo-600" />
            <p className="font-medium">Compiling your results...</p>
          </div>
        ) : grades.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-indigo-700 text-white">
                  <th className="p-5 font-semibold uppercase text-xs tracking-wider">Subject</th>
                  <th className="p-5 font-semibold uppercase text-xs tracking-wider">Assignment</th>
                  <th className="p-5 font-semibold uppercase text-xs tracking-wider text-center">Marks</th>
                  <th className="p-5 font-semibold uppercase text-xs tracking-wider text-center">Grade</th>
                  <th className="p-5 font-semibold uppercase text-xs tracking-wider">Teacher's Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {grades.map((g) => (
                  <tr key={g._id} className="hover:bg-indigo-50/50 transition-colors">
                    <td className="p-5 font-bold text-gray-800">{g.subject}</td>
                    <td className="p-5 text-gray-600">{g.title}</td>
                    <td className="p-5 text-center">
                       <span className="text-lg font-black text-indigo-700">{g.marks}</span>
                       <span className="text-gray-400 text-xs">/100</span>
                    </td>
                    <td className="p-5 text-center">
                      <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full font-black text-sm border border-indigo-200">
                        {g.grade}
                      </span>
                    </td>
                    <td className="p-5">
                       <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600 italic border border-gray-100">
                         "{g.feedback || "Great work! Keep it up."}"
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-24 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <FileDown className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-2xl font-bold text-gray-800">No Grades Released</p>
            <p className="text-gray-500 mt-2">Your marks will appear here once the teacher has graded your assignments.</p>
          </div>
        )}
      </div>
    </div>
  );
}