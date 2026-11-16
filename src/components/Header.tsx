import React, { useState, useEffect } from 'react';
import { Sun, Moon, Linkedin, FileDown, Mail, Menu, X } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeaderProps {
  profile: ProfileData;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenContact: () => void;
}

const NAV_LINKS = [
  { href: '#intro', label: 'Introduction' },
  { href: '#projects', label: 'Featured Products' },
  { href: '#toolkit', label: 'PM Toolkit' },
  { href: '#experience', label: 'Career Journey' },
  { href: '#credentials', label: 'Honors & Degrees' },
];

export const Header: React.FC<HeaderProps> = ({
  profile,
  isDarkMode,
  onToggleDarkMode,
  onOpenContact,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const resumeHref =
    profile.resumePdfUrl ||
    `${import.meta.env.BASE_URL}assets/aistudio/Product_Manager_-_Subhanshu_Arora_Resume_cc28ed7f.pdf`;
  const linkedinHref = profile.linkedinUrl || 'https://linkedin.com/in/subhanshu-arora';

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#intro" 
          className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex items-center gap-2"
        >
          <span>{profile.fullName || "Product Portfolio"}</span>
        </a>

        {/* Zone 2: Desktop concise single-line text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Desktop theme toggle, LinkedIn icon, Download Resume, Contact & Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Desktop Light / Dark Mode Toggle (hidden in mobile/tablet view; moved inside hamburger menu) */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle color theme"
            className="hidden xl:inline-flex p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* LinkedIn Icon */}
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
            className="p-2 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Download Resume */}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            download="Subhanshu_Arora_Resume_Product_Manager.pdf"
            title="Download Resume (PDF)"
            aria-label="Download Resume"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download Resume</span>
          </a>

          {/* Contact */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenContact();
            }}
            title="View Contact Details (Email & Phone)"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-sm whitespace-nowrap shrink-0 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact</span>
          </button>

          {/* Mobile / Compact View Hamburger Menu Button (after Contact) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="xl:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile / Compact Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
          <nav aria-label="Mobile navigation" className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Dark Mode Toggle at the bottom of the list */}
            <div className="mt-1 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {isDarkMode ? "On" : "Off"}
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
