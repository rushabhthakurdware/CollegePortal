import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <path d="m11.142 6.024 3.42 3.422a.75.75 0 1 1-1.06 1.06l-3.422-3.42a.75.75 0 0 1 1.062-1.062Z" />
  </svg>
);
const NotificationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.862 4.103 2.253 5.618A2.251 2.251 0 0 1 18 17.25h-2.25a.75.75 0 0 0-.75.75 1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5.75.75 0 0 0-.75-.75H6a2.251 2.251 0 0 1-2.253-1.882A6.75 6.75 0 0 1 5.25 9Z" clipRule="evenodd" />
  </svg>
);
const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21.721 12.752a9.752 9.752 0 0 0-15.01-9.522A9.752 9.752 0 0 0 1.272 17.218C2.962 20.35 6.326 22.5 10.125 22.5a9.704 9.704 0 0 0 5.483-1.621l3.69 1.096a.75.75 0 0 0 .822-.249 14.223 14.223 0 0 0 3.299-4.341.75.75 0 0 0-.256-.822Z" />
  </svg>
);
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.91 6.194a.75.75 0 0 1 .206 1.002l-3.142 4.416a.75.75 0 0 1-.206.182l-2.435.534a.75.75 0 0 1-.362-.057.75.75 0 0 1-.157-.156.75.75 0 0 1-.157-.365l.534-2.433a.75.75 0 0 1 .18-.206L6.19 6.72a.75.75 0 0 1 1.002-.206ZM2.25 12a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-2.25v2.25H2.25Z" clipRule="evenodd" />
  </svg>
);

// Mock data to simulate API responses
const mockTeacherData = {
  name: "Mr. Alex Johnson",
  email: "alex.johnson@example.com",
  department: "Computer Science",
  phone: "555-1234",
  bio: "Passionate educator dedicated to student success."
};

const mockStudents = [
  { id: 1, name: "Student A", attendance: 90, lastUpdated: "2024-10-25" },
  { id: 2, name: "Student B", attendance: 85, lastUpdated: "2024-10-25" },
  { id: 3, name: "Student C", attendance: 95, lastUpdated: "2024-10-25" },
];

const mockNotices = [
  { id: 1, title: "Class Cancellation", content: "No class on Monday due to a faculty meeting.", date: "2024-10-24" },
  { id: 2, title: "Exam Schedule", content: "Mid-term exams start next week. Check the academic calendar.", date: "2024-10-22" },
];

