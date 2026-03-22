const collegeData = {
  collegeName: "Yeshwantrao Chavan College of Engineering (YCCE), Nagpur",
  status: "Autonomous Institute Affiliated to Rashtrasant Tukadoji Maharaj Nagpur University",
  
  library: {
    name: "YCCE Central Library",
    timings: "9:00 AM to 8:00 PM (Reading Room open until 10:00 PM during exams)",
    location: "Administrative Block, Ground Floor",
    rules: [
      "ID card is mandatory for entry and issuing books.",
      "A maximum of 3 books can be issued for 15 days.",
      "Late fine: ₹5 per day per book.",
      "Reference books and journals cannot be taken home."
    ],
    digitalResources: "Access to IEEE, Springer, and ScienceDirect is available on college IP."
  },

  fees: {
    note: "Fees mentioned are approximate annual tuition fees for the current academic year.",
    open: { regular: "1,55,000", tfws: "28,000" },
    obc: { regular: "85,000", tfws: "28,000" },
    sc_st: { regular: "5,000", tfws: "5,000" },
    vj_nt_sbc: { regular: "15,000", tfws: "15,000" }
  },

  academicRules: {
    attendance: "Minimum 75% attendance is mandatory in each subject to appear for MSE and ESE.",
    exams: "Evaluation consists of MSE (Mid Semester Exam) and ESE (End Semester Exam).",
    passing: "A student must score a minimum of 40% in ESE and overall 40% to pass a course.",
    autonomy: "As an autonomous college, YCCE designs its own syllabus and conducts its own exams."
  },

  departments: [
    "Computer Technology (CT)",
    "Information Technology (IT)",
    "Computer Science and Engineering (CSE)",
    "Electronics Engineering (EE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)"
  ],

  placement: {
    topRecruiters: ["TCS", "Infosys", "Cognizant", "Wipro", "Accenture", "Capgemini"],
    highestPackage: "Estimated ₹20-25 LPA",
    averagePackage: "Estimated ₹5-6 LPA"
  }
};

module.exports = collegeData;