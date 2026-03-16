const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  studentUsername: { type: String, required: true, unique: true },
  totalFees: { type: Number, default: 50000 },
  paidAmount: { type: Number, default: 0 },
  transactions: [
    {
      id: String,
amount: { type: Number, required: true }, // Ensure this is Number      date: { type: Date, default: Date.now },
      status: { type: String, default: "Success" }
    }
  ]
});

module.exports = mongoose.model("Payment", PaymentSchema);