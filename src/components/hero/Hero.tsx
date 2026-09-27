import React from 'react';
import { ArrowRight, Terminal, Sparkles, Download, Code2, Cpu } from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { HeroPhoto } from './HeroPhoto';
import { ThreeHeroBg } from './ThreeHeroBg';
import { sounds } from '../common/SoundEffects';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    sounds.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* 3D Three.js Background Canvas */}
      <ThreeHeroBg />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:32px_32px] opacity-20 pointer-events-none" />

      {/* Radial Gradient Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-neonBlue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyber-neonPurple/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyber-card/80 border border-cyan-500/30 backdrop-blur-md text-xs text-cyan-300 font-mono shadow-lg shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-emerald-400">Available for Opportunities</span>
              <span className="text-slate-500">•</span>
              <span>CS Graduating '26</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-sm uppercase tracking-[0.25em] font-mono text-slate-400">
                Hi, I'm <span className="text-cyan-400 font-semibold">{personalInfo.name}</span>
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">3D Web Experiences</span> & Clean Frontend Code
              </h1>
            </div>

            {/* Subheadline / Bio */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Frontend Engineer & Computer Science student specializing in interactive <span className="text-cyan-300 font-medium">Three.js</span> 3D graphics, responsive <span className="text-purple-300 font-medium">React / TypeScript</span> systems, and high-efficiency algorithmic performance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => sounds.playHover()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('terminal')}
                onMouseEnter={() => sounds.playHover()}
                className="px-5 py-3.5 rounded-xl bg-cyber-card/80 hover:bg-cyber-surface border border-slate-700 hover:border-cyan-400/50 text-slate-200 hover:text-white font-mono text-xs flex items-center gap-2 backdrop-blur-md transform hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>$ ./launch-cs-terminal</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                onMouseEnter={() => sounds.playHover()}
                className="px-4 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social Icons & Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="p-2.5 rounded-xl bg-cyber-card border border-slate-800 hover:border-cyan-400/40 hover:text-cyan-400 transition-all text-slate-300"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="p-2.5 rounded-xl bg-cyber-card border border-slate-800 hover:border-purple-400/40 hover:text-purple-400 transition-all text-slate-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>

              <div className="h-4 w-px bg-slate-800 hidden sm:block" />

              {/* Mini Badges */}
              <div className="flex items-center gap-4 font-mono text-[11px]">
                <span className="flex items-center gap-1 text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" /> WebGL & React
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" /> DSA & Algorithms
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Tilt Hero Photo Frame */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <HeroPhoto />
          </div>

        </div>
      </div>
    </section>
  );
};
