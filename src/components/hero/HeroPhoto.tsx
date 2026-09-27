import React, { useState, useRef } from 'react';
import { Sparkles, Code2, Cpu, Box, Terminal, Layers } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { sounds } from '../common/SoundEffects';

const ORBIT_BADGE_ICONS: Record<string, { icon: typeof Code2; color: string }> = {
  'React': { icon: Code2, color: 'text-cyan-400 border-cyan-400/40 bg-cyan-950/80' },
  'TypeScript': { icon: Terminal, color: 'text-blue-400 border-blue-400/40 bg-blue-950/80' },
  'Three.js': { icon: Box, color: 'text-emerald-400 border-emerald-400/40 bg-emerald-950/80' },
  'CS / DSA': { icon: Cpu, color: 'text-purple-400 border-purple-400/40 bg-purple-950/80' },
  'Python': { icon: Layers, color: 'text-amber-400 border-amber-400/40 bg-amber-950/80' },
  'WebGL': { icon: Sparkles, color: 'text-rose-400 border-rose-400/40 bg-rose-950/80' },
};

export const HeroPhoto: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const { photo, photoEffects } = personalInfo;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max 14 deg tilt
    const rotateY = (x / (rect.width / 2)) * 14;
    const rotateX = -(y / (rect.height / 2)) * 14;
    
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

  const glowShadowMap = {
    cyan: 'shadow-[0_0_50px_-10px_rgba(0,240,255,0.45)] border-cyan-400/50',
    purple: 'shadow-[0_0_50px_-10px_rgba(168,85,247,0.45)] border-purple-400/50',
    pink: 'shadow-[0_0_50px_-10px_rgba(244,63,94,0.45)] border-rose-400/50',
    emerald: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.45)] border-emerald-400/50',
    amber: 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.45)] border-amber-400/50',
  };

  const shapeClassMap = {
    squircle: 'rounded-3xl',
    rounded: 'rounded-2xl',
    circle: 'rounded-full aspect-square',
  };

  const badges = photoEffects.orbitBadges || ['React', 'TypeScript', 'Three.js', 'CS / DSA', 'Python', 'WebGL'];

  return (
    <div className="relative flex items-center justify-center select-none py-6 lg:py-0">
      {/* 3D Orbiting Badges Container */}
      {photoEffects.enableOrbitBadges && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-cyan-500/10 animate-spin-slow">
            {badges.map((badgeName, idx) => {
              const angle = (idx * (360 / badges.length)) * (Math.PI / 180);
              const radius = 175; // px from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const badgeConfig = ORBIT_BADGE_ICONS[badgeName] || { icon: Sparkles, color: 'text-cyan-400 border-cyan-400/40 bg-cyan-950/80' };
              const Icon = badgeConfig.icon;

              return (
                <div
                  key={badgeName}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `calc(50% + ${x}px - 22px)`,
                    top: `calc(50% + ${y}px - 22px)`,
                  }}
                >
                  <div
                    onMouseEnter={() => sounds.playHover()}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg transition-transform hover:scale-125 cursor-pointer animate-reverse-spin ${badgeConfig.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">{badgeName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Ambient Glow Background Pulse */}
      <div
        className={`absolute -inset-4 opacity-40 blur-2xl transition-all duration-700 pointer-events-none rounded-full ${
          photoEffects.glowColor === 'cyan'
            ? 'bg-cyan-500/30'
            : photoEffects.glowColor === 'purple'
            ? 'bg-purple-500/30'
            : photoEffects.glowColor === 'pink'
            ? 'bg-rose-500/30'
            : photoEffects.glowColor === 'emerald'
            ? 'bg-emerald-500/30'
            : 'bg-amber-500/30'
        }`}
      />

      {/* 3D Perspective Card Wrapper */}
      <div
        style={{ perspective: 1000 }}
        className="relative z-10"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
          }}
          className={`relative w-64 h-80 sm:w-72 sm:h-92 md:w-80 md:h-[400px] p-2 bg-gradient-to-b from-white/15 via-white/5 to-transparent backdrop-blur-xl border transition-all duration-300 group ${
            shapeClassMap[photoEffects.avatarShape || 'squircle']
          } ${glowShadowMap[photoEffects.glowColor || 'cyan']}`}
        >
          {/* Inner Photo Container */}
          <div
            className={`relative w-full h-full overflow-hidden bg-slate-950 ${
              shapeClassMap[photoEffects.avatarShape || 'squircle']
            }`}
          >
            {/* Photo Image */}
            <img
              src={photo}
              alt={personalInfo.name}
              className={`w-full h-full object-cover object-center transition-all duration-500 ${
                isHovered && photoEffects.enableGlitchOnHover ? 'scale-105 filter contrast-125 brightness-110' : ''
              }`}
            />

            {/* Holographic Scanline Overlay */}
            {photoEffects.enableScanlines && (
              <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-60 mix-blend-overlay" />
            )}

            {/* Holographic Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Futuristic Cyber Frame Decors */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>ONLINE // CS_DEV</span>
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400/80 bg-black/60 px-2 py-0.5 rounded border border-white/10">
              3D_TILT_ENABLED
            </div>
          </div>

          {/* Corner Tech Brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
