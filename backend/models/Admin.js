const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true,
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // 🛡️ Critical for security
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: "admin" 
  },
  // Optional: Add a level to differentiate SuperAdmins from regular Admins
  permissions: {
    type: [String],
    default: ["all"]
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Admin", AdminSchema);