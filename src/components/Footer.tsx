import React from 'react';
import { Mail, Linkedin, Globe, ArrowUp } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface FooterProps {
  profile: ProfileData;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Role */}
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">
            {profile.fullName} · {profile.title}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Building 0-to-1 and 1-to-n digital products driven by customer discovery, data, and measurable impact.
          </p>
        </div>

        {/* Right: Quick Links & Back to Top */}
        <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
          {(profile.email || profile.phone) && (
            <button
              type="button"
              onClick={onOpenContact}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          )}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          )}
          <button
            onClick={scrollToTop}
            className="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
            title="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
