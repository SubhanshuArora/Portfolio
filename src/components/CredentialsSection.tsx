import React from 'react';
import { Trophy, GraduationCap, Award, BookOpen } from 'lucide-react';
import { EducationItem, AwardItem } from '../types/portfolio';

interface CredentialsSectionProps {
  education: EducationItem[];
  awards: AwardItem[];
}

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  education,
  awards,
}) => {
  return (
    <section id="credentials" className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            Academic & Competitive Distinctions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Education, Pitch Victories & Honors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            Venture pitch competition wins, continuous postgraduate digital transformation education, and mentorship leadership awards.
          </p>
        </div>

        {/* 2-Column Grid: Awards/Pitch Wins vs Education */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Pitch Competition Wins & Honors */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Venture Pitch Victories & Awards
              </h3>
            </div>

            <div className="space-y-6">
              {awards.map((award, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-5 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {award.title}
                    </span>
                    <span className="text-xs font-semibold font-mono text-indigo-600 dark:text-indigo-400 shrink-0">
                      {award.date}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {award.eventOrOrg}
                  </div>
                  {award.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Degrees & Certifications */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Degrees & Executive Programs
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-5 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {edu.degree}
                    </span>
                    <span className="text-xs font-semibold font-mono text-indigo-600 dark:text-indigo-400 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                    {edu.institution} · {edu.location}
                  </div>
                  {edu.focus && (
                    <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">Focus: </span>
                      {edu.focus}
                    </div>
                  )}
                  {edu.thesis && (
                    <div className="text-xs text-slate-600 dark:text-slate-300 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/60 dark:border-slate-800 mt-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-200 block mb-0.5">Master's Thesis:</span>
                      <span className="italic">{edu.thesis}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
