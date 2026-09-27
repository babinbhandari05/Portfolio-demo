import React, { useState, useRef } from 'react';
import { ExternalLink, Sparkles, ArrowUpRight, Layers } from 'lucide-react';
import { Project } from '../../types';
import { sounds } from '../common/SoundEffects';
import { GithubIcon } from '../common/Icons';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage for spotlight
    setMousePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });

    // 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? -6 : 0}px)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className={`relative h-full flex flex-col rounded-2xl overflow-hidden bg-cyber-card/90 backdrop-blur-xl border transition-all duration-300 group ${
          project.featured
            ? 'border-cyan-500/40 shadow-[0_0_30px_-5px_rgba(0,240,255,0.15)] hover:border-cyan-400'
            : 'border-slate-800/80 hover:border-slate-700 hover:shadow-xl'
        }`}
      >
        {/* Dynamic Cursor Spotlight Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 240, 255, 0.12), transparent 70%)`,
          }}
        />

        {/* Thumbnail Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-black/30 pointer-events-none" />

          {/* Category Pill */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-black/70 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {/* Featured Ribbon */}
          {project.featured && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Featured</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex flex-col flex-1 z-20">
          <div className="flex-1 space-y-2">
            <h3
              onClick={() => {
                sounds.playClick();
                onSelect(project);
              }}
              className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400 shrink-0 ml-2" />
            </h3>

            <p className="text-xs text-slate-400 font-mono line-clamp-1">
              {project.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyber-surface border border-slate-800 text-slate-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-slate-500">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Card Footer Actions */}
          <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onSelect(project);
              }}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Details & Specs</span>
            </button>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                  aria-label="GitHub Repository"
                  title="Source Code"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="p-2 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 hover:text-cyan-200 border border-cyan-400/30 transition-colors"
                  aria-label="Live Demo"
                  title="Live Demo"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
