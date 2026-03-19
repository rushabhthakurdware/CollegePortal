const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Prevents duplicate teacher accounts
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    default: "teacher" 
  },
  
  // Faculty-specific fields
  department: { 
    type: String 
  },
  subjectsTaught: [{ 
    type: String 
  }],
  designation: { 
    type: String // e.g., Assistant Professor, HOD
  },
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Teacher", TeacherSchema);