import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Users, Calendar, Building, CheckCircle, FileText, ArrowLeft, ArrowRight, Printer } from 'lucide-react';
import { Project } from '../types/portfolio';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'strategy' | 'delivery' | 'results' | 'learnings'>('overview');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-900 dark:text-white">{project.company}</span>
            <span aria-hidden="true">·</span>
            <span>{project.domain}</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">PM Case Study</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Print Case Study"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Close (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Hero Visual & Title */}
        <div className="px-6 sm:px-8 pt-6 pb-4 bg-slate-50/60 dark:bg-slate-950/40 border-b border-slate-200/80 dark:border-slate-800/80">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5 max-w-3xl text-justify">
            {project.subtitle}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">My Role</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{project.role}</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">Timeline</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{project.timeline}</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">North Star</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{project.northStarMetric}</span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-0.5">Squad Team</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block" title={caseStudy.teamComposition}>
                {caseStudy.teamComposition ? 'Cross-functional Squad' : 'Eng & Design'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Functional Segmented Tabs) */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-x-auto shrink-0">
          {[
            { id: 'overview', label: 'Overview & Impact' },
            { id: 'discovery', label: '1. Discovery & Problem' },
            { id: 'strategy', label: '2. Strategy & Prioritization' },
            { id: 'delivery', label: '3. Solution & Delivery' },
            { id: 'results', label: '4. Metrics & ROI' },
            { id: 'learnings', label: '5. Retrospective' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          
          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Product Cover Screenshot */}
              <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Key Quantitative Metrics Highlight */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Key Quantitative Results
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl">
                      <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white block">
                        {metric.value}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block mt-1">
                        {metric.label}
                      </span>
                      {metric.context && (
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          {metric.context}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Summary Narrative */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  The Problem & Solution at a Glance
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.problemContext}
                </p>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.resultsImpact}
                </p>
              </div>

              {/* Artifacts Preview */}
              {caseStudy.artifacts && caseStudy.artifacts.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Product Artifacts & Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {caseStudy.artifacts.map((artifact, i) => (
                      <div key={i} className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                        <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                          {artifact.type}
                        </div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white mb-1">
                          {artifact.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {artifact.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB: DISCOVERY */}
          {activeTab === 'discovery' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  The Customer Problem & Opportunity Context
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.problemContext}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Customer Discovery & User Research Insights
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.discoveryResearch}
                </p>
              </div>

              {caseStudy.teamComposition && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Cross-Functional Squad: </span>
                  <span className="text-slate-600 dark:text-slate-300">{caseStudy.teamComposition}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB: STRATEGY */}
          {activeTab === 'strategy' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Strategic Prioritization & Trade-Offs
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.strategicPrioritization}
                </p>
              </div>

              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl text-xs space-y-2">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 block">
                  North Star Metric Alignment: {project.northStarMetric}
                </span>
                <p className="text-indigo-800/80 dark:text-indigo-200/80 text-justify">
                  Prioritized around leading indicators that move the core business metric while actively pruning scope that did not directly de-risk the primary customer hypothesis.
                </p>
              </div>
            </div>
          )}

          {/* TAB: DELIVERY */}
          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Solution Architecture & Delivery Sprints
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.solutionExecution}
                </p>
              </div>

              {caseStudy.artifacts && caseStudy.artifacts.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Shipped Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {caseStudy.artifacts.map((artifact, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
                        <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">{artifact.title}</span>
                        <span className="text-slate-500 dark:text-slate-400">{artifact.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: RESULTS */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Quantified Business ROI & Metric Outcomes
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 mb-6 text-justify">
                  {caseStudy.resultsImpact}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.metrics.map((metric) => (
                  <div key={metric.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 rounded-xl">
                    <span className="text-2xl font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 block">
                      {metric.value}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mt-1">
                      {metric.label}
                    </span>
                    {metric.context && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {metric.context}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: LEARNINGS */}
          {activeTab === 'learnings' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  Retrospective: What Worked & What We Would Do Differently
                </h4>
                <p className="whitespace-pre-line text-slate-600 dark:text-slate-300 text-justify">
                  {caseStudy.learningsRetrospective}
                </p>
              </div>

              <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-900 dark:text-amber-300 block">
                  Product Leadership Reflection
                </span>
                <p className="text-amber-800/80 dark:text-amber-200/80 text-justify">
                  Great product managers share honest post-mortems. Highlighting technical or operational trade-offs demonstrates senior decision-making maturity.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[11px] text-slate-500 dark:text-slate-400">
                #{tag}
              </span>
            ))}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
