import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const PaymentPortal = () => {
  const [payment, setPayment] = useState(null);
  const [payAmount, setPayAmount] = useState("");

  // Get logged-in student from localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const studentId = user?.username?.trim() || "student1"; // fallback if not in localStorage

  // Fetch payment data
  const fetchPayment = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/payments/${studentId}`);
      setPayment(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch payment data. Make sure the backend is running.");
    }
  };

  useEffect(() => {
    if (studentId) fetchPayment();
  }, [studentId]);

  // Handle payment
  const handlePay = async () => {
    if (!payAmount || parseInt(payAmount) <= 0) {
      return alert("Enter a valid amount to pay");
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/payments/${studentId}/pay`,
        { amount: parseInt(payAmount) }
      );
      setPayment(res.data.payment);
      setPayAmount("");
    } catch (err) {
      console.error(err);
      alert("Payment failed. Check console for details.");
    }
  };

  // Download receipt
  const downloadReceipt = (txn) => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text(`Receipt ID: ${txn.id}`, 10, 10);
  doc.text(`Student ID: ${studentId}`, 10, 20);
  doc.text(`Amount Paid: ₹${txn.amount}`, 10, 30);
  doc.text(`Date: ${txn.date}`, 10, 40);
  doc.text(`Status: ${txn.status}`, 10, 50);
  doc.save(`Receipt_${txn.id}.pdf`);
};

  if (!payment) return <div className="p-5">Loading payment data...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Payment Portal</h2>

      <div className="mb-4">
        <p>Total Fees: ₹{payment.totalFees}</p>
        <p>Amount Paid: ₹{payment.paidAmount}</p>
        <p>Pending Fees: ₹{payment.totalFees - payment.paidAmount}</p>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="number"
          value={payAmount}
          onChange={(e) => setPayAmount(e.target.value)}
          placeholder="Enter amount to pay"
          className="border p-2 rounded"
        />
        <button
          onClick={handlePay}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Pay Now
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Payment History</h3>
      {payment.transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              <th className="border px-2 py-1">Transaction ID</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payment.transactions.map((txn) => (
              <tr key={txn.id}>
                <td className="border px-2 py-1">{txn.id}</td>
                <td className="border px-2 py-1">₹{txn.amount}</td>
                <td className="border px-2 py-1">{txn.date}</td>
                <td className="border px-2 py-1">{txn.status}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => downloadReceipt(txn)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentPortal;
