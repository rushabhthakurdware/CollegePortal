// // backend/server.js
// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Dummy user data (later we connect DB)
// const users = [
//   { id: 1, username: "student1", password: "123", role: "student",email: "student1@gmail.com" },
//   { id: 2, username: "teacher1", password: "123", role: "teacher",email: "teacher1@gmail.com" },
//   { id: 3, username: "admin1", password: "123", role: "admin",email: "admin1@gmail.com" },
// ];

// // Login Route
// app.post("/auth/login", (req, res) => {
//   const { username, password, role } = req.body;
//   const user = users.find(u => u.username === username && u.password === password && u.role === role);
  
//   if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//   // For now no JWT, just success response
//   res.json({ msg: "Login successful", role: user.role });
// });

// // Forgot Password Route
// app.post("/auth/forgot-password", (req, res) => {
//   const { email } = req.body;

//   const user = users.find(u => u.email === email);

//   if (!user) return res.status(404).json({ message: "Email not found!" });

//   // Simulate sending email
//   res.json({ message: `Reset link sent to ${email}` });
// });


// app.listen(5000, () => console.log("Backend running on http://localhost:5000"));



const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Dummy users
const users = [
  { id: 1, username: "student1", password: "123", role: "student", email: "student1@gmail.com" },
  { id: 2, username: "teacher1", password: "123", role: "teacher", email: "teacher1@gmail.com" },
  { id: 3, username: "admin1", password: "123", role: "admin", email: "admin1@gmail.com" },
];

// Login route
app.post("/auth/login", (req, res) => {
  const { username, password, role } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === role);
  
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  res.json({ msg: "Login successful", role: user.role });
});

// Forgot password route
app.post("/auth/forgot-password", (req, res) => {
  const { email } = req.body;

  console.log("Received email:", email); // <-- debug line

  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ message: "Email not found!" });

  res.json({ message: `Reset link sent to ${email}` });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
