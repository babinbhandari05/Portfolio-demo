import { SkillItem } from '../types';

export const skillsData: SkillItem[] = [
  // Frontend & 3D
  { name: "React / Next.js", level: 95, category: "Frontend", description: "Hooks, Server Components, State Architecture, Performance Profiling" },
  { name: "TypeScript", level: 92, category: "Frontend", description: "Strict typing, Generics, Utility Types, AST, Type-safe APIs" },
  { name: "Three.js / WebGL", level: 85, category: "Frontend", description: "Custom Shaders, 3D Geometries, Particle Systems, Post-processing, Math" },
  { name: "Tailwind CSS", level: 98, category: "Frontend", description: "Design systems, Responsive Layouts, Glassmorphism, Modern CSS" },
  { name: "HTML5 / CSS3 / Animations", level: 95, category: "Frontend", description: "Semantic UI, CSS Grid/Flexbox, Keyframes, View Transitions" },
  { name: "State Management", level: 90, category: "Frontend", description: "Zustand, Redux Toolkit, React Context, TanStack Query" },

  // CS Fundamentals
  { name: "Data Structures & Algorithms", level: 90, category: "CS Fundamentals", description: "Trees, Graphs, Dynamic Programming, Heaps, Hash Tables, Big-O Analysis" },
  { name: "System Design & Architecture", level: 82, category: "CS Fundamentals", description: "Client-server architecture, Caching, Load Balancing, Micro-frontends" },
  { name: "Object-Oriented Design (OOP)", level: 88, category: "CS Fundamentals", description: "Design Patterns, SOLID Principles, Polymorphism, Abstraction" },
  { name: "Computer Networks & Protocols", level: 84, category: "CS Fundamentals", description: "HTTP/HTTPS, WebSockets, TCP/IP, REST, GraphQL, CORS" },
  { name: "Operating Systems Basics", level: 80, category: "CS Fundamentals", description: "Processes, Threads, Concurrency, Memory Management, File Systems" },
  { name: "Database Management (DBMS)", level: 85, category: "CS Fundamentals", description: "PostgreSQL, MongoDB, Relational Normalization, Indexing, ACID" },

  // Languages
  //{ name: "JavaScript (ES6+)", level: 96, category: "Languages", description: "Event Loop, Closures, Async/Await, Prototypes, Web APIs" },
  { name: "C / C++", level: 84, category: "Languages", description: "Memory pointers, STL, Algorithms, Performance-critical logic" },
  { name: "Python", level: 86, category: "Languages", description: "Scripting, Automation, AI/ML basics, Data Analysis" },
  { name: "SQL", level: 85, category: "Languages", description: "Complex Queries, Joins, Aggregations, Performance Tuning" },

  // Backend & Cloud
  { name: "Node.js & Express", level: 88, category: "Backend & Cloud", description: "REST APIs, Middleware, JWT Authentication, Microservices" },
  { name: "REST & GraphQL APIs", level: 90, category: "Backend & Cloud", description: "API Contract Design, Pagination, Error Handling" },
  { name: "Supabase / Firebase", level: 88, category: "Backend & Cloud", description: "Realtime Databases, Auth, Storage, Edge Functions" },
  { name: "PostgreSQL / SQLite", level: 84, category: "Backend & Cloud", description: "Schema Design, Prisma ORM, Query Optimization" },

  // Tools & Workflows
  { name: "Git & GitHub CI/CD", level: 92, category: "Tools & Workflows", description: "Branching strategies, Actions, Pull Requests, Code Reviews" },
  { name: "Vite / Webpack / Bundlers", level: 90, category: "Tools & Workflows", description: "Code Splitting, Tree Shaking, Build Optimization" },
  { name: "Docker Basics", level: 78, category: "Tools & Workflows", description: "Containerization, Docker Compose, Dev Environments" },
  { name: "Figma to Code", level: 90, category: "Tools & Workflows", description: "Pixel-perfect implementation, Design tokens, Prototyping" },
  { name: "Linux / Terminal", level: 88, category: "Tools & Workflows", description: "Bash scripting, Zsh, System navigation, SSH" }
];
