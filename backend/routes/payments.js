const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// ✅ Get or Create payment record for a student
router.get("/:username", async (req, res) => {
  try {
    let payment = await Payment.findOne({ studentUsername: req.params.username });
    if (!payment) {
      // Initialize a new student with default values
      payment = new Payment({ 
        studentUsername: req.params.username,
        totalFees: 50000, 
        paidAmount: 0,
        transactions: [] 
      });
      await payment.save();
    }
    res.json(payment);
  } catch (err) { 
    res.status(500).json({ error: "Could not fetch student record" }); 
  }
});

// ✅ Process a payment
router.post("/:username/pay", async (req, res) => {
  const { amount } = req.body;
  try {
    const payment = await Payment.findOne({ studentUsername: req.params.username });
    
    if (!payment) return res.status(404).json({ error: "Student not found" });

    const newTxn = {
      id: "TXN-" + Math.random().toString(36).toUpperCase().substring(2, 10),
      amount: Number(amount), // Force amount to be a number
      date: new Date(),       // ✅ FIX: Save as a real Date object, not a string
      status: "Pending Verification"
    };

    payment.transactions.push(newTxn);
    // ✅ Use Number() to prevent string concatenation (e.g., 0 + "500" = "0500")
    payment.paidAmount = (Number(payment.paidAmount) || 0) + Number(amount);
    
    await payment.save();
    res.json({ payment });
  } catch (err) { 
    console.error(err);
    res.status(500).json({ error: "Transaction failed" }); 
  }
});

// ✅ Admin Route: Get ALL transactions across ALL students
router.get("/admin/all-transactions", async (req, res) => {
  try {
    const allStudents = await Payment.find();
    let ledger = [];

    allStudents.forEach(record => {
      if (record.transactions) {
        record.transactions.forEach(txn => {
          ledger.push({
            student: record.studentUsername,
            id: txn.id,
            amount: Number(txn.amount) || 0, 
            date: txn.date,
            status: txn.status
          });
        });
      }
    });

    // ✅ Sort by newest first before sending
    ledger.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(ledger);
  } catch (err) {
    res.status(500).json({ error: "Data fetch failed" });
  }
});

module.exports = router;