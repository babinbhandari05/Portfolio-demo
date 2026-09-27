import { Project } from '../types';

/**
 * ============================================================================
 * 🚀 PROJECTS CONFIGURATION & SOURCE OF TRUTH
 * ============================================================================
 * 
 * 💡 HOW TO ADD A NEW PROJECT:
 * ----------------------------------------------------------------------------
 * Copy the template below and paste it inside the `projects` array!
 * 
 * {
 *   id: "my-new-project",
 *   title: "Project Title",
 *   tagline: "Short one-line subtitle",
 *   description: "1-2 sentences summarizing the project",
 *   longDescription: "Detailed technical architecture and challenges (optional)",
 *   category: "Frontend", // 'Frontend' | 'Fullstack' | '3D & WebGL' | 'CS & Algorithms' | 'Mobile / Apps'
 *   tags: ["React", "TypeScript", "Tailwind CSS"],
 *   image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
 *   demoUrl: "https://your-demo-link.vercel.app",
 *   githubUrl: "https://github.com/your-username/repo-name",
 *   featured: true, // true will show glowing highlight border and top priority
 *   metrics: [
 *     { label: "Render Rate", value: "60 FPS" },
 *     { label: "Lighthouse", value: "99/100" }
 *   ],
 *   highlights: [
 *     "Custom WebGL shader for real-time lighting",
 *     "End-to-end type safety"
 *   ],
 *   createdAt: "2025-01-01"
 * },
 */

export const projects: Project[] = [
  
  {
    id: "proj-1",
    title: "Algorithmic Lens - CS Visualizer",
    tagline: "Real-time Graph, Tree & Sorting Algorithm Simulator",
    description: "A comprehensive computer science algorithm visualizer explaining Graph Traversals (Dijkstra, A*, BFS/DFS), Dynamic Programming, and Sorting with step-by-step state inspections and time complexity breakdowns.",
    longDescription: "Designed for CS students and technical interview prep, Algorithmic Lens allows users to visualize complex graph shortest-paths, binary search tree rotations, and DP tables with interactive step-by-step debuggers and speed control.",
    category: "CS & Algorithms",
    tags: ["TypeScript", "React", "Data Structures", "Algorithms", "Tailwind CSS", "Canvas API"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://example.com/demo/algo-lens",
    githubUrl: "https://github.com/babinbhandari05/algo-lens-visualizer",
    featured: true,
    metrics: [
      { label: "Visualized Algorithms", value: "24+" },
      { label: "Step Debug Time", value: "Realtime" },
      { label: "CS Modules", value: "Graph, DP, Trees" }
    ],
    highlights: [
      "Interactive graph canvas with custom node placement & weighted edges",
      "Live call stack and variable state timeline tracking",
      "Big-O theoretical vs actual operation count comparison"
    ],
    createdAt: "2024-11-20"
  }
];
