import React, { useState, useMemo } from 'react';
import { Search, Filter, Layers, Code2 } from 'lucide-react';
import { Project, ProjectCategory } from '../../types';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { sounds } from '../common/SoundEffects';

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Frontend',
  '3D & WebGL',
  'Fullstack',
  'CS & Algorithms',
];

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filtered projects memoization
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="projects" className="relative py-24 border-t border-slate-900 bg-cyber-bg/90">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
              <Layers className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Projects & Experiments</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              High-performance 3D graphics, interactive frontend systems, and scalable full-stack applications configured in <code className="text-cyan-300 font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">src/data/projects.ts</code>.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-cyber-surface/60 border border-slate-800 px-3.5 py-2 rounded-xl">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>{projects.length} Projects Configured</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  sounds.playClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-400/20'
                    : 'bg-cyber-surface/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, tags, tech..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-cyber-surface border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-cyber-surface/30 rounded-2xl border border-slate-800/80 p-8 space-y-4">
            <Filter className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No matching projects for category "{activeCategory}" with search term "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