const mockAssignments = [
  { id: 1, title: "Introduction to React", course: "CS 101", dueDate: "2024-11-05" },
  { id: 2, title: "Backend API Design", course: "CS 202", dueDate: "2024-11-15" },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [teacherData, setTeacherData] = useState(mockTeacherData);
  const [students, setStudents] = useState(mockStudents);
  const [notices, setNotices] = useState(mockNotices);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '' });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    // In a real app, you would fetch data here from your backend
    // For example:
    // const fetchTeacherData = async () => {
    //   try {
    //     const res = await axios.get('/api/teachers/profile');
    //     setTeacherData(res.data);
    //   } catch (error) {
    //     console.error('Failed to fetch teacher data:', error);
    //   }
    // };
    // fetchTeacherData();
  }, []);

  const handleUpdateProfile = () => {
    // Logic to update profile on backend
    alert("Profile updated! (This would send data to the backend)");
  };

  const handleAddNotice = () => {
    // Logic to add a new notice to the backend
    if (newNotice.title && newNotice.content) {
      const newNoticeWithId = { ...newNotice, id: Date.now(), date: new Date().toISOString().split('T')[0] };
      setNotices([...notices, newNoticeWithId]);
      setNewNotice({ title: '', content: '' });
      alert("Notice added! (This would be a backend call)");
    } else {
      alert("Please fill out all fields for the notice.");
    }
  };

  const handleAddAssignment = () => {
    // Logic to add a new assignment to the backend
    if (newAssignment.title && newAssignment.course && newAssignment.dueDate) {
      const newAssignmentWithId = { ...newAssignment, id: Date.now() };
      setAssignments([...assignments, newAssignmentWithId]);
      setNewAssignment({ title: '', course: '', dueDate: '' });
      alert("Assignment added! (This would be a backend call)");
    } else {
      alert("Please fill out all fields for the assignment.");
    }
  };

  const handleUpdateAttendance = () => {
    // Logic to update attendance on the backend
    alert("Attendance updated! (This would send data to the backend)");
    setSelectedStudent(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome, {teacherData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Notices Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Recent Notices</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  {notices.slice(0, 3).map(notice => (
                    <li key={notice.id} className="border-b dark:border-gray-600 pb-2 last:border-b-0">
                      <span className="font-medium">{notice.title}</span> - <span className="text-sm">{notice.date}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveView('notices')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors"
                >
                  View All
                </button>
              </div>
              {/* Assignments Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Upcoming Assignments</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  {assignments.slice(0, 3).map(assignment => (
                    <li key={assignment.id} className="border-b dark:border-gray-600 pb-2 last:border-b-0">
                      <span className="font-medium">{assignment.title}</span> - <span className="text-sm">Due: {assignment.dueDate}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveView('assignments')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors"
                >
                  Manage Assignments
                </button>
              </div>
              {/* Student Attendance Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Student Attendance</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  {students.slice(0, 3).map(student => (
                    <li key={student.id} className="border-b dark:border-gray-600 pb-2 last:border-b-0">
                      <span className="font-medium">{student.name}</span> - <span className="text-sm">Attendance: {student.attendance}%</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveView('attendance')}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition-colors"
                >
                  Manage Attendance
                </button>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">My Profile</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-200">
              <p>
                <span className="font-semibold">Name:</span> {teacherData.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {teacherData.email}
              </p>
              <p>
                <span className="font-semibold">Department:</span> {teacherData.department}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {teacherData.phone}
              </p>
              <p>
                <span className="font-semibold">Bio:</span> {teacherData.bio}
              </p>
            </div>
            <button
              onClick={() => {
                // Here you would add an edit form
                alert("This would open an edit form.");
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        );
      case 'attendance':
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Manage Student Attendance</h2>
            {selectedStudent ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Update Attendance for {selectedStudent.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">Current Attendance: {selectedStudent.attendance}%</p>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={attendance[selectedStudent.id] || selectedStudent.attendance}
                  onChange={(e) => setAttendance({ ...attendance, [selectedStudent.id]: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleUpdateAttendance}
                  className="w-full px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-colors"
                >
                  Save Attendance
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full mt-2 px-6 py-2 bg-gray-400 text-white rounded-xl shadow-md hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {students.map(student => (
                  <li key={student.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                    <span className="font-medium text-gray-800 dark:text-gray-100">{student.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Attendance: {student.attendance}%</span>
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Update
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'notices':
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Create New Notice</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Notice Title"
                value={newNotice.title}
                onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Notice Content"
                value={newNotice.content}
                onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl h-32 resize-none text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddNotice}
                className="w-full px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-colors"
              >
                Publish Notice
              </button>
            </div>
            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">All Notices</h3>
            <ul className="space-y-4">
              {notices.map(notice => (
                <li key={notice.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{notice.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Published on: {notice.date}</p>
                  <p className="mt-2 text-gray-700 dark:text-gray-200">{notice.content}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'assignments':
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Give Assignments</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Assignment Title"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Course Name"
                value={newAssignment.course}
                onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                placeholder="Due Date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:focus:ring-blue-500"
              />
              <button
                onClick={handleAddAssignment}
                className="w-full px-6 py-2 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition-colors"
              >
                Publish Assignment
              </button>
            </div>
            <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">All Assignments</h3>
            <ul className="space-y-4">
              {assignments.map(assignment => (
                <li key={assignment.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">{assignment.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Course: {assignment.course}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Due: {assignment.dueDate}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    navigate("/"); // Navigate to the login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 dark:bg-gray-900 p-6 flex flex-col rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Teacher Dashboard</h1>
        </div>
        <nav className="flex-1 space-y-4">
          <SidebarItem icon={<HomeIcon />} text="Dashboard" view="dashboard" activeView={activeView} setActiveView={setActiveView} />
          <SidebarItem icon={<PersonIcon />} text="Profile" view="profile" activeView={activeView} setActiveView={setActiveView} />
          <SidebarItem icon={<ClipboardIcon />} text="Attendance" view="attendance" activeView={activeView} setActiveView={setActiveView} />
          <SidebarItem icon={<NotificationsIcon />} text="Notices" view="notices" activeView={activeView} setActiveView={setActiveView} />
          <SidebarItem icon={<BookIcon />} text="Assignments" view="assignments" activeView={activeView} setActiveView={setActiveView} />
        </nav>
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-xl text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogoutIcon className="mr-3 text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, text, view, activeView, setActiveView }) => {
  const isActive = activeView === view;
  const activeClass = isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center p-3 rounded-xl transition-colors ${activeClass}`}
    >
      {React.cloneElement(icon, { className: "mr-3 text-lg" })}
      <span>{text}</span>
    </button>
  );
};

export default TeacherDashboard;
