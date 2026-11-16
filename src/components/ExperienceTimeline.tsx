import React from 'react';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            Track Record
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Career Journey & Leadership History
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            A progressive history of product ownership across venture-backed scaleups, driving product-market fit and operational scale.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div 
              key={exp.id || idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 transition-shadow hover:shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  {/* Unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{exp.company}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono shrink-0 sm:text-right">
                  {exp.period}
                </div>
              </div>

              {/* Highlights Bullet List */}
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc list-outside pl-4 leading-relaxed">
                {exp.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
