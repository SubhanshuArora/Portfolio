import React, { useState } from 'react';
import { Plus, ArrowUpRight, TrendingUp, Layers, Edit2, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  projects: Project[];
  isEditMode: boolean;
  onOpenCaseStudy: (project: Project) => void;
  onOpenAddProject: () => void;
  onOpenEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onMoveProject: (index: number, direction: 'up' | 'down') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  isEditMode,
  onOpenCaseStudy,
  onOpenAddProject,
  onOpenEditProject,
  onDeleteProject,
  onMoveProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Derive unique domains for clean segmented filter
  const domains = ['all', ...Array.from(new Set(projects.map(p => p.domain)))];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.domain === activeFilter);

  return (
    <section id="projects" className="py-16 lg:py-24 border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              Shipped Work & Impact
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Products & PM Case Studies
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl text-justify">
              Deep dive into end-to-end product execution: from customer discovery and prioritization trade-offs to cross-functional squad delivery and measured business ROI.
            </p>
          </div>

          {/* Edit Mode Add Project Button */}
          {isEditMode && (
            <button
              onClick={onOpenAddProject}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product Case Study</span>
            </button>
          )}
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl mb-10 w-fit max-w-full">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveFilter(domain)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeFilter === domain
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {domain === 'all' ? 'All Products' : domain}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Top Image Frame with Aspect Ratio */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fallback container if image fails or before load */}
                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  <Layers className="w-10 h-10 text-indigo-500 mb-2 opacity-80" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{project.title}</span>
                  <span className="text-xs text-slate-500">{project.domain}</span>
                </div>

                {/* Edit Controls Toolbar in Edit Mode */}
                {isEditMode && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 p-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 dark:border-slate-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveProject(index, 'up');
                      }}
                      disabled={index === 0}
                      title="Move up"
                      className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveProject(index, 'down');
                      }}
                      disabled={index === projects.length - 1}
                      title="Move down"
                      className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-600"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEditProject(project);
                      }}
                      title="Edit project"
                      className="p-1.5 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteProject(project.id);
                      }}
                      title="Delete project"
                      className="p-1.5 text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                
                {/* Zero-Pill Unboxed Metadata with · separator */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{project.company}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.domain}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.timeline}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{project.role}</span>
                </div>

                {/* Primary Card Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {project.title}
                </h3>

                {/* Subtitle / One-Liner */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-justify">
                  {project.subtitle}
                </p>

                {/* North Star Metric Box */}
                <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Primary North Star Metric
                  </span>
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                    {project.northStarMetric}
                  </span>
                </div>

                {/* 3 Key Quantitative Outcome Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-6 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.id} className="flex flex-col">
                      <span className="text-lg sm:text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                        {metric.value}
                      </span>
                      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-tight mt-0.5 line-clamp-2">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto flex items-center justify-between">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    Full PRD & Discovery Breakdown
                  </span>
                  <button
                    onClick={() => onOpenCaseStudy(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-1">No products found in this category</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">You can add your own projects to this domain in Edit Mode.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-3.5 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
