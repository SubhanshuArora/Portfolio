import React from 'react';
import { Sun, Moon, Share2, Eye, Edit3 } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeaderProps {
  profile: ProfileData;
  isEditMode: boolean;
  onToggleEditMode: () => void;
  onOpenEditProfile: () => void;
  onOpenShareModal: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  isEditMode,
  onToggleEditMode,
  onOpenEditProfile: _onOpenEditProfile,
  onOpenShareModal,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#intro" 
          className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center gap-2"
        >
          <span>{profile.fullName || "Product Portfolio"}</span>
          <span className="text-slate-400 dark:text-slate-600 font-normal">/</span>
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">PM Showcase</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#intro" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Introduction
          </a>
          <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Featured Products
          </a>
          <a href="#toolkit" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            PM Toolkit
          </a>
          <a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Career Journey
          </a>
          <a href="#credentials" className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Honors & Degrees
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster adhering to clean affordances */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle color theme"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Google Sites & Export */}
          <button
            onClick={onOpenShareModal}
            title="Export to Google Sites, backup JSON, or print PDF"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Google Sites &amp; Export</span>
          </button>

          {/* Mode Switcher / Primary Action */}
          <button
            onClick={onToggleEditMode}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 ${
              isEditMode
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
            }`}
          >
            {isEditMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>View Live Mode</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Customize Portfolio</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
