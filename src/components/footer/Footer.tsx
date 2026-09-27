import React from 'react';
import { ArrowUp, Code2 } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { sounds } from '../common/SoundEffects';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-slate-900 bg-[#03050a] text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5 flex items-center justify-center text-black font-bold font-mono">
              <Code2 className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-bold text-white tracking-wider">{personalInfo.name}</p>
              <p className="text-[11px] text-slate-500">{personalInfo.headline}</p>
            </div>
          </div>

          {/* Center text */}
          <div className="text-center text-slate-500 flex items-center gap-1.5">
            <span>Engineered with React 18, Three.js, GLSL & TypeScript</span>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-cyber-card hover:bg-cyber-surface border border-slate-800 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-2"
            title="Scroll to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </footer>
  );
};
