import React from 'react';
import { GraduationCap, Briefcase, Trophy, Milestone } from 'lucide-react';
import { timelineData } from '../../data/timeline';
import { sounds } from '../common/SoundEffects';

export const TimelineSection: React.FC = () => {
  const getIcon = (roleType: string) => {
    switch (roleType) {
      case 'Education':
        return GraduationCap;
      case 'Experience':
        return Briefcase;
      case 'Award':
        return Trophy;
      default:
        return Milestone;
    }
  };

  const getBadgeColor = (roleType: string) => {
    switch (roleType) {
      case 'Education':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'Experience':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Award':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  return (
    <section id="timeline" className="relative py-24 border-t border-slate-900 bg-cyber-bg/95">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Milestone className="w-3.5 h-3.5" />
            <span>JOURNEY & MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Road & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Timeline of Computer Science degree progress, hackathon triumphs, teaching experience, and engineering milestones.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-32 space-y-12">
          {timelineData.map((item) => {
            const Icon = getIcon(item.roleType);
            const badgeStyle = getBadgeColor(item.roleType);

            return (
              <div
                key={item.id}
                onMouseEnter={() => sounds.playHover()}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Node Dot on vertical line */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-cyber-card border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                </div>

                {/* Date on Left (Desktop) */}
                <div className="hidden sm:block absolute -left-36 top-2 text-right w-28 text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                  {item.period}
                </div>

                {/* Timeline Card */}
                <div className="p-6 rounded-2xl bg-cyber-card/70 border border-slate-800/80 group-hover:border-cyan-400/40 transition-all duration-300 backdrop-blur-xl shadow-lg space-y-3">
                  
                  {/* Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${badgeStyle}`}>
                        {item.roleType}
                      </span>
                      <span className="sm:hidden text-xs font-mono text-slate-400">
                        {item.period}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-purple-400 font-medium mt-0.5">
                      {item.organization}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyber-surface border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
