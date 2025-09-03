import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

const initialCourses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. John Smith",
    duration: "10 weeks",
    status: "Ongoing",
    enrolled: false,
    description: "Learn the basics of computer science, programming, and problem-solving.",
    syllabus: [
      "Week 1: Introduction & History of Computing",
      "Week 2: Basics of Programming",
      "Week 3: Data Structures",
      "Week 4: Algorithms",
      "Week 5: Software Development",
      "Week 6: Databases",
      "Week 7: Networking",
      "Week 8: Operating Systems",
      "Week 9: Cybersecurity Basics",
      "Week 10: Project & Review"
    ],
    resources: [
      { name: "Course Slides", link: "https://example.com/slides" },
      { name: "Reference Book", link: "https://example.com/book" }
    ]
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    code: "CS201",
    instructor: "Prof. Jane Doe",
    duration: "12 weeks",
    status: "Completed",
    enrolled: false,
    description: "In-depth study of data structures and algorithms to write efficient code.",
    syllabus: [
      "Week 1: Arrays & Strings",
      "Week 2: Linked Lists",
      "Week 3: Stacks & Queues",
      "Week 4: Trees",
      "Week 5: Graphs",
      "Week 6: Sorting & Searching",
      "Week 7: Dynamic Programming",
      "Week 8: Greedy Algorithms",
      "Week 9: Hashing",
      "Week 10: Complexity Analysis",
      "Week 11: Advanced Topics",
      "Week 12: Project & Interview Prep"
    ],
    resources: [
      { name: "DSA Notes", link: "https://example.com/dsa-notes" },
      { name: "LeetCode", link: "https://leetcode.com/" }
    ]
  },
  {
    id: 3,
    title: "Operating Systems",
    code: "CS303",
    instructor: "Prof. Mehta",
    duration: "8 Weeks",
    status: "Ongoing",
    status: "Ongoing",
    description: "Comprehensive study of operating system concepts including process management, memory management, and file systems.",
  syllabus: [
    "Week 1: Introduction & System Structures",
    "Week 2: Processes & Threads",
    "Week 3: CPU Scheduling",
    "Week 4: Process Synchronization",
    "Week 5: Deadlocks",
    "Week 6: Memory Management",
    "Week 7: Virtual Memory",
    "Week 8: File Systems",
    "Week 9: I/O Systems",
    "Week 10: Security & Protection",
    "Week 11: Case Studies (Linux, Windows)",
    "Week 12: Project & Review"
  ],
  resources: [
    { name: "OS Notes", link: "https://example.com/os-notes" },
    { name: "Operating System Concepts (Silberschatz)", link: "https://os-book.com/" }
  ]
  
  },
  {
    id: 4,
    title: "Computer Networks",
    code: "CS304",
    instructor: "Prof. Lalit",
    duration: "12 Weeks",
    status: "Ongoing",
    description: "Study of computer network architectures, protocols, and applications with emphasis on the Internet model.",
  syllabus: [
    "Week 1: Introduction to Networks & Internet",
    "Week 2: Application Layer",
    "Week 3: Transport Layer",
    "Week 4: Network Layer – Routing",
    "Week 5: Network Layer – Congestion & QoS",
    "Week 6: Data Link Layer & Error Control",
    "Week 7: LAN Technologies (Ethernet, Wi-Fi)",
    "Week 8: Switching & Virtual LANs",
    "Week 9: Network Security",
    "Week 10: Wireless & Mobile Networks",
    "Week 11: Cloud & Data Center Networking",
    "Week 12: Case Studies & Project"
  ],
  resources: [
    { name: "CN Notes", link: "https://example.com/cn-notes" },
    { name: "Computer Networking: A Top-Down Approach", link: "https://gaia.cs.umass.edu/kurose_ross/" }
  ]
     

  },
  {
    id: 5,
    title: "Design Analysis",
    code: "CS305",
    instructor: "Prof. Pratibha",
    duration: "8 Weeks",
    status: "Ongoing",
    description: "Focus on algorithm design techniques, performance analysis, and problem-solving strategies.",
  syllabus: [
    "Week 1: Algorithm Analysis & Complexity",
    "Week 2: Divide and Conquer",
    "Week 3: Greedy Algorithms",
    "Week 4: Dynamic Programming",
    "Week 5: Graph Algorithms – BFS & DFS",
    "Week 6: Minimum Spanning Trees",
    "Week 7: Shortest Path Algorithms",
    "Week 8: Flow Networks",
    "Week 9: NP-Completeness",
    "Week 10: Approximation Algorithms",
    "Week 11: Randomized Algorithms",
    "Week 12: Project & Advanced Topics"
  ],
  resources: [
    { name: "DAA Notes", link: "https://example.com/daa-notes" },
    { name: "Introduction to Algorithms (CLRS)", link: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" }
  ]
    
  },
  {
    id: 6,
    title: "Theory of Computation",
    code: "CS306",
    instructor: "Prof. Monalika",
    duration: "8 Weeks",
    status: "Ongoing",
    description: "Study of automata theory, formal languages, computability, and complexity classes.",
  syllabus: [
    "Week 1: Mathematical Foundations & Logic",
    "Week 2: Regular Languages & Finite Automata",
    "Week 3: Non-determinism & NFAs",
    "Week 4: Regular Expressions & Properties",
    "Week 5: Context-Free Grammars",
    "Week 6: Pushdown Automata",
    "Week 7: Pumping Lemmas",
    "Week 8: Turing Machines",
    "Week 9: Decidability",
    "Week 10: Reducibility",
    "Week 11: Complexity Classes (P, NP, NP-Complete)",
    "Week 12: Project & Review"
  ],
  resources: [
    { name: "TOC Notes", link: "https://example.com/toc-notes" },
    { name: "Automata Theory (Hopcroft & Ullman)", link: "https://www.pearson.com/en-us/subject-catalog/p/automata-theory-languages-and-computation/P200000005631/9781292039053" }
  ]
  },
  {
    id: 7,
    title: "Computer Architecture",
    code: "CS307",
    instructor: "Prof. Shekhar",
    duration: "8 Weeks",
    status: "Ongoing",
    description: "Study of automata theory, formal languages, computability, and complexity classes.",
  syllabus: [
    "Week 1: Mathematical Foundations & Logic",
    "Week 2: Regular Languages & Finite Automata",
    "Week 3: Non-determinism & NFAs",
    "Week 4: Regular Expressions & Properties",
    "Week 5: Context-Free Grammars",
    "Week 6: Pushdown Automata",
    "Week 7: Pumping Lemmas",
    "Week 8: Turing Machines",
    "Week 9: Decidability",
    "Week 10: Reducibility",
    "Week 11: Complexity Classes (P, NP, NP-Complete)",
    "Week 12: Project & Review"
  ],
  resources: [
    { name: "TOC Notes", link: "https://example.com/toc-notes" },
    { name: "Automata Theory (Hopcroft & Ullman)", link: "https://www.pearson.com/en-us/subject-catalog/p/automata-theory-languages-and-computation/P200000005631/9781292039053" }
  ]
  },
  {
    id: 8,
    title: "Motion Graphics",
    code: "CS308",
    instructor: "Prof. Sanjana",
    duration: "12 Weeks",
    status: "Ongoing",
     description: "Creative course on designing engaging motion graphics using animation, typography, and visual effects.",
  syllabus: [
    "Week 1: Introduction to Motion Graphics",
    "Week 2: Design Principles & Storyboarding",
    "Week 3: Typography in Motion",
    "Week 4: Working with Adobe After Effects",
    "Week 5: Keyframes & Animation Basics",
    "Week 6: Transitions & Effects",
    "Week 7: 2D & 3D Motion Graphics",
    "Week 8: Visual Effects & Compositing",
    "Week 9: Sound Design Integration",
    "Week 10: Final Project Showcase"
  ],
  resources: [
    { name: "MG Notes", link: "https://example.com/mg-notes" },
    { name: "Motion Design School", link: "https://motiondesign.school/" }
  ]
  },
];

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(
    initialCourses.map((c) => ({ ...c, enrolled: false }))
  );

  const enrollCourse = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enrolled: true } : c))
    );
  };

  const unenrollCourse = (id) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enrolled: false } : c))
    );
  };

  return (
    <CourseContext.Provider value={{ courses, enrollCourse, unenrollCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
