import React, { useState } from 'react';
import { Code2, Cpu, Terminal, Database, Wrench, CheckCircle2 } from 'lucide-react';
import { skillsData } from '../../data/skills';
import { ThreeSkillSphere } from './ThreeSkillSphere';
import { sounds } from '../common/SoundEffects';

const CATEGORIES = [
  { id: 'Frontend', label: 'Frontend & 3D', icon: Code2, color: 'text-cyan-400' },
  { id: 'CS Fundamentals', label: 'CS Fundamentals', icon: Cpu, color: 'text-purple-400' },
  { id: 'Languages', label: 'Languages', icon: Terminal, color: 'text-emerald-400' },
  { id: 'Backend & Cloud', label: 'Backend & DB', icon: Database, color: 'text-blue-400' },
  { id: 'Tools & Workflows', label: 'Tools & DevOps', icon: Wrench, color: 'text-amber-400' },
] as const;

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');

  const filteredSkills = skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 border-t border-slate-900 bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frontend Mastery & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CS Fundamentals</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Equipped with both deep theoretical computer science principles (data structures, system design, algorithms) and modern web engineering tools.
          </p>
        </div>

        {/* 2-Column Layout: Left Category Tabs & Skill Bars, Right 3D Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Category Tabs & Skills List */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      sounds.playClick();
                    }}
                    onMouseEnter={() => sounds.playHover()}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyber-surface border border-cyan-400/50 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-cyber-card/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${cat.color}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Skills Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  onMouseEnter={() => sounds.playHover()}
                  className="p-4 rounded-xl bg-cyber-card/80 border border-slate-800/80 hover:border-cyan-400/40 transition-all duration-300 space-y-2.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-700"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {skill.description && (
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* CS Theoretical Highlights Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-cyan-950/20 to-transparent border border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    CS Algorithms & Complexity
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Big-O optimization, asymptotic time/space efficiency, memory management
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-purple-300 font-semibold px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30">
                O(1) / O(log n)
              </span>
            </div>

          </div>

          {/* Right Column: 3D Interactive Skill Sphere */}
          <div className="lg:col-span-5 space-y-4">
            <ThreeSkillSphere />

            <div className="p-4 rounded-2xl bg-cyber-card/70 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Core Competencies
              </h4>
              <ul className="text-xs text-slate-300 space-y-1.5">
                <li>• Component design systems & accessible ARIA standards</li>
                <li>• GPU-accelerated 3D shaders & procedural geometries</li>
                <li>• Graph algorithms, dynamic programming & tree data structures</li>
                <li>• Network protocols, WebSockets & client-side caching</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
