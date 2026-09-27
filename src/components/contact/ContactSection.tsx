import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, MapPin, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../../data/personalInfo';
import { usePortfolio } from '../../context/PortfolioContext';
import { sounds } from '../common/SoundEffects';
import { GithubIcon, LinkedinIcon } from '../common/Icons';

export const ContactSection: React.FC = () => {
  const { addToast } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    sounds.playSuccess();
    addToast("Email copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all fields", "error");
      return;
    }

    setIsSending(true);
    sounds.playLaser();

    setTimeout(() => {
      setIsSending(false);
      sounds.playSuccess();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      addToast(`Thank you ${formData.name}! Message dispatched successfully.`, "success");
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-900 bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Exceptional</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Open for frontend engineering opportunities, 3D web contracts, research collaborations, and internships.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Info & Social Hub */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl bg-cyber-card/80 border border-slate-800 backdrop-blur-xl space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Direct Connect</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Reach out directly via email or connect on professional networks.
                </p>
              </div>

              {/* Email Box with 1-Click Copy */}
              <div className="p-4 rounded-xl bg-cyber-surface border border-slate-800 space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400">Primary Email</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-mono text-cyan-300 font-semibold truncate">
                    {personalInfo.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Location & Status */}
              <div className="space-y-2 text-xs text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open to Remote & On-site Relocation</span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400">Social & Code Repositories</span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyber-surface border border-slate-800 hover:border-cyan-400/40 text-slate-300 hover:text-white text-xs font-mono transition-all"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => sounds.playHover()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyber-surface border border-slate-800 hover:border-purple-400/40 text-slate-300 hover:text-white text-xs font-mono transition-all"
                >
                  <LinkedinIcon className="w-4 h-4 text-purple-400" />
                  <span>LinkedIn</span>
                </a>
                {personalInfo.socials.leetcode && (
                  <a
                    href={personalInfo.socials.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => sounds.playHover()}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyber-surface border border-slate-800 hover:border-amber-400/40 text-slate-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>LeetCode</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-cyber-card/80 border border-slate-800 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-400" />
                <span>Send a Direct Dispatch</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Message / Project Scope *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, vision, or project ideas..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSending ? 'Transmitting...' : 'Transmit Message'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
