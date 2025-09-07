const express = require("express");
const router = express.Router();

// Dummy payment data
let payments = {
  student1: {
    totalFees: 50000,
    paidAmount: 20000,
    transactions: [
      { id: 1, amount: 10000, date: "2025-09-07", status: "Paid" },
      { id: 2, amount: 10000, date: "2025-09-08", status: "Paid" },
    ],
  },
};

// GET payment info
router.get("/:studentId", (req, res) => {
  const studentId = req.params.studentId.trim(); // <-- trim here too
  const payment = payments[studentId];
  if (!payment) return res.status(404).json({ msg: "No payment data found" });
  res.json(payment);
});

// POST pay
router.post("/:studentId/pay", (req, res) => {
  const { studentId } = req.params;
  const { amount } = req.body;

  if (!payments[studentId]) payments[studentId] = { totalFees: 50000, paidAmount: 0, transactions: [] };

  payments[studentId].paidAmount += amount;
  const txn = {
    id: payments[studentId].transactions.length + 1,
    amount,
    date: new Date().toISOString().split("T")[0],
    status: "Paid",
  };
  payments[studentId].transactions.push(txn);

  res.json({ payment: payments[studentId], txn });
});

module.exports = router;
