import React from 'react';
import { Mail, Linkedin, Globe, FileDown, Edit3, ArrowRight, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface HeroSectionProps {
  profile: ProfileData;
  isEditMode: boolean;
  onOpenEditProfile: () => void;
}

const renderFormattedBio = (text: string) => {
  return text.split(/\n\s*\n/).map((paragraph, pIdx) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={pIdx} className="mb-4 last:mb-0 leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} className="font-semibold text-slate-900 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  isEditMode,
  onOpenEditProfile,
}) => {
  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section id="intro" className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80">
      
      {/* Edit Mode Notice Banner */}
      {isEditMode && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 no-print">
          <div className="flex items-center justify-between p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Edit Mode Active:</span>
              <span>You can customize your introduction, metrics, and case studies. Click any edit button to update.</span>
            </div>
            <button
              onClick={onOpenEditProfile}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
            >
              Edit Introduction
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Full-Width Hero Header spanning above both description and portrait on desktop */}
        <div className="mb-8 lg:mb-10">
          {/* Editorial kicker & Open status (Unboxed clean text) */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 tracking-wide uppercase">
            <span className="text-slate-900 dark:text-white font-bold tracking-normal text-sm normal-case">{profile.fullName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{profile.title}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {profile.location}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">{profile.openToRoles}</span>
          </div>

          {/* Headline spanning across description & portrait with text-wrap: balance */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] mb-5 max-w-5xl" style={{ textWrap: 'balance' }}>
            {profile.headline}
          </h1>

          {/* Work permit & Language pill-free trust indicators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {profile.workPermit || 'Valid work permit in Germany'}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span>Languages: {profile.languages && profile.languages.length > 0 ? profile.languages.join(', ') : 'English (C1)'}</span>
            {profile.phone && (
              <>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                <a href={`tel:${profile.phone}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {profile.phone}
                </a>
              </>
            )}
          </div>
        </div>
        
        {/* Split Screen Hero Layout: Description & Competencies (Left) + Portrait Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Narrative & Competencies */}
          <div className="lg:col-span-7 flex flex-col justify-start">

            {/* Lead Narrative / Bio */}
            <div className="text-base sm:text-lg mb-8 max-w-2xl">
              {renderFormattedBio(profile.bio)}
            </div>

            {/* PM Superpowers list (clean, unboxed) */}
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Core Competencies & Product Superpowers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700 dark:text-slate-200">
                {profile.superpowers.map((power, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-500 dark:text-indigo-400 font-mono text-xs mt-0.5 font-bold">
                      {idx < 9 ? `0${idx + 1}.` : `${idx + 1}.`}
                    </span>
                    <span>{power}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
              >
                <span>View Product Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Direct PDF Resume Download */}
              <a
                href={profile.resumePdfUrl || `${import.meta.env.BASE_URL}assets/aistudio/Product_Manager_-_Subhanshu_Arora_Resume_cc28ed7f.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                download="Subhanshu_Arora_Resume_Product_Manager.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors shadow-xs"
              >
                <FileDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Download Resume (PDF)</span>
              </a>

              <button
                onClick={handlePrintResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
              >
                <FileDown className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Print One-Pager</span>
              </button>

              {isEditMode && (
                <button
                  onClick={onOpenEditProfile}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Bio & Intro</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Visual Container aligned at top alongside description */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              
              {/* Photo Frame with Fallback Container */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-6 border border-slate-100 dark:border-slate-800">
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.fullName} portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xl mb-3">
                    SA
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{profile.fullName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{profile.title}</p>
                </div>
              </div>

              {/* Bio Highlights / Quick Connect */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Current Role</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">Founder & Product Owner @ TraceAmigo</span>
                </div>

                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Primary Domains</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                    Product Development, Solution Consulting, TravelTech, B2B SaaS, Analytics
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Pitch Wins</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-right">GUS Network '25 & GISMA '24</span>
                </div>

                {/* Direct Link Badges */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                  {profile.email && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline decoration-indigo-500/40 underline-offset-4 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      title={`Send email to ${profile.email}`}
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>{profile.email}</span>
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      title="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4 shrink-0" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {profile.resumePdfUrl && (
                    <a
                      href={profile.resumePdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      title="View PDF Resume"
                    >
                      <FileDown className="w-4 h-4 shrink-0" />
                      <span>PDF Resume</span>
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Proof Strip (Section 2.B): Full-width row below the split, not inside the left column */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
          <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-6">
            Verified Career Impact & Key Performance Metrics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {profile.trackRecordMetrics.map((metric) => (
              <div key={metric.id} className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums tracking-tight">
                  {metric.value}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
                  {metric.label}
                </span>
                {metric.context && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {metric.context}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
