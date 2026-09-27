import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle, BarChart3, Layers } from 'lucide-react';
import { Project } from '../../types';
import { sounds } from '../common/SoundEffects';
import { GithubIcon } from '../common/Icons';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-cyber-card border border-cyber-border rounded-2xl shadow-2xl overflow-hidden text-slate-200 max-h-[90vh] flex flex-col">
        {/* Header Image with Gradient */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-black/40 to-transparent" />
          
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                {project.title}
              </h2>
            </div>

            {/* Quick Action Links */}
            <div className="flex gap-2">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-400/20 hover:bg-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 text-white border border-slate-700 hover:border-slate-500 font-bold text-xs flex items-center gap-1.5 backdrop-blur-md transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Tagline */}
          <p className="text-base text-cyan-300 font-mono">
            {project.tagline}
          </p>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" /> Overview & Architecture
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Key Metrics / Benchmarks */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-purple-400" /> Key Metrics & Performance
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-cyber-surface/80 border border-slate-800 backdrop-blur-md"
                  >
                    <div className="text-lg sm:text-xl font-bold text-white font-mono text-cyan-400">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights / Technical Feats */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Technical Highlights
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-cyber-surface/60 flex items-center justify-between text-xs text-slate-400">
          <span>Project ID: <code className="text-cyan-400">{project.id}</code></span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
