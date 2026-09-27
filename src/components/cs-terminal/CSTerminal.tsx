import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../../data/personalInfo';
import { projects } from '../../data/projects';
import { sounds } from '../common/SoundEffects';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string | React.ReactNode;
}

const INITIAL_GREETING: TerminalLine[] = [
  {
    id: '1',
    type: 'system',
    content: `CS_KERNEL v2.4.0 (x86_64-apple-darwin) - Interactive Developer Terminal
Type "help" to view all available commands. Try "sudo hire" for a special surprise.`,
  },
];

export const CSTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>(INITIAL_GREETING);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    sounds.playClick();
    const newHistory = [...history, { id: Date.now().toString(), type: 'input' as const, content: `$ ${trimmed}` }];
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = null;
    let type: TerminalLine['type'] = 'output';

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold mb-1">Available Commands:</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">about</span> : Display developer profile and CS background</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">skills</span> : List frontend, 3D, and CS fundamental competencies</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">projects</span> : Show top software engineering & 3D projects</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">education</span> : University degree, coursework and milestones</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">contact</span> : Get direct email and social profile links</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">whoami</span> : Current user session role</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">sudo hire</span> : Execute instant hiring handshake protocol 🎉</p>
            <p><span className="text-purple-400 font-semibold w-24 inline-block">clear</span> : Clear terminal display</p>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-cyan-400 font-bold">{personalInfo.name} - {personalInfo.headline}</p>
            <p>{personalInfo.subheadline}</p>
            <p className="text-xs text-slate-400">Education: {personalInfo.degree} ({personalInfo.university}, Grad {personalInfo.graduationYear})</p>
            <p className="text-xs text-emerald-400">Status: 🟢 Available for Software Engineering Roles & Internships</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">Technical Core Competencies:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <span className="text-purple-300 font-semibold">Frontend & 3D:</span>
                <p className="text-slate-400">React, TypeScript, Three.js, WebGL, Next.js, Tailwind CSS, GLSL Shaders</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <span className="text-cyan-300 font-semibold">CS Fundamentals:</span>
                <p className="text-slate-400">Data Structures & Algorithms, OOP, Graphs, DP, System Design, Operating Systems</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <span className="text-emerald-300 font-semibold">Languages & Backend:</span>
                <p className="text-slate-400">JavaScript (ES6+), C/C++, Python, SQL, Node.js, Express, PostgreSQL</p>
              </div>
              <div className="p-2 rounded bg-black/40 border border-slate-800">
                <span className="text-amber-300 font-semibold">Tools & DevOps:</span>
                <p className="text-slate-400">Git/GitHub CI/CD, Vite, Docker, Linux/Bash, Figma, WebSockets</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-bold">Top Featured Projects:</p>
            {projects.slice(0, 3).map((p, idx) => (
              <div key={p.id} className="text-xs space-y-0.5">
                <p className="font-semibold text-white">
                  {idx + 1}. <span className="text-cyan-300">{p.title}</span> [{p.category}]
                </p>
                <p className="text-slate-400 pl-4">{p.tagline}</p>
                <p className="text-slate-500 pl-4 font-mono text-[11px]">Stack: {p.tags.join(', ')}</p>
              </div>
            ))}
            <p className="text-xs text-slate-400 italic pt-1">Scroll up or visit the #projects section for full 3D interactive view.</p>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-1.5 text-slate-300 text-xs">
            <p className="text-cyan-400 font-bold text-sm">{personalInfo.degree}</p>
            <p className="text-slate-200">{personalInfo.university} • Class of {personalInfo.graduationYear}</p>
            <p className="text-slate-400">Core Coursework: Data Structures, Analysis of Algorithms, Computer Architecture, Operating Systems, Database Management, Computer Graphics, Software Engineering.</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p className="text-cyan-400 font-bold text-sm">Direct Contact Channels:</p>
            <p>📧 Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-300 underline">{personalInfo.email}</a></p>
            <p>🐙 GitHub: <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{personalInfo.socials.github}</a></p>
            <p>💼 LinkedIn: <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{personalInfo.socials.linkedin}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        if (args[0] === 'hire') {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#00f0ff', '#a855f7', '#10b981', '#f59e0b'],
          });
          sounds.playSuccess();
          type = 'success';
          output = (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>ACCESS GRANTED: HIRING PROTOCOL INITIATED!</span>
              </p>
              <p className="text-xs">
                Thank you for your interest! Let's build something phenomenal together.
                Reach out at <a href={`mailto:${personalInfo.email}`} className="underline font-bold text-white">{personalInfo.email}</a>.
              </p>
            </div>
          );
        } else {
          type = 'error';
          output = `sudo: ${args.join(' ')}: command not found. Try "sudo hire"`;
        }
        break;

      default:
        type = 'error';
        output = `Command not recognized: "${trimmed}". Type "help" for valid commands.`;
        break;
    }

    setHistory([...newHistory, { id: (Date.now() + 1).toString(), type, content: output }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(cmdHistory.length - 1, historyIdx + 1);
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  return (
    <section id="terminal" className="relative py-20 border-t border-slate-900 bg-cyber-bg/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Window Box */}
        <div
          className={`relative rounded-2xl bg-[#090d1a] border border-cyan-500/30 shadow-[0_0_50px_-15px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col font-mono text-sm transition-all duration-300 ${
            isMaximized ? 'h-[650px]' : 'h-[460px]'
          }`}
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-cyber-surface/90 border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={() => setHistory([])} title="Clear Screen" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} title="Maximize" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => inputRef.current?.focus()} title="Focus Input" />
              <span className="text-xs text-slate-400 ml-2 flex items-center gap-1.5 font-sans">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono text-cyan-300">babit@cs-station: ~</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Terminal Output Body */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="flex-1 p-5 overflow-y-auto space-y-3 font-mono text-xs sm:text-sm cursor-text scroll-smooth"
          >
            {history.map((line) => (
              <div
                key={line.id}
                className={`${
                  line.type === 'input'
                    ? 'text-cyan-300 font-semibold'
                    : line.type === 'system'
                    ? 'text-slate-400'
                    : line.type === 'error'
                    ? 'text-rose-400'
                    : line.type === 'success'
                    ? 'text-emerald-300'
                    : 'text-slate-200'
                }`}
              >
                {typeof line.content === 'string' ? (
                  <p className="whitespace-pre-wrap leading-relaxed">{line.content}</p>
                ) : (
                  line.content
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Interactive Command Input Line */}
          <div className="p-3 px-4 bg-cyber-surface/60 border-t border-slate-800 flex items-center gap-2">
            <span className="text-cyan-400 font-bold shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='Type "help", "skills", "projects", or "sudo hire"...'
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs sm:text-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300 hover:bg-cyan-400/40 transition-colors"
              title="Execute Command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
