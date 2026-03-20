import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle, 
  Smartphone, 
  X, 
  ShieldCheck, 
  CreditCard, 
  Download 
} from "lucide-react";

const PaymentPortal = () => {
  const [showQR, setShowQR] = useState(false);
  const [payment, setPayment] = useState(null);
  const [payAmount, setPayAmount] = useState("");

  // Get logged-in student from localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const studentId = user?.username?.trim() || "student1"; // fallback if not in localStorage

  const upiId = "9172118978@axl"; // Replace with your real UPI ID for testing
  const upiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}%26pn=YCCE%20College%26am=${payAmount}%26cu=INR`;

  const confirmPayment = async () => {
    try {
      const res = await axios.post(`https://college-portal-backend-xi64.onrender.com/api/payments/${studentId}/pay`, {
        amount: Number(payAmount)
      });
      setPayment(res.data.payment);
      setPayAmount("");
      setShowQR(false);
      alert("Payment Confirmed! Admin will verify the transaction.");
    } catch (err) {
      alert("Verification failed.");
    }
  };

  const navigate = useNavigate();
  // Fetch payment data
  const fetchPayment = async () => {
    try {
      const res = await axios.get(
        `https://college-portal-backend-xi64.onrender.com/api/payments/${studentId}`
      );
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
        `https://college-portal-backend-xi64.onrender.com/api/payments/${studentId}/pay`,
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
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/student")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Fee Payment Portal</h2>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-blue-500">
            <p className="text-gray-500 text-sm font-semibold uppercase">Total Course Fees</p>
            <h3 className="text-2xl font-bold text-gray-800">₹{payment.totalFees}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-green-500">
            <p className="text-gray-500 text-sm font-semibold uppercase">Total Paid</p>
            <h3 className="text-2xl font-bold text-green-600">₹{payment.paidAmount}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-red-500">
            <p className="text-gray-500 text-sm font-semibold uppercase">Remaining Balance</p>
            <h3 className="text-2xl font-bold text-red-600">₹{payment.totalFees - payment.paidAmount}</h3>
          </div>
        </div>

       <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md mx-auto text-center border border-gray-100">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Settle Fees</h3>
        <input 
          type="number" 
          value={payAmount} 
          onChange={(e) => setPayAmount(e.target.value)}
          placeholder="Enter Amount"
          className="w-full p-4 border-2 rounded-2xl mb-4 text-center text-2xl font-black focus:border-blue-500 outline-none"
        />
        <button 
          onClick={() => setShowQR(true)} 
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Smartphone size={20}/> Generate QR Code
        </button>
      </div>

      {/* QR Code Modal Overlay */}
      {showQR && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl max-w-sm w-full text-center relative">
            <button onClick={() => setShowQR(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><X/></button>
            
            <h2 className="text-2xl font-black mb-2">Scan & Pay</h2>
            <p className="text-gray-500 text-sm mb-6 font-medium text-balance">Scan this QR using GPay, PhonePe, or any UPI app</p>
            
            <div className="bg-gray-50 p-6 rounded-3xl inline-block border-2 border-dashed border-gray-200 mb-6">
               <img src={upiUrl} alt="UPI QR" className="w-48 h-48 mx-auto mix-blend-multiply" />
            </div>

            <div className="bg-blue-50 p-4 rounded-2xl mb-6">
               <p className="text-blue-700 font-bold text-xl">₹{payAmount}</p>
               <p className="text-blue-500 text-[10px] uppercase font-bold tracking-widest">Payable to: YCCE Portal</p>
            </div>

            <button 
              onClick={confirmPayment} 
              className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2"
            >
              <CheckCircle size={20}/> I have paid
            </button>
            <p className="mt-4 text-[10px] text-gray-400 font-medium italic">Clicking this will generate your digital receipt</p>
          </div>
        </div>
      )}
        {/* Transaction History Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h3 className="text-lg font-bold">Transaction History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-widest border-b">
                  <th className="p-5">Transaction ID</th>
                  <th className="p-5">Amount</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payment.transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-mono text-sm text-blue-600">{txn.id}</td>
                    <td className="p-5 font-bold text-gray-800">₹{txn.amount}</td>
                    <td className="p-5 text-gray-500 text-sm">{txn.date}</td>
                    <td className="p-5">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {txn.status}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => downloadReceipt(txn)}
                        className="text-blue-600 hover:underline font-semibold text-sm"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
