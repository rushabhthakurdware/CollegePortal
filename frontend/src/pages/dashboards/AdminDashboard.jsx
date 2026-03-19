import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Trash2, Menu, X, CreditCard, Users, LayoutDashboard, LogOut } from "lucide-react";

// --- Components ---
// Add this inside AdminDashboard
const handleAddStudent = async (batch, name) => {
  try {
    // Replace this URL with your actual backend endpoint for adding students
    await axios.post("http://localhost:5000/api/students/add", {
      name: name,
      batch: batch,
      role: "student" // Ensuring the role is set if your backend requires it
    });

    alert("Student added successfully!");
    fetchStudents(); // Refresh the grouped list from the server
    setIsModalOpen(false); // Close the modal
  } catch (err) {
    console.error("Failed to add student:", err);
    alert(err.response?.data?.message || "Failed to add student. Make sure your backend is running.");
  }
};
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            autoFocus
            className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="w-full p-3 border rounded-xl dark:bg-gray-700 dark:text-white"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {batchNames.length > 0 ? (
              batchNames.map((b) => (
                <option key={b} value={b}>Batch {b}</option>
              ))
            ) : (
              <option value="Unassigned Students">Unassigned Students</option>
            )}
          </select>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200"
            >
              Add
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [allTransactions, setAllTransactions] = useState([]);
  const [batches, setBatches] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students/all");
      const grouped = res.data.reduce((acc, student) => {
        const batchName = student.batch || "Unassigned Students";
        if (!acc[batchName]) {
          acc[batchName] = { count: 0, students: [] };
        }
        acc[batchName].students.push(student);
        acc[batchName].count++;
        return acc;
      }, {});
      setBatches(grouped);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const fetchAllPayments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/payments/admin/all-transactions");
        setAllTransactions(res.data);
      } catch (err) {
        console.error("Admin Payment Fetch Error:", err);
      }
    };
    fetchAllPayments();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm("Are you sure? This will permanently remove the student.")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/delete/${studentId}`);
      alert("Student deleted!");
      fetchStudents();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen font-bold text-gray-400 animate-pulse">
      Initialising Admin Portal...
    </div>
  );

  const renderContent = () => {
    const totalStudents = Object.values(batches).reduce((sum, batch) => sum + batch.count, 0);
    const totalRevenue = allTransactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white">Admin Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Users size={32} /></div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase">Total Students</p>
                  <p className="text-3xl font-black">{totalStudents}</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><CreditCard size={32} /></div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase">Total Revenue</p>
                  <p className="text-3xl font-black">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tight">Ledger</h2>
              <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-green-100">
                <p className="text-[10px] font-bold uppercase opacity-80">Collection</p>
                <p className="text-xl font-black">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 dark:bg-gray-700 text-gray-400 text-[10px] uppercase tracking-widest border-b">
                  <tr>
                    <th className="p-5">Student</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Date</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-600 text-sm">
                  {allTransactions.map((txn, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-5 font-bold">{txn.student}</td>
                      <td className="p-5 font-black text-green-600">₹{txn.amount}</td>
                      <td className="p-5 text-gray-400">{new Date(txn.date).toLocaleDateString()}</td>
                      <td className="p-5"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase">Success</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {allTransactions.length === 0 && <p className="p-10 text-center text-gray-400 italic">No payments found.</p>}
            </div>
          </div>
        );

      case "students":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm p-4 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Directory</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
              >
                + Add Student
              </button>
            </div>

            <div className="space-y-10">
              {Object.keys(batches).map((batchName) => (
                <div key={batchName}>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-sm font-black text-indigo-500 uppercase tracking-widest">{batchName}</h3>
                    <div className="h-px flex-1 bg-gray-100"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {batches[batchName].students.map((student) => (
                      <div key={student._id} className="group flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-transparent hover:border-indigo-200 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black">{student.name?.charAt(0)}</div>
                          <div>
                            <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{student.name}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{student.username}</p>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteStudent(student._id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* --- Mobile Top Bar --- */}
      <div className="md:hidden fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
        <span className="font-black tracking-tighter text-xl">ADMIN</span>
        <button onClick={() => setIsSidebarOpen(true)}><Menu size={28} /></button>
      </div>

      {/* --- Sidebar --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] w-72 bg-gray-800 p-6 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block rounded-tr-[40px] rounded-br-[40px] shadow-2xl
      `}>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-white tracking-tighter">YCCE ADMIN</h1>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}><X /></button>
        </div>

        <nav className="flex-1 space-y-3">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Overview" 
            view="dashboard" 
            activeView={activeView} 
            setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} 
          />
          <SidebarItem 
            icon={<CreditCard size={20} />} 
            text="Payments" 
            view="payments" 
            activeView={activeView} 
            setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} 
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            text="Students" 
            view="students" 
            activeView={activeView} 
            setActiveView={(v) => { setActiveView(v); setIsSidebarOpen(false); }} 
          />
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl text-white bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all font-bold mt-8"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* --- Mobile Backdrop --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden" 
          />
        )}
      </AnimatePresence>

      <main className="flex-1 p-4 md:p-10 pt-24 md:pt-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        batchNames={Object.keys(batches)}
        onAdd={handleAddStudent}
      />
    </div>
  );
};

const SidebarItem = ({ icon, text, view, activeView, setActiveView }) => {
  const isActive = activeView === view;
  return (
    <button
      onClick={() => setActiveView(view)}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${isActive ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </button>
  );
};

export default AdminDashboard;