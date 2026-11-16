import React from 'react';
import { Compass, Cpu, Wrench, BarChart3, Users, GitBranch } from 'lucide-react';

interface PMToolkitSectionProps {
  frameworks: string[];
  tools: { category: string; items: string[] }[];
}

export const PMToolkitSection: React.FC<PMToolkitSectionProps> = ({
  frameworks,
  tools,
}) => {
  return (
    <section id="toolkit" className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
            Methodology & Tools
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Product Management Toolkit & Craft
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            A battle-tested repertoire of product strategy frameworks, experimentation methodologies, and quantitative instrumentation tools.
          </p>
        </div>

        {/* 2-Column Split: Frameworks vs Modern Tool Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Product Frameworks */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Core PM Frameworks & Strategic Paradigms
              </h3>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {frameworks.map((framework, idx) => (
                <div key={idx} className="py-3.5 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-indigo-500 dark:text-indigo-400 mt-0.5">
                    0{idx + 1}.
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block">
                      {framework}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: PM Tool Stack */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Daily PM Operating Stack
              </h3>
            </div>

            <div className="space-y-6">
              {tools.map((group, idx) => (
                <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    {group.category}
                  </div>
                  {/* Clean unboxed text with typographic separators (No pills!) */}
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200 flex flex-wrap items-center gap-2">
                    {group.items.map((item, i) => (
                      <React.Fragment key={i}>
                        <span>{item}</span>
                        {i < group.items.length - 1 && (
                          <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
