import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  X,
  Download,
  Upload,
  RotateCcw,
  Copy,
  Check,
  Printer,
  Globe,
  Code2,
  LayoutTemplate,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Loader2,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import {
  buildInlinedImageMap,
  generateGoogleSitesEmbedHtml,
  generateGoogleSitesNativeKit,
} from '../utils/googleSitesGenerator';

interface ExportShareModalProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onImport: (importedData: PortfolioData) => void;
  onResetToDefault: () => void;
}

type ModalTab = 'google-sites' | 'backup-pdf';
type GoogleSitesMode = 'embed' | 'native';

export const ExportShareModal: React.FC<ExportShareModalProps> = ({
  portfolio,
  isOpen,
  onClose,
  onImport,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('google-sites');
  const [gsMode, setGsMode] = useState<GoogleSitesMode>('embed');
  const [selectedPageIdx, setSelectedPageIdx] = useState<number>(0);
  const [inlineImages, setInlineImages] = useState<boolean>(true);
  const [inlinedImageMap, setInlinedImageMap] = useState<Record<string, string>>({});
  const [isPreparingImages, setIsPreparingImages] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const originUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://subhanshu-arora.portfolio';

  useEffect(() => {
    if (!isOpen || !inlineImages) return;
    let cancelled = false;
    setIsPreparingImages(true);
    buildInlinedImageMap(portfolio)
      .then((map) => {
        if (!cancelled) {
          setInlinedImageMap(map);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsPreparingImages(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen, inlineImages, portfolio]);

  const embedHtml = useMemo(() => {
    return generateGoogleSitesEmbedHtml(portfolio, {
      baseUrl: originUrl,
      inlinedImages: inlineImages ? inlinedImageMap : {},
      defaultTheme: 'light',
    });
  }, [portfolio, originUrl, inlineImages, inlinedImageMap]);

  const nativePages = useMemo(() => {
    return generateGoogleSitesNativeKit(portfolio);
  }, [portfolio]);

  if (!isOpen) return null;

  const markCopied = (key: string) => {
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2200);
  };

  const handleCopyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      markCopied(key);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
      markCopied(key);
    }
  };

  const handleDownloadEmbedHtml = () => {
    const blob = new Blob([embedHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${portfolio.profile.fullName.toLowerCase().replace(/\s+/g, '_')}_google_sites_portfolio.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolio, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `product_portfolio_${portfolio.profile.fullName.toLowerCase().replace(/\s+/g, '_')}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.profile && parsed.projects) {
            onImport(parsed);
            onClose();
          } else {
            alert('Invalid portfolio JSON structure. Please ensure it was exported from this app.');
          }
        } catch {
          alert('Could not parse JSON file.');
        }
      };
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const activeNativePage = nativePages[selectedPageIdx] || nativePages[0];
  const htmlSizeKb = Math.max(1, Math.round(new Blob([embedHtml]).size / 1024));

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Google Sites Builder &amp; Portfolio Export
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Publish your customized portfolio to Google Sites, download backups, or print to PDF.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Tab Bar */}
        <div className="px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('google-sites')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'google-sites'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Export to Google Sites</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('backup-pdf')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'backup-pdf'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON Backup &amp; PDF</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {activeTab === 'google-sites' ? (
            <>
              {/* Clear API Boundary Note + Mode Selector */}
              <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60">
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  <strong className="font-semibold text-slate-900 dark:text-white">How Google Sites export works:</strong>{' '}
                  Google Sites does not provide an external API to auto-create sites remotely in your Drive. Instead, choose either the{' '}
                  <strong className="font-semibold">1-Step Full HTML Embed</strong> (preserves this exact interactive layout &amp; case study modals inside Google Sites) or the{' '}
                  <strong className="font-semibold">Native Page-by-Page Copy Kit</strong> (for native Google Sites text boxes &amp; pages).
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setGsMode('embed')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      gsMode === 'embed'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Option 1: Full Interactive Embed Code</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGsMode('native')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      gsMode === 'native'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <span>Option 2: Native Google Sites Copy Kit</span>
                  </button>
                </div>
              </div>

              {gsMode === 'embed' ? (
                <div className="space-y-4">
                  {/* Embed Code Card */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                          Self-Contained Google Sites HTML Embed
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Includes Hero, Competencies, Domain Filters, Interactive Case Study Modals, Career Journey &amp; Credentials (~{htmlSizeKb} KB).
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleDownloadEmbedHtml}
                          disabled={isPreparingImages}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download .HTML</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopyText('embed-html', embedHtml)}
                          disabled={isPreparingImages}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                        >
                          {isPreparingImages ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Bundling Images...</span>
                            </>
                          ) : copiedKey === 'embed-html' ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied Embed HTML</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Embed Code</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Inline image toggle */}
                    <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none pt-1">
                      <input
                        type="checkbox"
                        checked={inlineImages}
                        onChange={(e) => setInlineImages(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>
                        Bundle compressed portrait &amp; project visuals inside HTML (recommended so all images render inside Google Sites)
                      </span>
                    </label>

                    {/* Code preview snippet */}
                    <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-36 border border-slate-800">
                      {embedHtml.slice(0, 1400)}...
                    </pre>

                    {/* Step-by-step instructions */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/70">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                        Quick 4-Step Setup on sites.google.com:
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
                        <li>
                          Open{' '}
                          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                            sites.google.com
                          </span>{' '}
                          and click <strong>+ Blank site</strong>.
                        </li>
                        <li>
                          In the right panel, select <strong>Insert → Embed → Embed code</strong>.
                        </li>
                        <li>
                          Paste the copied HTML code above, click <strong>Next → Insert</strong>, then drag the embed frame edges full-width across the page.
                        </li>
                        <li>
                          Delete the default Google Sites top header banner (optional, since your embed includes a sticky header) and click <strong>Publish</strong>.
                        </li>
                      </ol>
                    </div>
                  </div>

                  {/* Option 1B: Embed By URL */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white text-xs block">
                        Alternative: Embed via Live URL (Insert → Embed → By URL)
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">
                        {originUrl}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyText('embed-url', originUrl)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      {copiedKey === 'embed-url' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>URL Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Recommended Theme Specs */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-white">Recommended Google Sites Theme:</strong>{' '}
                      <em>Simple</em> or <em>Aristotle</em> · Font: <strong>Plus Jakarta Sans</strong> · Brand Hex:{' '}
                      <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">#4F46E5</span>
                    </div>
                  </div>

                  {/* Page Selector Pills */}
                  <div className="flex flex-wrap gap-2">
                    {nativePages.map((page, idx) => (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => setSelectedPageIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          selectedPageIdx === idx
                            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        {page.pageName}
                      </button>
                    ))}
                  </div>

                  {/* Active Page Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400">{activeNativePage.description}</p>

                  {/* Copy Blocks */}
                  <div className="space-y-3">
                    {activeNativePage.blocks.map((block) => (
                      <div
                        key={block.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                              {block.title}
                            </h5>
                            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                              Placement: {block.placementHint}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyText(block.id, block.content)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                          >
                            {copiedKey === block.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-sans bg-white dark:bg-slate-900/70 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 max-h-40 overflow-y-auto">
                          {block.content}
                        </pre>
                      </div>
                    ))}
                  </div>

                  {/* Direct Media & Resume Downloads for Native Upload */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      Download Images &amp; Resume for Native Google Sites Upload
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.profile.avatarUrl && (
                        <a
                          href={portfolio.profile.avatarUrl}
                          download="subhanshu_arora_portrait.png"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-500"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Portrait Photo</span>
                        </a>
                      )}
                      {portfolio.projects.map((p) =>
                        p.coverImage ? (
                          <a
                            key={p.id}
                            href={p.coverImage}
                            download={`${p.id}.jpg`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-500"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{p.title.split(':')[0]} Cover</span>
                          </a>
                        ) : null
                      )}
                      <a
                        href={
                          portfolio.profile.resumePdfUrl ||
                          '/assets/aistudio/Product_Manager_-_Subhanshu_Arora_Resume_cc28ed7f.pdf'
                        }
                        download="Subhanshu_Arora_Resume_Product_Manager.pdf"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Resume PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              {/* Action 1: Export JSON */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Download Portfolio JSON
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Keep a complete backup file of all your customized case studies and intro.
                  </span>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export File</span>
                </button>
              </div>

              {/* Action 2: Import JSON */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Restore from Backup JSON
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Load previously exported portfolio data onto this browser.
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select File</span>
                </button>
              </div>

              {/* Action 3: Print to PDF */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">
                    Print / Save as PDF
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Generate a clean, professional PDF one-pager tailored for recruiters and hiring managers.
                  </span>
                </div>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>

              {/* Action 4: Reset Sample */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Want to start over with the reference sample?
                </span>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Reset all changes and reload the default sample PM portfolio?'
                      )
                    ) {
                      onResetToDefault();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Sample Data</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 flex items-center justify-between shrink-0">
          <a
            href="https://sites.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Open Google Sites</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
