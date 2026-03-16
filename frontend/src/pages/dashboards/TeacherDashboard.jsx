import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

// ... Icons stay exactly where they are (outside the component) ...
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a1.5 1.5 0 0 1 .413 1.065V18a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-4.405c0-.215.113-.42.32-.53l8.69-8.69Z" />
  </svg>
);
const PersonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
      clipRule="evenodd"
    />
  </svg>
);
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12.75 12.75a.75.75 0 0 1 1.06 0l4.25 4.25c.141.141.24.316.275.505.039.21.015.424-.069.614a1.272 1.272 0 0 1-.291.434l-2.408 2.408a1.272 1.272 0 0 1-.434.291c-.19.084-.404.108-.614.069a.75.75 0 0 1-.505-.275l-4.25-4.25a.75.75 0 0 1 0-1.06Z" />

    <path
      fillRule="evenodd"
      d="M12.257 6.456 12 6.25l-1.928 1.928a.75.75 0 0 1-1.427-.083L7.75 5.5a.75.75 0 0 1 1.189-.923l.794.794.275-.275A3.75 3.75 0 0 1 15 5.25c1.192 0 2.27.411 3.125 1.092a5.457 5.457 0 0 1 .494.494c.682.855 1.092 1.933 1.092 3.125A3.75 3.75 0 0 1 18.75 15a3.75 3.75 0 0 1-1.092 2.225c-.09.117-.188.232-.29.34L15.968 15h.002a.75.75 0 0 1 .151.78l-.307.922a.75.75 0 0 1-1.025.275l-1.859-1.859a.75.75 0 0 1-.275-1.025l.922-.307.78.151h.002a.75.75 0 0 1 .75-.75h2.176l.162-.061c.49-.187.89-.523 1.189-.997.35-.558.544-1.21.544-1.897A2.25 2.25 0 0 0 15 7.5a2.25 2.25 0 0 0-1.554.646L12.257 9.38Z"
      clipRule="evenodd"
    />

    <path d="m11.142 6.024 3.42 3.422a.75.75 0 1 1-1.06 1.06l-3.422-3.42a.75.75 0 0 1 1.062-1.062Z" />
  </svg>
);
const NotificationsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.862 4.103 2.253 5.618A2.251 2.251 0 0 1 18 17.25h-2.25a.75.75 0 0 0-.75.75 1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5.75.75 0 0 0-.75-.75H6a2.251 2.251 0 0 1-2.253-1.882A6.75 6.75 0 0 1 5.25 9Z"
      clipRule="evenodd"
    />
  </svg>
);
const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M21.721 12.752a9.752 9.752 0 0 0-15.01-9.522A9.752 9.752 0 0 0 1.272 17.218C2.962 20.35 6.326 22.5 10.125 22.5a9.704 9.704 0 0 0 5.483-1.621l3.69 1.096a.75.75 0 0 0 .822-.249 14.223 14.223 0 0 0 3.299-4.341.75.75 0 0 0-.256-.822Z" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.91 6.194a.75.75 0 0 1 .206 1.002l-3.142 4.416a.75.75 0 0 1-.206.182l-2.435.534a.75.75 0 0 1-.362-.057.75.75 0 0 1-.157-.156.75.75 0 0 1-.157-.365l.534-2.433a.75.75 0 0 1 .18-.206L6.19 6.72a.75.75 0 0 1 1.002-.206ZM2.25 12a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-2.25v2.25H2.25Z"
      clipRule="evenodd"
    />
  </svg>
);

// Mock data (Static)
const mockNotices = [
  {
    id: 1,
    title: "Class Cancellation",
    content: "No class on Monday.",
    date: "2024-10-24",
  },
  {
    id: 2,
    title: "Exam Schedule",
    content: "Mid-term exams start next week.",
    date: "2024-10-22",
  },
];

const mockTeacherData = {
  name: "Dr. Smith",
  email: "Smith@gmail.com",
  department: "Computer Science",
  phone: "123-456-7890",
  bio: "Passionate about teaching and research in AI.",
};

