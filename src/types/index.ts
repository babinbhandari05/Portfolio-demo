export type ProjectCategory = 'All' | 'Frontend' | 'Fullstack' | '3D & WebGL' | 'CS & Algorithms' | 'Mobile / Apps';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
  createdAt: string;
}

export interface PhotoEffectsConfig {
  glowColor: 'cyan' | 'purple' | 'pink' | 'emerald' | 'amber';
  avatarShape: 'squircle' | 'rounded' | 'circle';
  enableScanlines: boolean;
  enableGlitchOnHover: boolean;
  enableOrbitBadges: boolean;
  orbitBadges?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  iconName?: string;
  category: 'Frontend' | 'CS Fundamentals' | 'Languages' | 'Backend & Cloud' | 'Tools & Workflows';
  description?: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  roleType: 'Education' | 'Experience' | 'Milestone' | 'Award';
  description: string;
  tags: string[];
  icon?: string;
}

export interface PersonalInfo {
  name: string;
  headline: string;
  subheadline: string;
  bio: string;
  photo: string;
  photoEffects: PhotoEffectsConfig;
  university: string;
  degree: string;
  graduationYear: string;
  email: string;
  location: string;
  availableForHire: boolean;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
    leetcode?: string;
    discord?: string;
  };
}
