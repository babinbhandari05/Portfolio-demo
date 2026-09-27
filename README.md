# ⚡ 3D Developer & Computer Science Student Portfolio

A high-performance **3D Developer Portfolio** engineered with **React 18**, **Three.js**, **Tailwind CSS**, and **TypeScript**.

All content, including your **hero photo**, **3D effects**, **projects**, **skills**, and **personal details**, is configured directly in clean, typed code files located inside `src/data/`.

---

## 🛠️ How to Edit From Code

### 1. 📸 Change Your Photo & 3D Effects
Open [`src/data/personalInfo.ts`](file:///Users/babitbhandari/Documents/antigraviy%20projects%20demo/src/data/personalInfo.ts):

```typescript
export const personalInfo = {
  // Option A: Drop an image in public/ (e.g. public/profile.jpg) and set:
  photo: "/profile.jpg",
  
  // Option B: Or use any web image URL:
  // photo: "https://your-domain.com/my-photo.jpg",

  photoEffects: {
    glowColor: 'cyan',          // 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber'
    avatarShape: 'squircle',    // 'squircle' | 'rounded' | 'circle'
    enableScanlines: true,      // Holographic scanlines overlay
    enableGlitchOnHover: true,  // Chromatic glitch on mouse hover
    enableOrbitBadges: true,    // 3D orbiting tech pills around your picture
    orbitBadges: ['React', 'TypeScript', 'Three.js', 'CS / DSA', 'Python', 'WebGL'],
  },

  name: "Babit Bhandari",
  headline: "Frontend Engineer & CS Student",
  email: "babitbhandari05@gmail.com",
  // ...
};
```

---

### 2. 🚀 Add or Edit Projects
Open [`src/data/projects.ts`](file:///Users/babitbhandari/Documents/antigraviy%20projects%20demo/src/data/projects.ts):

To add a new project, copy this template and paste it inside the `projects` array:

```typescript
{
  id: "my-awesome-project",
  title: "Neural Vision 3D",
  tagline: "Real-time WebGL shader rendering engine",
  description: "Short summary displayed on the project card.",
  longDescription: "Detailed architecture, challenges solved, and technical depth.",
  category: "3D & WebGL", // 'Frontend' | 'Fullstack' | '3D & WebGL' | 'CS & Algorithms' | 'Mobile / Apps'
  tags: ["React", "Three.js", "GLSL", "TypeScript"],
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  demoUrl: "https://my-demo.vercel.app",
  githubUrl: "https://github.com/babinbhandari05/neural-vision",
  featured: true, // Highlights with glowing border and top priority
  metrics: [
    { label: "Render Rate", value: "60 FPS" },
    { label: "GPU Nodes", value: "20,000+" }
  ],
  highlights: [
    "GPU-accelerated GLSL fragment shaders",
    "Responsive touch controls"
  ],
  createdAt: "2025-01-01"
}
```

---

### 3. 🧠 Edit Skills & CS Fundamentals
Open [`src/data/skills.ts`](file:///Users/babitbhandari/Documents/antigraviy%20projects%20demo/src/data/skills.ts):
- Add/remove skills, change proficiency percentages (0-100), and update descriptions.

---

### 4. 📅 Edit Journey & Timeline
Open [`src/data/timeline.ts`](file:///Users/babitbhandari/Documents/antigraviy%20projects%20demo/src/data/timeline.ts):
- Add education, milestone awards, and internships.

---

## 🏃 Running the Application

```bash
# Start development server with Instant Hot Reload
npm run dev

# Build for production
npm run build
```
