import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a1.5 1.5 0 0 1 .413 1.065V18a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2v-4.405c0-.215.113-.42.32-.53l8.69-8.69Z" />
  </svg>
);
const StudentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);
const MoneyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12.75 12.75a.75.75 0 0 1 1.06 0l4.25 4.25c.141.141.24.316.275.505.039.21.015.424-.069.614a1.272 1.272 0 0 1-.291.434l-2.408 2.408a1.272 1.272 0 0 1-.434.291c-.19.084-.404.108-.614.069a.75.75 0 0 1-.505-.275l-4.25-4.25a.75.75 0 0 1 0-1.06Z" />
    <path fillRule="evenodd" d="M12.257 6.456 12 6.25l-1.928 1.928a.75.75 0 0 1-1.427-.083L7.75 5.5a.75.75 0 0 1 1.189-.923l.794.794.275-.275A3.75 3.75 0 0 1 15 5.25c1.192 0 2.27.411 3.125 1.092a5.457 5.457 0 0 1 .494.494c.682.855 1.092 1.933 1.092 3.125A3.75 3.75 0 0 1 18.75 15a3.75 3.75 0 0 1-1.092 2.225c-.09.117-.188.232-.29.34L15.968 15h.002a.75.75 0 0 1 .151.78l-.307.922a.75.75 0 0 1-1.025.275l-1.859-1.859a.75.75 0 0 1-.275-1.025l.922-.307.78.151h.002a.75.75 0 0 1 .75-.75h2.176l.162-.061c.49-.187.89-.523 1.189-.997.35-.558.544-1.21.544-1.897A2.25 2.25 0 0 0 15 7.5a2.25 2.25 0 0 0-1.554.646L12.257 9.38Z" clipRule="evenodd" />
    <path d="m11.142 6.024 3.42 3.422a.75.75 0 1 1-1.06 1.06l-3.422-3.42a.75.75 0 0 1 1.062-1.062Z" />
  </svg>
);
const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.91 6.194a.75.75 0 0 1 .206 1.002l-3.142 4.416a.75.75 0 0 1-.206.182l-2.435.534a.75.75 0 0 1-.362-.057.75.75 0 0 1-.157-.156.75.75 0 0 1-.157-.365l.534-2.433a.75.75 0 0 1 .18-.206L6.19 6.72a.75.75 0 0 1 1.002-.206ZM2.25 12a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-2.25v2.25H2.25Z" clipRule="evenodd" />
  </svg>
);

// Mock data
const mockPayments = [
  { studentId: "S001", name: "Alice", totalFees: 50000, paidAmount: 45000, status: "Partially Paid" },
  { studentId: "S002", name: "Bob", totalFees: 50000, paidAmount: 50000, status: "Paid" },
  { studentId: "S003", name: "Charlie", totalFees: 50000, paidAmount: 20000, status: "Partially Paid" },
  { studentId: "S004", name: "Diana", totalFees: 50000, paidAmount: 0, status: "Unpaid" },
];

const mockBatches = {
  "2024-A": {
    count: 25,
    students: ["Alice", "Bob", "Eve"]
  },
  "2023-B": {
    count: 30,
    students: ["Charlie", "Diana", "Frank"]
  }
};
const mockTeachers = 50;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [payments, setPayments] = useState(mockPayments);
  const [batches, setBatches] = useState(mockBatches);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Replace with your actual backend URL for admin data
        // const paymentsRes = await axios.get('http://localhost:5000/api/admin/payments');
        // setPayments(paymentsRes.data);

        // const batchesRes = await axios.get('http://localhost:5000/api/admin/batches');
        // setBatches(batchesRes.data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data. Please check your backend connection.");
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="text-xl font-medium">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500">
        <div className="text-xl font-medium">{error}</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        const totalStudents = Object.values(batches).reduce((sum, batch) => sum + batch.count, 0);
        const totalPaid = payments.filter(p => p.status === 'Paid').length;
        const totalUnpaid = payments.filter(p => p.status === 'Unpaid').length;
        const totalPartial = payments.filter(p => p.status === 'Partially Paid').length;

        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Students Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                <StudentIcon className="w-12 h-12 text-blue-600 mb-3" />
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">Total Students</h3>
                <p className="text-4xl font-bold text-blue-600">{totalStudents}</p>
              </div>
              {/* Total Teachers Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-600 mb-3">
                  <path d="M10.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 11.25a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5.25-4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM18 17.25a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-1.5 0v1c0 .414.336.75.75.75ZM6 17.25a.75.75 0 0 0 .75-.75v-1a.75.75 0 0 0-1.5 0v1c0 .414.336.75.75.75Z" />
                  <path fillRule="evenodd" d="M12.75 1.5a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1ZM3 11.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3ZM22.5 11.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-3ZM12 2.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1ZM9 2.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1ZM15 2.75a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1ZM20.25 10.5a.75.75 0 0 0-1.5 0v1a.75.75 0 0 0 1.5 0v-1Z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12 21a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3Zm-4.5.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3Zm9 0a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3Zm-.75-6.75a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3Zm-4.5 0a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3Zm9 0a.75.75 0 0 0-.75.75v1.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3Z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">Total Teachers</h3>
                <p className="text-4xl font-bold text-blue-600">{mockTeachers}</p>
              </div>
              {/* Payments Paid Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                <MoneyIcon className="w-12 h-12 text-green-600 mb-3" />
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">Paid Fees</h3>
                <p className="text-4xl font-bold text-green-600">{totalPaid}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Students with paid fees</p>
              </div>
              {/* Payments Unpaid Card */}
              <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                <MoneyIcon className="w-12 h-12 text-red-600 mb-3" />
                <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">Unpaid Fees</h3>
                <p className="text-4xl font-bold text-red-600">{totalUnpaid}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Students with unpaid fees</p>
              </div>
              
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Student Payment Status</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Total Fees</th>
                    <th className="p-3">Amount Paid</th>
                    <th className="p-3">Pending</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment.studentId} className="border-b dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="p-3 font-medium text-gray-900 dark:text-gray-100">{payment.name}</td>
                      <td className="p-3">₹{payment.totalFees}</td>
                      <td className="p-3">₹{payment.paidAmount}</td>
                      <td className="p-3">₹{payment.totalFees - payment.paidAmount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          payment.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'students':
        return (
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Students by Batch</h2>
            <div className="space-y-6">
              {Object.keys(batches).map(batchName => (
                <div key={batchName} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Batch {batchName}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">{batches[batchName].count} Students</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {batches[batchName].students.map(studentName => (
                      <li key={studentName}>{studentName}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 dark:bg-gray-900 p-6 flex flex-col rounded-tr-3xl rounded-br-3xl shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
        </div>
        <nav className="flex-1 space-y-4">
          <SidebarItem icon={<HomeIcon />} text="Dashboard" view="dashboard" activeView={activeView} setActiveView={setActiveView} />
          <SidebarItem icon={<MoneyIcon />} text="Payments" view="payments" activeView={activeView} setActiveView={setActiveView} />
          <SidebarItem icon={<StudentIcon />} text="Students" view="students" activeView={activeView} setActiveView={setActiveView} />
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

export default AdminDashboard;