const TeacherDashboard = () => {
  const navigate = useNavigate();

  // 1. STATE DEFINITIONS (Must be inside the function)
  const [activeView, setActiveView] = useState("dashboard");
  const [students, setStudents] = useState([]); // Initialize as empty array
  const [teacherData, setTeacherData] = useState(mockTeacherData);
  const [notices, setNotices] = useState(mockNotices);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [alertText, setAlertText] = useState("");

  // To store the list of assignments fetched from the DB
  const [assignments, setAssignments] = useState([]);
  // To handle the input from the "Add Assignment" form
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    subject: "",
    dueDate: "",
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/assignments/all",
        );
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching assignments:", err);
      }
    };
    fetchAssignments();
  }, []);

  const handleAddAssignment = async () => {
    if (!newAssignment.title || !selectedStudent) {
      return alert("Please select a student and fill the title.");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/assignments/add",
        {
          ...newAssignment,
          recipient: selectedStudent, // This links the task to ONE student
          status: "Pending",
        },
      );

      setAssignments([res.data, ...assignments]);
      setNewAssignment({ title: "", subject: "", dueDate: "" });
      setSelectedStudent("");
      alert("Assignment assigned to " + selectedStudent);
    } catch (err) {
      alert("Error posting assignment");
    }
  };
  const [gradingData, setGradingData] = useState({
    marks: "",
    grade: "",
    feedback: "",
  });

  const submitGrade = async (assignmentId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/assignments/grade/${assignmentId}`,
        gradingData,
      );
      alert("Grade updated!");
      // Refresh your assignments list
      const res = await axios.get("http://localhost:5000/api/assignments/all");
      setAssignments(res.data);
    } catch (err) {
      alert("Grading failed");
    }
  };

  const sendNotification = async () => {
    if (!selectedStudent || !alertText) {
      return alert("Please select a student and enter a message.");
    }

    try {
      await axios.post("http://localhost:5000/api/messages/send", {
        sender: teacherData.name, // The logged-in teacher
        recipient: selectedStudent, // The student's username
        text: alertText,
      });

      alert(`Alert successfully sent to ${selectedStudent}`);
      setAlertText(""); // Clear the textarea
    } catch (err) {
      console.error("Error sending alert:", err);
      alert("Failed to send alert.");
    }
  };
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resources/all");
        setResources(res.data);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);

  // Add this to your main useEffect fetching logic:
  // const res = await axios.get("http://localhost:5000/api/resources/all");
  // setResources(res.data);
  // 2. DATA FETCHING (Unified into one Effect)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Students from MongoDB
        const studentRes = await axios.get(
          "http://localhost:5000/api/students",
        );
        setStudents(studentRes.data);

        // ✅ Fetch the real notices from your backend
        const noticeRes = await axios.get(
          "http://localhost:5000/api/notices/all",
        );
        setNotices(noticeRes.data);

        // Load Teacher Profile
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
          setTeacherData(loggedInUser);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  // 3. HELPER FUNCTIONS
  const markAttendance = async (studentId, status) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/attendance/update",
        {
          studentId,
          status,
        },
      );

      // Update local state instantly
      setStudents((prevStudents) =>
        prevStudents.map((s) =>
          s._id === studentId
            ? {
                ...s,
                presentCount: res.data.present,
                absentCount: res.data.absent,
              }
            : s,
        ),
      );
      alert(`Marked as ${status}!`);
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance on server.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [newNotice, setNewNotice] = useState({ title: "", content: "" });

  const handleAddNotice = async () => {
    if (newNotice.title && newNotice.content) {
      try {
        const res = await axios.post("http://localhost:5000/api/notices/add", {
          title: newNotice.title,
          content: newNotice.content,
          // Match the 'type' field in your Schema
          type: "General",
        });

        // ✅ FIX: res.data IS the notice object based on your 'res.status(201).json(savedNotice)'
        setNotices([res.data, ...notices]);

        setNewNotice({ title: "", content: "" });
        alert("Notice published successfully!");
      } catch (error) {
        console.error("Publish error:", error);
        alert("Failed to publish notice.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteNotice = async (noticeId) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await axios.delete(`http://localhost:5000/api/notices/${noticeId}`);
        // Update local state to remove the notice from the UI immediately
        setNotices(notices.filter((n) => n._id !== noticeId));
        alert("Notice deleted.");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Could not delete the notice.");
      }
    }
  };

  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    title: "",
    link: "",
    subject: "",
  });

  const handleAddResource = async () => {
    if (newResource.title && newResource.link) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/resources/add",
          {
            ...newResource,
            instructor: teacherData.name, // Automatically assign the logged-in teacher
          },
        );
        setResources([res.data, ...resources]); // Update UI
        setNewResource({ title: "", subject: "", link: "" }); // Clear form
        alert("Resource uploaded successfully!");
      } catch (err) {
        alert("Failed to add resource.");
      }
    } else {
      alert("Please provide at least a title and a link.");
    }
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm("Delete this resource?")) {
      try {
        await axios.delete(`http://localhost:5000/api/resources/${id}`);
        setResources(resources.filter((r) => r._id !== id));
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const [newCourse, setNewCourse] = useState({
    title: "",
    code: "",
    duration: "4 Months",
    description: "",
    syllabus: "", // We will take this as a comma-separated string
  });

  const handleAddCourse = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const instructorName =
      loggedInUser?.name || loggedInUser?.username || "Staff";

    if (!newCourse.title || !newCourse.code) {
      return alert("Please enter both the Course Title and Course Code.");
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses/add",
        {
          title: newCourse.title,
          code: newCourse.code,
          instructor: instructorName, // ✅ This ensures the 'required' field is met
          duration: newCourse.duration || "4 Months",
          description: newCourse.description,
          syllabus: newCourse.syllabus,
        },
      );

      if (response.status === 201) {
        alert("Course Successfully Published!");
        // Reset the form
        setNewCourse({
          title: "",
          code: "",
          duration: "4 Months",
          description: "",
          syllabus: "",
        });
      }
      alert("Course Published Successfully!");
      setNewCourse({
        title: "",
        code: "",
        duration: "4 Months",
        description: "",
        syllabus: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add course");
    }
  };
  // 4. VIEW RENDERING
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Welcome, {teacherData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Notices Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Recent Notices</h3>
                <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                  {notices.slice(0, 2).map((n) => (
                    <li key={n._id || n.id}>• {n.title}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveView("notices")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm"
                >
                  View & Add
                </button>
              </div>

              {/* Attendance Summary */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Student Attendance
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 max-h-48 overflow-y-auto">
                  {students.map((student) => (
                    <li
                      key={student._id}
                      className="border-b dark:border-gray-600 pb-2 flex justify-between"
                    >
                      <span className="font-medium">{student.username}</span>
                      <span className="text-sm">
                        P: {student.presentCount || 0}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveView("attendance")}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl text-sm"
                >
                  Manage All
                </button>
              </div>
            </div>
          </div>
        );

      case "notices":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Broadcast a Notice</h2>

            {/* Input Section */}
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Notice Title"
                className="w-full p-3 border rounded-xl dark:bg-gray-800"
                value={newNotice.title}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, title: e.target.value })
                }
              />
              <textarea
                placeholder="Content"
                className="w-full p-3 border rounded-xl dark:bg-gray-800 h-32"
                value={newNotice.content}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, content: e.target.value })
                }
              ></textarea>
              <button
                onClick={handleAddNotice}
                className="w-full py-3 bg-green-600 text-white rounded-xl font-bold"
              >
                Publish Notice
              </button>
            </div>

            {/* List Section */}
            <h3 className="text-xl font-bold mb-4">Previous Notices</h3>
            <div className="space-y-3">
              {notices &&
                notices.map((n) => {
                  // ✅ Correct: The safety check happens BEFORE the return
                  if (!n) return null;

                  return (
                    <div
                      key={n._id || n.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border dark:border-gray-600"
                    >
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">
                        {n.title}
                      </h4>
                      <p className="text-sm opacity-70 text-gray-600 dark:text-gray-300">
                        {n.content}
                      </p>
                      {n.date && (
                        <span className="text-[10px] opacity-50 block mt-2">
                          {new Date(n.date).toLocaleDateString()}
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteNotice(n._id)}
                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Notice"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              {/* Fallback if no notices exist */}
              {notices.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No notices published yet.
                </p>
              )}
            </div>
          </div>
        );

      case "attendance":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Manage Attendance
            </h2>
            <ul className="space-y-4">
              {students.length > 0 ? (
                students.map((student) => (
                  <li
                    key={student._id}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <div>
                      <span className="font-bold text-lg block">
                        {student.username}
                      </span>
                      <div className="text-sm text-gray-500">
                        P: {student.presentCount || 0} | A:{" "}
                        {student.absentCount || 0}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markAttendance(student._id, "Present")}
                        className="bg-green-600 px-4 py-2 rounded-lg text-white font-bold"
                      >
                        + Present
                      </button>
                      <button
                        onClick={() => markAttendance(student._id, "Absent")}
                        className="bg-red-600 px-4 py-2 rounded-lg text-white font-bold"
                      >
                        + Absent
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No students found in the database.</p>
              )}
            </ul>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Teacher Profile</h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {teacherData.name}
              </p>
              <p>
                <strong>Email:</strong> {teacherData.email}
              </p>
              <p>
                <strong>Dept:</strong> {teacherData.department}
              </p>
            </div>
          </div>
        );

      case "resources":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-purple-900 dark:text-purple-100">
              Upload Subject Resources
            </h2>

            {/* Upload Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-2xl">
              <input
                type="text"
                placeholder="Subject (e.g. Maths)"
                className="p-3 border rounded-xl dark:bg-gray-900"
                value={newResource.subject}
                onChange={(e) =>
                  setNewResource({ ...newResource, subject: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Resource Title (e.g. Unit 1 Notes)"
                className="p-3 border rounded-xl dark:bg-gray-900"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource({ ...newResource, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Drive/Resource Link"
                className="p-3 border rounded-xl dark:bg-gray-900"
                value={newResource.link}
                onChange={(e) =>
                  setNewResource({ ...newResource, link: e.target.value })
                }
              />
              <button
                onClick={handleAddResource}
                className="md:col-span-3 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors"
              >
                Add Resource to Student Portal
              </button>
            </div>

            {/* Existing Resources List */}
            <h3 className="text-xl font-bold mb-4">Manage Current Resources</h3>
            <div className="space-y-3">
              {resources.map((res) => (
                <div
                  key={res._id}
                  className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-purple-100"
                >
                  <div>
                    <span className="text-xs font-bold text-purple-600 uppercase">
                      {res.subject}
                    </span>
                    <h4 className="font-bold">{res.title}</h4>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-500 underline"
                    >
                      Verify Link
                    </a>
                  </div>
                  <button
                    onClick={() => handleDeleteResource(res._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl p-8 max-w-2xl">
            <h2 className="text-3xl font-bold mb-6 text-green-800 dark:text-green-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a1.75 1.75 0 0 1-1.644 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a.25.25 0 0 0 .232 0l9.714-5.978Z" />
              </svg>
              Send Private Student Alert
            </h2>

            <div className="space-y-6">
              {/* Dropdown to select student */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Recipient Student:
                </label>
                <select
                  className="w-full p-4 border rounded-2xl dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="">-- Choose a Student --</option>
                  {students.map((s) => (
                    <option key={s._id} value={s.username}>
                      {s.username}
                    </option>
                  ))}
                </select>
              </div>

              {/* Textarea for message */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message:
                </label>
                <textarea
                  placeholder="e.g., Please meet me after class regarding your project."
                  className="w-full p-4 border rounded-2xl dark:bg-gray-800 h-32 focus:ring-2 focus:ring-green-500 outline-none"
                  value={alertText}
                  onChange={(e) => setAlertText(e.target.value)}
                />
              </div>

              <button
                onClick={sendNotification}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-green-200"
              >
                Send One-Way Alert
              </button>
            </div>
          </div>
        );

      case "assignments":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-blue-900 dark:text-blue-100">
              Post New Assignment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl">
              <input
                type="text"
                placeholder="Assignment Title"
                className="p-3 border rounded-xl"
                value={newAssignment.title}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Subject"
                className="p-3 border rounded-xl"
                value={newAssignment.subject}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    subject: e.target.value,
                  })
                }
              />
              <input
                type="date"
                className="p-3 border rounded-xl"
                value={newAssignment.dueDate}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    dueDate: e.target.value,
                  })
                }
              />
              {/* ✅ ADDED: Select Student for this assignment */}
              <select
                className="p-3 border rounded-xl"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Assign to Student...</option>
                {students.map((s) => (
                  <option key={s._id} value={s.username}>
                    {s.username}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddAssignment}
                className="md:col-span-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
              >
                Post Assignment
              </button>
            </div>

            <h3 className="text-xl font-bold mb-4">
              Active Assignments & Grading
            </h3>
            <div className="space-y-6">
              {assignments.map((item) => (
                <div
                  key={item._id}
                  className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-blue-100 dark:border-gray-600"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
                        {item.subject}
                      </p>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-red-500 font-bold">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                      {/* ✅ Show who this belongs to */}
                      <p className="text-xs text-gray-500 mt-1 italic">
                        Recipient: {item.recipient || "All Students"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === "Graded" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </div>

                  {/* ✅ THE FIX: The grading form is now INSIDE the map loop */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold mb-2">
                      Update Grade & Feedback:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="number"
                        placeholder="Marks"
                        className="p-2 border rounded-lg w-24 dark:bg-gray-900"
                        onChange={(e) =>
                          setGradingData({
                            ...gradingData,
                            marks: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Grade (A, B+)"
                        className="p-2 border rounded-lg w-32 dark:bg-gray-900"
                        onChange={(e) =>
                          setGradingData({
                            ...gradingData,
                            grade: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Feedback"
                        className="p-2 border rounded-lg flex-1 dark:bg-gray-900"
                        onChange={(e) =>
                          setGradingData({
                            ...gradingData,
                            feedback: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() => submitGrade(item._id)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all active:scale-95"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "manage-courses":
        return (
          <div className="bg-white dark:bg-gray-700 rounded-[40px] shadow-2xl p-10 border border-gray-100 max-w-4xl">
            <h2 className="text-3xl font-black text-gray-800 mb-2">
              Create New Course
            </h2>
            <p className="text-gray-400 mb-8 font-medium text-sm italic">
              Publish a new subject to the student catalog.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Course Title (e.g. Operating Systems)"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Course Code (e.g. CS-402)"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                  value={newCourse.code}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, code: e.target.value })
                  }
                />
                <textarea
                  placeholder="Course Description"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-32"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-black text-indigo-500 uppercase ml-2 tracking-widest">
                  Syllabus Topics (Comma separated)
                </p>
                <textarea
                  placeholder="Introduction, Memory Management, Scheduling..."
                  className="w-full p-4 bg-indigo-50/50 border-2 border-dashed border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-48 text-sm font-medium"
                  value={newCourse.syllabus}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, syllabus: e.target.value })
                  }
                />
                <button
                  onClick={handleAddCourse}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Publish Course to Catalog
                </button>
              </div>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                {course.enrolledStudents.length} Students Enrolled
              </span>
            </div>
          </div>
        );
      default:
        return <div className="p-8">Select a view from the sidebar</div>;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col rounded-tr-3xl rounded-br-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-8">
          Teacher Dashboard
        </h1>
        <nav className="flex-1 space-y-4">
          <SidebarItem
            icon={<HomeIcon />}
            text="Dashboard"
            view="dashboard"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<PersonIcon />}
            text="Profile"
            view="profile"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<ClipboardIcon />}
            text="Attendance"
            view="attendance"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<NotificationsIcon />}
            text="Notices"
            view="notices"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<BookIcon />}
            text="Resources"
            view="resources"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<BookIcon />}
            text="Assignments"
            view="assignments"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<NotificationsIcon />}
            text="Direct Alerts"
            view="messages"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<BookIcon />}
            text="Manage Courses"
            view="manage-courses"
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-xl text-white bg-red-600 mt-8"
        >
          <LogoutIcon className="mr-3" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

// Sidebar Helper
const SidebarItem = ({ icon, text, view, activeView, setActiveView }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center p-3 rounded-xl transition-colors ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700"}`}
    >
      {React.cloneElement(icon, { className: "mr-3" })}
      <span>{text}</span>
    </button>
  );
};

export default TeacherDashboard;
