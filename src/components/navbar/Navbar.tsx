import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Code2, Menu, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { personalInfo } from '../../data/personalInfo';
import { sounds } from '../common/SoundEffects';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills & CS', href: '#skills' },
  { name: 'Terminal', href: '#terminal' },
  { name: 'Journey', href: '#timeline' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const { soundEnabled, toggleSound } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'projects', 'skills', 'terminal', 'timeline', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyber-bg/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-500 p-0.5 shadow-lg shadow-cyan-400/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-cyber-bg rounded-[10px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors font-mono">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                PORTFOLIO // v2.4
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-cyber-card/70 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-xl">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => sounds.playHover()}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-400/15 text-cyan-300 font-semibold border border-cyan-400/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons (Sound FX, Mobile Toggle) */}
          <div className="flex items-center gap-2">
            
            {/* Audio Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/20'
                  : 'bg-cyber-surface border-slate-800 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
              aria-label="Toggle Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 md:hidden rounded-xl bg-cyber-card border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cyber-card/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left px-4 py-2.5 rounded-xl text-sm font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyber-surface transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
