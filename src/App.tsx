import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { CSTerminal } from './components/cs-terminal/CSTerminal';
import { TimelineSection } from './components/timeline/TimelineSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ToastContainer } from './components/common/Toast';

const PortfolioContent: React.FC = () => {
  const { toasts, dismissToast } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-cyber-bg text-slate-100 selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* Interactive Custom Mouse Pointer */}
      <CustomCursor />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <ProjectsSection />
        <SkillsSection />
        <CSTerminal />
        <TimelineSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}

export default App;
