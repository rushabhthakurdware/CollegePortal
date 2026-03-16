import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Trash2 } from "lucide-react"; // Import the Trash icon
// --- Icons (Same as yours) ---
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
const StudentIcon = () => (
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
const MoneyIcon = () => (
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

// --- Components ---

const AddStudentModal = ({ isOpen, onClose, onAdd, batchNames }) => {
  const [name, setName] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(batchNames[0] || "");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(selectedBatch, name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-96 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Add New Student
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {batchNames.map((b) => (
              <option key={b} value={b}>
                Batch {b}
              </option>
            ))}
          </select>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
            >
              Add Student
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Real Data States
  const [allTransactions, setAllTransactions] = useState([]);
  // Change this in your AdminDashboard component
// Replace your old static batches state with this:
const [batches, setBatches] = useState({});

const fetchStudents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/students/all");
    
    // Grouping logic with a fallback
    const grouped = res.data.reduce((acc, student) => {
      // If student.batch is missing or undefined, put them in "New/Unassigned"
      const batchName = student.batch || "Unassigned Students"; 
      
      if (!acc[batchName]) {
        acc[batchName] = { count: 0, students: [] };
      }
      acc[batchName].students.push(student);
      acc[batchName].count++;
      return acc;
    }, {});

    console.log("Grouped Data:", grouped); // Check your console to see this!
    setBatches(grouped);
    setLoading(false);
  } catch (err) {
    console.error("Error fetching students:", err);
    setLoading(false);
  }
};

// Call it when the component loads
useEffect(() => {
  fetchStudents();
}, []);

  // Fetch Payment Data from Backend
  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/payments/admin/all-transactions",
        );
        setAllTransactions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Admin Payment Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchAllPayments();
  }, []);

  const handleAddStudent = (batch, name) => {
    setBatches((prev) => ({
      ...prev,
      [batch]: {
        ...prev[batch],
        count: prev[batch].count + 1,
        students: [...prev[batch].students, name],
      },
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading dashboard...
      </div>
    );

  const renderContent = () => {
    const calculateTotal = (data) => {
      return data.reduce((acc, curr) => {
        const amount = Number(curr.amount) || 0;
        return acc + amount;
      }, 0);
    };

    // AdminDashboard.jsx

const handleDeleteStudent = async (studentId) => {
  if (!window.confirm("Are you sure? This will permanently remove the student.")) return;

  try {
    // ✅ Change "admin/delete-student" to "students/delete"
    await axios.delete(`http://localhost:5000/api/students/delete/${studentId}`);
    
    alert("Student deleted successfully!");
    fetchStudents(); // Refresh the list
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Delete failed. Check console for details.");
  }
};

    switch (activeView) {
      case "dashboard":
        const totalStudents = Object.values(batches).reduce(
          (sum, batch) => sum + batch.count,
          0,
        );
        // This version uses Number() to convert strings and || 0 to handle empty values
        const totalRevenue = allTransactions.reduce((acc, curr) => {
          const amount = Number(curr.amount) || 0;
          return acc + amount;
        }, 0);
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Admin Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
                <StudentIcon className="w-12 h-12 text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Total Students</h3>
                <p className="text-4xl font-bold text-blue-600">
                  {totalStudents}
                </p>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
                <MoneyIcon className="w-12 h-12 text-green-600 mb-3" />
                <h3 className="text-xl font-semibold mb-1">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-600">
                  ₹{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        );

      case "payments":
        const ledgerRevenue = calculateTotal(allTransactions);
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black text-gray-800 dark:text-white">
                  Financial Ledger
                </h2>
                <p className="text-gray-500">Real-time revenue tracking.</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border-l-8 border-green-500 text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Total Collected
                </p>
                <p className="text-3xl font-black text-green-600">
                  ₹{ledgerRevenue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-400 text-[10px] uppercase tracking-widest border-b">
                  <tr>
                    <th className="p-5">Student User</th>
                    <th className="p-5">Transaction ID</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Timestamp</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-600 text-gray-700 dark:text-gray-200">
                  {allTransactions.map((txn, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="p-5 font-bold">{txn.student}</td>
                      <td className="p-5 font-mono text-xs text-indigo-500">
                        {txn.id}
                      </td>
                      <td className="p-5 font-black text-green-600">
                        ₹{txn.amount}
                      </td>
                      <td className="p-5 text-gray-500 text-xs">
                        {new Date(txn.date).toLocaleString()}
                      </td>
                      <td className="p-5">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                          Success
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allTransactions.length === 0 && (
                <p className="p-10 text-center text-gray-500">
                  No transactions recorded yet.
                </p>
              )}
            </div>
          </div>
        );

  case "students":
  return (
    <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl p-8 min-h-[400px]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">
          Student Directory
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-all"
        >
          + Add Student
        </button>
      </div>

      <div className="space-y-8">
        {Object.keys(batches).length > 0 ? (
          Object.keys(batches).map((batchName) => (
            <div key={batchName} className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-indigo-600 uppercase tracking-widest">
                  {batchName}
                </h3>
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-black">
                  {batches[batchName].students.length} REGISTERED
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batches[batchName].students.map((student) => (
                  <li key={student._id} className="group flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-300 transition-all shadow-sm">
  <div className="flex items-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
        {student.name?.charAt(0).toUpperCase()}
      </div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
    
    <div>
      <h4 className="font-black text-slate-800 leading-tight">{student.name}</h4>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{student.username}</p>
    </div>
  </div>

  <button 
    onClick={() => handleDeleteStudent(student._id)}
    className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
  >
    <Trash2 size={20} />
  </button>
</li>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <p className="font-bold italic">No students found in the YCCE database.</p>
            <p className="text-xs mt-1">Check if the backend is running and students have the 'student' role.</p>
          </div>
        )}
      </div>
    </div>
  );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col rounded-tr-3xl rounded-br-3xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-8">Admin Portal</h1>
        <nav className="flex-1 space-y-4">
          <SidebarItem
            icon={<HomeIcon />}
            text="Dashboard"
            view="dashboard"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<MoneyIcon />}
            text="Payments"
            view="payments"
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <SidebarItem
            icon={<StudentIcon />}
            text="Students"
            view="students"
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </nav>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-3 rounded-xl text-white bg-red-600 hover:bg-red-700 mt-8"
        >
          <LogoutIcon className="mr-3" /> Logout
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

const SidebarItem = ({ icon, text, view, activeView, setActiveView }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center p-3 rounded-xl transition-colors ${isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700"}`}
    >
      {React.cloneElement(icon, { className: "mr-3 text-lg" })}
      <span>{text}</span>
    </button>
  );
};

export default AdminDashboard;
