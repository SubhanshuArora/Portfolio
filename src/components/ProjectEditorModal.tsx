import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Project, MetricItem } from '../types/portfolio';

interface ProjectEditorModalProps {
  project: Project | null; // null = adding new
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const DEFAULT_IMAGES = [
  { label: 'TraceAmigo TravelTech', url: '/src/assets/images/project_traceamigo_brand_1794835080871.jpg' },
  { label: 'Asset Data Mart & ETL', url: '/src/assets/images/project_asset_data_mart_1794834069204.jpg' },
  { label: 'Product Hierarchy Builder', url: '/src/assets/images/project_product_hierarchy_1794834068312.jpg' },
  { label: 'Growth & Funnel Analytics', url: '/src/assets/images/project_growth_funnel_1793544393475.jpg' },
];

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Project>(() => {
    if (project) return { ...project };
    return {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      domain: 'Fintech & Infrastructure',
      role: 'Lead Product Manager',
      company: '',
      timeline: '6 Months',
      northStarMetric: '',
      coverImage: DEFAULT_IMAGES[0].url,
      tags: ['Product Management', 'B2B SaaS'],
      metrics: [
        { id: 'm1', label: 'Primary KPI Impact', value: '+35%', context: 'Within 90 days' },
        { id: 'm2', label: 'Active Retention Lift', value: '+24%', context: '30-day cohort' },
        { id: 'm3', label: 'Annualized Revenue', value: '$1.4M', context: 'New pipeline' },
      ],
      caseStudy: {
        teamComposition: '1 PM, 4 Full-Stack Engs, 1 Designer, 1 Data Analyst',
        problemContext: '',
        discoveryResearch: '',
        strategicPrioritization: '',
        solutionExecution: '',
        resultsImpact: '',
        learningsRetrospective: '',
        artifacts: [
          { title: 'Core Product Requirements Doc (PRD)', type: 'PRD', description: 'Functional scope, API contracts, and launch criteria.' }
        ]
      }
    };
  });

  const [activeTab, setActiveTab] = useState<'basics' | 'metrics' | 'casestudy'>('basics');

  if (!isOpen) return null;

  const handleChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCaseStudyChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      caseStudy: {
        ...prev.caseStudy,
        [field]: value
      }
    }));
  };

  const handleMetricChange = (idx: number, field: keyof MetricItem, value: string) => {
    const updated = [...formData.metrics];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData(prev => ({ ...prev, metrics: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {project ? `Edit Case Study: ${project.title}` : 'Add New Product Case Study'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Structure your product case study following real PM frameworks (Discovery, RICE, Impact, Learnings).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('basics')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'basics' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            1. Basic Info & Image
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'metrics' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            2. North Star & Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('casestudy')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'casestudy' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            3. Deep Dive PRD & Retrospective
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product / Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PayFlow Orchestrator"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Fintech (Series C)"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  One-Liner / Executive Subtitle *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Multi-gateway dynamic routing engine for enterprise SaaS checkouts."
                  value={formData.subtitle}
                  onChange={(e) => handleChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Product Domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech & Infrastructure"
                    value={formData.domain}
                    onChange={(e) => handleChange('domain', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    My Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Product Manager"
                    value={formData.role}
                    onChange={(e) => handleChange('role', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Q1 - Q3 2025"
                    value={formData.timeline}
                    onChange={(e) => handleChange('timeline', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              {/* Cover Image Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Product Cover Image
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Image URL or local path"
                    value={formData.coverImage}
                    onChange={(e) => handleChange('coverImage', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                  />
                  <div className="flex flex-wrap gap-2 text-[11px] items-center">
                    <span className="text-slate-400">Presets:</span>
                    {DEFAULT_IMAGES.map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleChange('coverImage', preset.url)}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  North Star Metric *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Payment Authorization Rate (+14.8%)"
                  value={formData.northStarMetric}
                  onChange={(e) => handleChange('northStarMetric', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  3 Key Quantitative Impact Metrics
                </label>
                <div className="space-y-3">
                  {formData.metrics.map((metric, idx) => (
                    <div key={metric.id || idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                      <input
                        type="text"
                        placeholder="Value (e.g. $8.6M / +42%)"
                        value={metric.value}
                        onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs font-bold font-mono"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. Annualized Recovered Volume)"
                        value={metric.label}
                        onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Context (e.g. Recovered false declines)"
                        value={metric.context || ''}
                        onChange={(e) => handleMetricChange(idx, 'context', e.target.value)}
                        className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Cross-Functional Team Composition
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 Lead PM, 5 Engineers, 1 Product Designer, 1 Data Scientist"
                  value={formData.caseStudy.teamComposition || ''}
                  onChange={(e) => handleCaseStudyChange('teamComposition', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: CASE STUDY DEEP DIVE */}
          {activeTab === 'casestudy' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  1. The Customer Problem & Market Opportunity
                </label>
                <textarea
                  rows={3}
                  placeholder="What was broken? Why was it critical for the customer and business?"
                  value={formData.caseStudy.problemContext}
                  onChange={(e) => handleCaseStudyChange('problemContext', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  2. User Discovery & Qualitative / Quantitative Research
                </label>
                <textarea
                  rows={3}
                  placeholder="How did you validate? User interviews, survey data, funnel telemetry, drop-off logs?"
                  value={formData.caseStudy.discoveryResearch}
                  onChange={(e) => handleCaseStudyChange('discoveryResearch', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  3. Strategic Prioritization & Trade-Offs (RICE / Scoping)
                </label>
                <textarea
                  rows={3}
                  placeholder="What bets were evaluated? What was deliberately cut from scope?"
                  value={formData.caseStudy.strategicPrioritization}
                  onChange={(e) => handleCaseStudyChange('strategicPrioritization', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  4. Solution & Delivery Execution
                </label>
                <textarea
                  rows={3}
                  placeholder="How did you collaborate with design, engineering, and GTM to ship the feature?"
                  value={formData.caseStudy.solutionExecution}
                  onChange={(e) => handleCaseStudyChange('solutionExecution', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  5. Quantified Results & Business ROI
                </label>
                <textarea
                  rows={3}
                  placeholder="What were the measurable business outcomes? ARR, conversion, retention, NPS?"
                  value={formData.caseStudy.resultsImpact}
                  onChange={(e) => handleCaseStudyChange('resultsImpact', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  6. Retrospective: Key Learnings & Future Iterations
                </label>
                <textarea
                  rows={3}
                  placeholder="What would you do differently next time? What unexpected friction occurred?"
                  value={formData.caseStudy.learningsRetrospective}
                  onChange={(e) => handleCaseStudyChange('learningsRetrospective', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-400">
              Step {activeTab === 'basics' ? '1 of 3' : activeTab === 'metrics' ? '2 of 3' : '3 of 3'}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              
              {activeTab !== 'casestudy' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'basics' ? 'metrics' : 'casestudy')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
