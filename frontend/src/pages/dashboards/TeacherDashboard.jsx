import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// --- Icons ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a1.5 1.5 0 0 1 .413 1.065V18a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-4.405c0-.215.113-.42.32-.53l8.69-8.69Z" />
  </svg>
);
const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.75 12.75a.75.75 0 0 1 1.06 0l4.25 4.25c.141.141.24.316.275.505.039.21.015.424-.069.614a1.272 1.272 0 0 1-.291.434l-2.408 2.408a1.272 1.272 0 0 1-.434.291c-.19.084-.404.108-.614.069a.75.75 0 0 1-.505-.275l-4.25-4.25a.75.75 0 0 1 0-1.06Z" />
    <path fillRule="evenodd" d="M12.257 6.456 12 6.25l-1.928 1.928a.75.75 0 0 1-1.427-.083L7.75 5.5a.75.75 0 0 1 1.189-.923l.794.794.275-.275A3.75 3.75 0 0 1 15 5.25c1.192 0 2.27.411 3.125 1.092a5.457 5.457 0 0 1 .494.494c.682.855 1.092 1.933 1.092 3.125A3.75 3.75 0 0 1 18.75 15a3.75 3.75 0 0 1-1.092 2.225c-.09.117-.188.232-.29.34L15.968 15h.002a.75.75 0 0 1 .151.78l-.307.922a.75.75 0 0 1-1.025.275l-1.859-1.859a.75.75 0 0 1-.275-1.025l.922-.307.78.151h.002a.75.75 0 0 1 .75-.75h2.176l.162-.061c.49-.187.89-.523 1.189-.997.35-.558.544-1.21.544-1.897A2.25 2.25 0 0 0 15 7.5a2.25 2.25 0 0 0-1.554.646L12.257 9.38Z" clipRule="evenodd" />
  </svg>
);
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21.721 12.752a9.752 9.752 0 0 0-15.01-9.522A9.752 9.752 0 0 0 1.272 17.218C2.962 20.35 6.326 22.5 10.125 22.5a9.704 9.704 0 0 0 5.483-1.621l3.69 1.096a.75.75 0 0 0 .822-.249 14.223 14.223 0 0 0 3.299-4.341.75.75 0 0 0-.256-.822Z" />
  </svg>
);
const NotificationsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.862 4.103 2.253 5.618A2.251 2.251 0 0 1 18 17.25h-2.25a.75.75 0 0 0-.75.75 1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5.75.75 0 0 0-.75-.75H6a2.251 2.251 0 0 1-2.253-1.882A6.75 6.75 0 0 1 5.25 9Z" clipRule="evenodd" />
    </svg>
);
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.91 6.194a.75.75 0 0 1 .206 1.002l-3.142 4.416a.75.75 0 0 1-.206.182l-2.435.534a.75.75 0 0 1-.362-.057.75.75 0 0 1-.157-.156.75.75 0 0 1-.157-.365l.534-2.433a.75.75 0 0 1 .18-.206L6.19 6.72a.75.75 0 0 1 1.002-.206ZM2.25 12a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-2.25v2.25H2.25Z" clipRule="evenodd" />
  </svg>
);

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar State

  // Logic States
  const [students, setStudents] = useState([]);
  const [teacherData, setTeacherData] = useState({ name: "Teacher", email: "", department: "" });
  const [notices, setNotices] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [alertText, setAlertText] = useState("");
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const [newResource, setNewResource] = useState({ title: "", subject: "", link: "" });
  const [newAssignment, setNewAssignment] = useState({ title: "", subject: "", dueDate: "" });
  const [gradingData, setGradingData] = useState({ marks: "", grade: "", feedback: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [deptInput, setDeptInput] = useState("");
  const [newCourse, setNewCourse] = useState({ title: "", code: "", duration: "4 Months", description: "", syllabus: "" });

  // API Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentRes = await axios.get("https://college-portal-backend-xi64.onrender.com/api/students/all");
        setStudents(studentRes.data);
        const noticeRes = await axios.get("https://college-portal-backend-xi64.onrender.com/api/notices");
        setNotices(noticeRes.data);
        const assignRes = await axios.get("https://college-portal-backend-xi64.onrender.com/api/assignments/all");
        setAssignments(assignRes.data);
        const resRes = await axios.get("https://college-portal-backend-xi64.onrender.com/api/resources/all");
        setResources(resRes.data);
        
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) setTeacherData(loggedInUser);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // --- Handlers ---
  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  const markAttendance = async (studentId, status) => {
    try {
      const res = await axios.post("https://college-portal-backend-xi64.onrender.com/api/attendance/update", { studentId, status });
      setStudents(prev => prev.map(s => s._id === studentId ? { ...s, presentCount: res.data.present, absentCount: res.data.absent } : s));
      alert(`Marked ${status}`);
    } catch (e) { alert("Attendance update failed"); }
  };

  const handleAddNotice = async () => {
    if (!newNotice.title || !newNotice.content) return alert("Fill all fields");
    try {
      const res = await axios.post("https://college-portal-backend-xi64.onrender.com/api/notices/add", { ...newNotice, type: "General" });
      setNotices([res.data, ...notices]);
      setNewNotice({ title: "", content: "" });
    } catch (e) { alert("Failed to publish"); }
  };

  const handleDeleteNotice = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(`https://college-portal-backend-xi64.onrender.com/api/notices/${id}`);
      setNotices(notices.filter(n => n._id !== id));
    } catch (e) { alert("Delete failed"); }
  };

  const handleAddAssignment = async () => {
    if (!newAssignment.title || !selectedStudent) return alert("Select student and title");
    try {
      const res = await axios.post("https://college-portal-backend-xi64.onrender.com/api/assignments/add", { ...newAssignment, recipient: selectedStudent, status: "Pending" });
      setAssignments([res.data, ...assignments]);
      setNewAssignment({ title: "", subject: "", dueDate: "" });
      alert("Assigned!");
    } catch (e) { alert("Assignment failed"); }
  };

  const submitGrade = async (id) => {
    try {
      await axios.put(`https://college-portal-backend-xi64.onrender.com/api/assignments/grade/${id}`, gradingData);
      const res = await axios.get("https://college-portal-backend-xi64.onrender.com/api/assignments/all");
      setAssignments(res.data);
      alert("Graded!");
    } catch (e) { alert("Grading failed"); }
  };

  const handleAddResource = async () => {
    try {
      const res = await axios.post("https://college-portal-backend-xi64.onrender.com/api/resources/add", { ...newResource, instructor: teacherData.name });
      setResources([res.data, ...resources]);
      setNewResource({ title: "", subject: "", link: "" });
    } catch (e) { alert("Resource failed"); }
  };

  const handleUpdateProfile = async () => {
    const id = teacherData.id || localStorage.getItem("userId");
    try {
      const res = await axios.put(`https://college-portal-backend-xi64.onrender.com/api/teacher/update/${id}`, { department: deptInput });
      const updated = { ...teacherData, department: res.data.department };
      setTeacherData(updated);
      localStorage.setItem("loggedInUser", JSON.stringify(updated));
      setIsEditing(false);
    } catch (e) { alert("Update failed"); }
  };

  const handleAddCourse = async () => {
    try {
      await axios.post("https://college-portal-backend-xi64.onrender.com/api/courses/add", { ...newCourse, instructor: teacherData.name });
      alert("Course Published");
      setNewCourse({ title: "", code: "", duration: "4 Months", description: "", syllabus: "" });
    } catch (e) { alert("Course creation failed"); }
  };

  const sendNotification = async () => {
    try {
      await axios.post("https://college-portal-backend-xi64.onrender.com/api/messages/send", { sender: teacherData.name, recipient: selectedStudent, text: alertText });
      alert("Alert Sent");
      setAlertText("");
    } catch (e) { alert("Message failed"); }
  };

  // --- Views ---
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Welcome, {teacherData.name}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h3 className="text-lg font-bold mb-3">Recent Notices</h3>
                <ul className="space-y-2 text-sm">
                  {notices.slice(0, 3).map(n => <li key={n._id}>• {n.title}</li>)}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                <h3 className="text-lg font-bold mb-3">Attendance</h3>
                <div className="max-h-32 overflow-y-auto text-sm space-y-1">
                    {students.map(s => <div key={s._id} className="flex justify-between border-b pb-1"><span>{s.username}</span><span>P: {s.presentCount || 0}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-4">Teacher Profile</h2>
            <div className="space-y-3">
              <p><strong>Name:</strong> {teacherData.name}</p>
              <p><strong>Email:</strong> {teacherData.email}</p>
              <p><strong>Dept:</strong> {teacherData.department || "Not Set"} <button onClick={() => setIsEditing(true)} className="text-blue-500 text-xs">[Edit]</button></p>
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <input className="border p-2 rounded dark:bg-gray-700 w-full" onChange={e => setDeptInput(e.target.value)} placeholder="New Dept" />
                  <button onClick={handleUpdateProfile} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                </div>
              )}
            </div>
          </div>
        );
      case "attendance":
        return (
          <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow">
            <h2 className="text-2xl font-bold mb-6">Attendance</h2>
            <div className="space-y-4">
              {students.map(s => (
                <div key={s._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl gap-3">
                  <div>
                    <span className="font-bold">{s.username}</span>
                    <p className="text-xs opacity-60">P: {s.presentCount || 0} | A: {s.absentCount || 0}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => markAttendance(s._id, "Present")} className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm">+ Present</button>
                    <button onClick={() => markAttendance(s._id, "Absent")} className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm">+ Absent</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "notices":
        return (
            <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow space-y-6">
                <h2 className="text-2xl font-bold">Broadcast Notice</h2>
                <div className="space-y-4">
                    <input className="w-full p-3 border rounded-xl dark:bg-gray-700" placeholder="Title" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} />
                    <textarea className="w-full p-3 border rounded-xl dark:bg-gray-700 h-24" placeholder="Content" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} />
                    <button onClick={handleAddNotice} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">Publish</button>
                </div>
                <div className="space-y-3">
                    {notices.map(n => (
                        <div key={n._id} className="p-4 border rounded-xl flex justify-between items-start">
                            <div><h4 className="font-bold">{n.title}</h4><p className="text-sm opacity-70">{n.content}</p></div>
                            <button onClick={() => handleDeleteNotice(n._id)} className="text-red-500">Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
      case "resources":
        return (
            <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow space-y-6">
                <h2 className="text-2xl font-bold">Upload Resources</h2>
                <div className="grid grid-cols-1 gap-4">
                    <input className="p-3 border rounded-xl dark:bg-gray-700" placeholder="Subject" value={newResource.subject} onChange={e => setNewResource({...newResource, subject: e.target.value})} />
                    <input className="p-3 border rounded-xl dark:bg-gray-700" placeholder="Title" value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} />
                    <input className="p-3 border rounded-xl dark:bg-gray-700" placeholder="Link" value={newResource.link} onChange={e => setNewResource({...newResource, link: e.target.value})} />
                    <button onClick={handleAddResource} className="bg-purple-600 text-white py-3 rounded-xl font-bold">Upload</button>
                </div>
                <div className="space-y-2">
                    {resources.map(r => (
                        <div key={r._id} className="p-3 border rounded-xl flex justify-between items-center text-sm">
                            <span>{r.title} ({r.subject})</span>
                            <a href={r.link} target="_blank" className="text-blue-500 underline">Link</a>
                        </div>
                    ))}
                </div>
            </div>
        );
        case "assignments":
            return (
                <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow space-y-6">
                    <h2 className="text-2xl font-bold">Assignments</h2>
                    <div className="grid grid-cols-1 gap-4 p-4 bg-blue-50 dark:bg-gray-700 rounded-xl">
                        <input className="p-2 border rounded dark:bg-gray-600" placeholder="Title" value={newAssignment.title} onChange={e => setNewAssignment({...newAssignment, title: e.target.value})} />
                        <select className="p-2 border rounded dark:bg-gray-600" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                            <option value="">Select Student</option>
                            {students.map(s => <option key={s._id} value={s.username}>{s.username}</option>)}
                        </select>
                        <button onClick={handleAddAssignment} className="bg-blue-600 text-white py-2 rounded">Post</button>
                    </div>
                    {assignments.map(a => (
                        <div key={a._id} className="p-4 border rounded-xl space-y-3">
                            <div className="flex justify-between">
                                <span className="font-bold">{a.title}</span>
                                <span className="text-xs bg-yellow-100 px-2 py-1 rounded">{a.status}</span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <input className="border p-1 text-sm rounded dark:bg-gray-700" placeholder="Marks" onChange={e => setGradingData({...gradingData, marks: e.target.value})} />
                                <button onClick={() => submitGrade(a._id)} className="bg-blue-500 text-white text-xs px-3 py-1 rounded">Grade</button>
                            </div>
                        </div>
                    ))}
                </div>
            )
      case "messages":
        return (
            <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow space-y-4">
                <h2 className="text-2xl font-bold">Private Alerts</h2>
                <select className="w-full p-3 border rounded-xl dark:bg-gray-700" value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                    <option value="">Select Student</option>
                    {students.map(s => <option key={s._id} value={s.username}>{s.username}</option>)}
                </select>
                <textarea className="w-full p-3 border rounded-xl dark:bg-gray-700 h-32" placeholder="Message..." value={alertText} onChange={e => setAlertText(e.target.value)} />
                <button onClick={sendNotification} className="w-full bg-green-600 text-white py-3 rounded-xl">Send Alert</button>
            </div>
        )
      case "manage-courses":
        return (
            <div className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow space-y-4">
                <h2 className="text-2xl font-bold">Create Course</h2>
                <input className="w-full p-3 border rounded-xl dark:bg-gray-700" placeholder="Course Title" onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
                <input className="w-full p-3 border rounded-xl dark:bg-gray-700" placeholder="Code" onChange={e => setNewCourse({...newCourse, code: e.target.value})} />
                <textarea className="w-full p-3 border rounded-xl dark:bg-gray-700 h-32" placeholder="Syllabus (comma separated)" onChange={e => setNewCourse({...newCourse, syllabus: e.target.value})} />
                <button onClick={handleAddCourse} className="w-full bg-indigo-600 text-white py-3 rounded-xl">Publish Course</button>
            </div>
        )
      default:
        return <div>Select a view</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      
      {/* --- Mobile Header --- */}
      <div className="md:hidden flex items-center justify-between w-full p-4 bg-gray-800 text-white fixed top-0 z-50">
        <h1 className="text-lg font-bold">Teacher Dashboard</h1>
        <button onClick={() => setIsSidebarOpen(true)}><MenuIcon /></button>
      </div>

      {/* --- Sidebar (Responsive) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-64 bg-gray-800 p-6 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block rounded-tr-3xl rounded-br-3xl shadow-2xl
      `}>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-white">LMS Panel</h1>
            <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}><CloseIcon /></button>
        </div>
        
        <nav className="flex-1 space-y-2 overflow-y-auto">
          <SidebarItem icon={<HomeIcon />} text="Dashboard" view="dashboard" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<PersonIcon />} text="Profile" view="profile" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<ClipboardIcon />} text="Attendance" view="attendance" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<NotificationsIcon />} text="Notices" view="notices" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<BookIcon />} text="Resources" view="resources" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<BookIcon />} text="Assignments" view="assignments" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<NotificationsIcon />} text="Direct Alerts" view="messages" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
          <SidebarItem icon={<BookIcon />} text="Manage Courses" view="manage-courses" activeView={activeView} setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} />
        </nav>

        <button onClick={handleLogout} className="w-full flex items-center p-3 rounded-xl text-white bg-red-600 mt-4">
          <LogoutIcon /> <span className="ml-3">Logout</span>
        </button>
      </aside>

      {/* --- Backdrop for mobile --- */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-[55] md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* --- Main Content --- */}
      <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

// Sidebar Helper Component
const SidebarItem = ({ icon, text, view, activeView, setActiveView }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center p-3 rounded-xl transition-all ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-300 hover:bg-gray-700"}`}
    >
      {React.cloneElement(icon, { className: "w-5 h-5 mr-3" })}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default TeacherDashboard;