import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  FileText, 
  Video, 
  ClipboardList, 
  BookOpen, 
  Download,
  ExternalLink 
} from "lucide-react";
import axios from "axios";

export default function CourseDetail() {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState("resources");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // We'll need to create this specific route in the backend
        const res = await axios.get(`https://college-portal-backend-xi64.onrender.com/api/courses/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading classroom:", err);
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-indigo-600">LOADING CLASSROOM...</div>;
  if (!course) return <div className="p-20 text-center font-bold text-red-500">Course not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate("/courses")} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20}/> Back to Catalog
        </button>

        {/* Course Header Card */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-bl-full"></div>
          
          <div className="relative z-10">
            <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              {course.code}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 mb-4 tracking-tighter">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-500 font-medium">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold">
                {course.instructor?.charAt(0)}
              </div>
              <p>Lecturer: <span className="text-slate-900 font-bold">{course.instructor}</span></p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-200/50 p-2 rounded-3xl w-fit mb-10 border border-slate-200 shadow-inner">
          {[
            { id: "resources", label: "Resources", icon: <BookOpen size={18}/> },
            { id: "assignments", label: "Assignments", icon: <ClipboardList size={18}/> },
            { id: "syllabus", label: "Syllabus", icon: <FileText size={18}/> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all ${
                activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-xl scale-105" 
                : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100 min-h-[400px]">
          {activeTab === "syllabus" && (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-2xl font-black mb-8 text-slate-800">Course Roadmap</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.syllabus?.map((topic, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-all">
                    <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                      {i + 1}
                    </span>
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
              <h3 className="text-xl font-bold text-slate-800">Study Materials Coming Soon</h3>
              <p className="text-slate-400 max-w-xs mx-auto mt-2">The instructor is currently curating notes and videos for {course.code}.</p>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="text-center py-20 animate-in fade-in">
              <div className="w-20 h-20 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList size={40}/>
              </div>
              <h3 className="text-xl font-bold text-slate-800">No Pending Tasks</h3>
              <p className="text-slate-400 max-w-xs mx-auto mt-2">Check back later for module-specific assessments.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}