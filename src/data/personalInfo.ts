import { PersonalInfo } from '../types';

/**
 * ============================================================================
 * 👤 PERSONAL PROFILE & HERO PHOTO CONFIGURATION
 * ============================================================================
 * 
 * 📸 HOW TO CHANGE YOUR HERO PHOTO:
 * ----------------------------------------------------------------------------
 * Option A (Local File): Drop your image inside the `public/` folder 
 *           (e.g., `public/profile.jpg`) and set:
 *           photo: "/profile.jpg"
 * 
 * Option B (Web URL): Paste any direct image URL, for example:
 *           photo: "https://your-domain.com/photo.jpg"
 * 
 * ✨ 3D PHOTO EFFECTS:
 * ----------------------------------------------------------------------------
 * - glowColor: "cyan" | "purple" | "pink" | "emerald" | "amber"
 * - avatarShape: "squircle" | "rounded" | "circle"
 * - enableScanlines: true | false (hologram cyber scanlines)
 * - enableGlitchOnHover: true | false (dynamic chromatic aberration)
 * - enableOrbitBadges: true | false (3D orbiting tech badges around your picture)
 */

export const personalInfo: PersonalInfo = {
  // ─── HERO PHOTO & 3D EFFECTS ───────────────────────────────────────────────
  photo: "/profile.png",
  photoEffects: {
    glowColor: 'cyan',            // 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber'
    avatarShape: 'squircle',      // 'squircle' | 'rounded' | 'circle'
    enableScanlines: true,        // Holographic cyber scanline overlay
    enableGlitchOnHover: true,    // Glitch / chromatic aberration on mouse hover
    enableOrbitBadges: true,      // 3D orbiting tech pills around your photo
    orbitBadges: ['React', 'TypeScript', 'Three.js', 'CS / DSA', 'Python', 'WebGL'],
  },

  // ─── BASIC INFO ────────────────────────────────────────────────────────────
  name: "Babit Bhandari",
  headline: "Frontend Engineer & CS Student",
  subheadline: "Crafting immersive 3D web experiences, performant frontend architectures, and elegant user interfaces backed by solid Computer Science fundamentals.",
  bio: "Passionate Computer Science student and Frontend Developer dedicated to pushing web boundaries with interactive 3D WebGL, modern React ecosystems, and performant algorithms. Constantly experimenting with creative coding, system design, and cutting-edge user experiences.",
  
  // ─── EDUCATION & LOCATION ──────────────────────────────────────────────────
  university: "Mahendra Moranga Adarsha Multiple Campus",
  degree: "B.S. in Computer Science and Infotmation Technology",
  graduationYear: "2026",
  location: "Biratnagar, Morang",
  availableForHire: true,

  // ─── CONTACT & SOCIAL PROFILES ─────────────────────────────────────────────
  email: "babitbhandari05@gmail.com",
  socials: {
    github: "https://github.com/babinbhandari05",
    linkedin: "https://linkedin.com",
    leetcode: "https://leetcode.com",
    twitter: "https://x.com",
    discord: "https://discord.com"
  }
};
