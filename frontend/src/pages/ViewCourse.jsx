import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  BookOpen, 
  ClipboardList, 
  FileText, 
  Video, 
  ChevronRight,
  GraduationCap
} from "lucide-react";
import axios from "axios";

export default function ViewCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("syllabus");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading course:", err);
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-600">
      <div className="text-white font-black animate-bounce flex items-center gap-2">
        <GraduationCap size={32}/> LOADING CLASSROOM...
      </div>
    </div>
  );

  if (!course) return <div className="p-20 text-center font-bold">Course not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <button 
          onClick={() => navigate("/courses")} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-all"
        >
          <ArrowLeft size={18}/> Back to Catalog
        </button>
        <div className="flex items-center gap-2">
          <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest">
            {course.code}
          </span>
          <h2 className="font-black text-slate-800 hidden md:block">{course.title}</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        {/* Banner Section */}
        <div className="bg-indigo-600 rounded-[40px] p-10 text-white mb-10 shadow-2xl shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-2 tracking-tighter">{course.title}</h1>
            <p className="text-indigo-100 font-medium">Instructor: {course.instructor}</p>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <BookOpen size={240} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: "syllabus", label: "Syllabus", icon: <FileText size={20}/> },
              { id: "resources", label: "Study Material", icon: <Video size={20}/> },
              { id: "assignments", label: "Assignments", icon: <ClipboardList size={20}/> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                  ? "bg-indigo-600 text-white shadow-lg" 
                  : "bg-white text-slate-400 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {tab.icon} {tab.label}
                </div>
                <ChevronRight size={16} className={activeTab === tab.id ? "opacity-100" : "opacity-0"}/>
              </button>
            ))}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 bg-white rounded-[40px] shadow-xl p-10 border border-slate-100 min-h-[500px]">
            {activeTab === "syllabus" && (
              <div className="animate-in fade-in slide-in-from-right-4">
                <h3 className="text-2xl font-black text-slate-800 mb-8 border-b pb-4">Course Roadmap</h3>
                <div className="space-y-4">
                  {course.syllabus?.map((topic, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 transition-hover hover:border-indigo-400">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center font-black text-indigo-600 border border-slate-100">
                        {i + 1}
                      </div>
                      <span className="font-bold text-slate-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="text-center py-20 animate-in fade-in">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Video size={40}/>
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Video Lectures Yet</h3>
                <p className="text-slate-400 mt-2">The instructor hasn't uploaded specific resources for this unit.</p>
              </div>
            )}

            {activeTab === "assignments" && (
              <div className="text-center py-20 animate-in fade-in">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardList size={40}/>
                </div>
                <h3 className="text-xl font-bold text-slate-800">You're All Caught Up!</h3>
                <p className="text-slate-400 mt-2">No pending assignments for {course.code} at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}