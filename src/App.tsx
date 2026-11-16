/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { PMToolkitSection } from './components/PMToolkitSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { CredentialsSection } from './components/CredentialsSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { EditProfileModal } from './components/EditProfileModal';
import { ProjectEditorModal } from './components/ProjectEditorModal';
import { ExportShareModal } from './components/ExportShareModal';
import { Footer } from './components/Footer';
import { DEFAULT_PORTFOLIO } from './data/defaultPortfolio';
import { PortfolioData, Project, ProfileData } from './types/portfolio';

const STORAGE_KEY = 'pm_portfolio_subhanshu_v15';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pm_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Main portfolio data with LocalStorage persistence
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.profile && parsed.projects) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Failed reading cached portfolio data', e);
      }
    }
    return DEFAULT_PORTFOLIO;
  });

  // UI state
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pm_theme', 'light');
    }
  }, [isDarkMode]);

  // Save portfolio state to LocalStorage
  const savePortfolio = (newData: PortfolioData) => {
    setPortfolio(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed saving portfolio to localStorage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handlers for profile
  const handleSaveProfile = (updatedProfile: ProfileData) => {
    const updated = { ...portfolio, profile: updatedProfile };
    savePortfolio(updated);
    showToast('Introduction & bio updated successfully');
  };

  // Handlers for projects
  const handleOpenAddProject = () => {
    setProjectToEdit(null);
    setIsProjectEditorOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setProjectToEdit(proj);
    setIsProjectEditorOpen(true);
  };

  const handleSaveProject = (savedProject: Project) => {
    let updatedProjects: Project[];
    const exists = portfolio.projects.some(p => p.id === savedProject.id);

    if (exists) {
      updatedProjects = portfolio.projects.map(p =>
        p.id === savedProject.id ? savedProject : p
      );
      showToast(`Updated "${savedProject.title}" case study`);
    } else {
      updatedProjects = [savedProject, ...portfolio.projects];
      showToast(`Added "${savedProject.title}" to portfolio`);
    }

    savePortfolio({ ...portfolio, projects: updatedProjects });
  };

  const handleDeleteProject = (projectId: string) => {
    const proj = portfolio.projects.find(p => p.id === projectId);
    if (window.confirm(`Are you sure you want to remove "${proj?.title || 'this project'}"?`)) {
      const updatedProjects = portfolio.projects.filter(p => p.id !== projectId);
      savePortfolio({ ...portfolio, projects: updatedProjects });
      showToast('Project removed');
    }
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    const updated = [...portfolio.projects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    savePortfolio({ ...portfolio, projects: updated });
  };

  // Import / Reset
  const handleImport = (importedData: PortfolioData) => {
    savePortfolio(importedData);
    showToast('Portfolio restored from backup file');
  };

  const handleResetToDefault = () => {
    savePortfolio(DEFAULT_PORTFOLIO);
    showToast('Reset to original sample portfolio');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      
      {/* Top Bar Navigation */}
      <Header
        profile={portfolio.profile}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        
        {/* Section 1: Introduction (Hero & About) */}
        <HeroSection
          profile={portfolio.profile}
          isEditMode={isEditMode}
          onOpenEditProfile={() => setIsEditProfileOpen(true)}
        />

        {/* Section 2: Projects / Products Case Studies */}
        <ProjectsSection
          projects={portfolio.projects}
          isEditMode={isEditMode}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onOpenAddProject={handleOpenAddProject}
          onOpenEditProject={handleOpenEditProject}
          onDeleteProject={handleDeleteProject}
          onMoveProject={handleMoveProject}
        />

        {/* Section 3: PM Toolkit & Methodologies */}
        <PMToolkitSection
          frameworks={portfolio.frameworks}
          tools={portfolio.tools}
        />

        {/* Section 4: Leadership Experience */}
        <ExperienceTimeline
          experiences={portfolio.experiences}
        />

        {/* Section 5: Academic Distinctions, Honors & Pitch Wins */}
        <CredentialsSection
          education={portfolio.education}
          awards={portfolio.awards}
        />

      </main>

      {/* Quiet Footer */}
      <Footer profile={portfolio.profile} />

      {/* MODALS */}

      {/* 1. Deep Dive Case Study Reader */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

      {/* 2. Edit Profile & Intro Modal */}
      <EditProfileModal
        profile={portfolio.profile}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* 3. Project / Product Editor Modal */}
      <ProjectEditorModal
        project={projectToEdit}
        isOpen={isProjectEditorOpen}
        onClose={() => setIsProjectEditorOpen(false)}
        onSave={handleSaveProject}
      />

      {/* 4. Export & Share Modal */}
      <ExportShareModal
        portfolio={portfolio}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onImport={handleImport}
        onResetToDefault={handleResetToDefault}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 border border-slate-700 dark:border-slate-200 animate-fade-in no-print">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
