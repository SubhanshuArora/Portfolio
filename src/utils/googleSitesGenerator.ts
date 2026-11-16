import { PortfolioData, Project } from '../types/portfolio';

export interface GoogleSitesSectionBlock {
  id: string;
  title: string;
  placementHint: string;
  content: string;
}

export interface GoogleSitesPageKit {
  id: string;
  pageName: string;
  description: string;
  blocks: GoogleSitesSectionBlock[];
}

function escapeHtml(unsafe?: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripMarkdownBold(text: string): string {
  return (text || '').replace(/\*\*(.*?)\*\*/g, '$1');
}

function formatBioToHtml(text: string): string {
  return (text || '')
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const escaped = escapeHtml(paragraph.trim());
      const withBold = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return `<p>${withBold}</p>`;
    })
    .join('\n');
}

export function resolveAssetUrl(url: string, baseUrl: string): string {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${cleanBase}${cleanPath}`;
}

export async function compressImageToDataUrl(
  imageUrl: string,
  maxWidth = 720,
  quality = 0.76
): Promise<string | null> {
  if (!imageUrl || imageUrl.startsWith('data:')) {
    return imageUrl || null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const scale = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
        const width = Math.max(1, Math.round(img.naturalWidth * scale));
        const height = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
}

export async function buildInlinedImageMap(portfolio: PortfolioData): Promise<Record<string, string>> {
  const urls = new Set<string>();
  if (portfolio.profile.avatarUrl) urls.add(portfolio.profile.avatarUrl);
  portfolio.projects.forEach((p) => {
    if (p.coverImage) urls.add(p.coverImage);
  });

  const entries = await Promise.all(
    Array.from(urls).map(async (url) => {
      const maxWidth = url === portfolio.profile.avatarUrl ? 560 : 720;
      const dataUrl = await compressImageToDataUrl(url, maxWidth, 0.76);
      return [url, dataUrl] as const;
    })
  );

  const map: Record<string, string> = {};
  entries.forEach(([url, dataUrl]) => {
    if (dataUrl) {
      map[url] = dataUrl;
    }
  });
  return map;
}

export interface EmbedHtmlOptions {
  baseUrl: string;
  inlinedImages?: Record<string, string>;
  defaultTheme?: 'light' | 'dark';
}

export function generateGoogleSitesEmbedHtml(
  portfolio: PortfolioData,
  options: EmbedHtmlOptions
): string {
  const { profile, projects, frameworks, tools, experiences, education, awards } = portfolio;
  const { baseUrl, inlinedImages = {}, defaultTheme = 'light' } = options;

  const pickImage = (url: string) => {
    if (inlinedImages[url]) return inlinedImages[url];
    return resolveAssetUrl(url, baseUrl);
  };

  const resumeUrl = resolveAssetUrl(
    profile.resumePdfUrl || '/assets/aistudio/Product_Manager_-_Subhanshu_Arora_Resume_cc28ed7f.pdf',
    baseUrl
  );

  const uniqueDomains = ['All', ...Array.from(new Set(projects.map((p) => p.domain)))];

  const serializedCaseStudies = JSON.stringify(
    projects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      domain: p.domain,
      role: p.role,
      company: p.company,
      timeline: p.timeline,
      northStarMetric: p.northStarMetric,
      metrics: p.metrics,
      tags: p.tags,
      caseStudy: p.caseStudy,
    }))
  ).replace(/<\/script>/gi, '<\\/script>');

  const projectsCardsHtml = projects
    .map((p: Project) => {
      const coverSrc = pickImage(p.coverImage);
      const metricsHtml = p.metrics
        .slice(0, 3)
        .map(
          (m) => `
          <div class="metric-cell">
            <div class="metric-val">${escapeHtml(m.value)}</div>
            <div class="metric-lbl">${escapeHtml(m.label)}</div>
          </div>`
        )
        .join('');

      const tagsHtml = p.tags
        .slice(0, 4)
        .map((t) => `<span class="tag-text">${escapeHtml(t)}</span>`)
        .join(' <span class="sep">&middot;</span> ');

      return `
      <article class="project-card" data-domain="${escapeHtml(p.domain)}" onclick="openCaseStudy('${escapeHtml(p.id)}')">
        <div class="project-img-wrap">
          ${
            coverSrc
              ? `<img src="${escapeHtml(coverSrc)}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />`
              : ''
          }
          <div class="img-fallback" style="${coverSrc ? 'display:none;' : 'display:flex;'}">
            <span>${escapeHtml(p.company)}</span>
          </div>
          <span class="domain-chip">${escapeHtml(p.domain)}</span>
        </div>
        <div class="project-body">
          <div class="project-meta">
            <span>${escapeHtml(p.role)}</span>
            <span>${escapeHtml(p.timeline)}</span>
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <p class="project-sub">${escapeHtml(p.subtitle)}</p>
          <div class="project-metrics">${metricsHtml}</div>
          <div class="project-footer">
            <div class="project-tags">${tagsHtml}</div>
            <button type="button" class="read-btn" onclick="event.stopPropagation(); openCaseStudy('${escapeHtml(p.id)}')">
              Read Case Study &rarr;
            </button>
          </div>
        </div>
      </article>`;
    })
    .join('\n');

  const avatarSrc = pickImage(profile.avatarUrl);
  const initials = (profile.fullName || 'SA')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return `<!DOCTYPE html>
<html lang="en" class="${defaultTheme === 'dark' ? 'dark' : ''}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(profile.fullName)} · ${escapeHtml(profile.title)} Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --surface-alt: #f1f5f9;
      --border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #475569;
      --text-subtle: #64748b;
      --accent: #4f46e5;
      --accent-soft: #eef2ff;
      --accent-text: #4338ca;
      --success: #047857;
    }
    html.dark {
      --bg: #020617;
      --surface: #0f172a;
      --surface-alt: #1e293b;
      --border: #1e293b;
      --text: #f8fafc;
      --text-muted: #cbd5e1;
      --text-subtle: #94a3b8;
      --accent: #6366f1;
      --accent-soft: rgba(99, 102, 241, 0.14);
      --accent-text: #a5b4fc;
      --success: #34d399;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    .container { max-width: 1180px; margin: 0 auto; padding: 0 20px; }
    .mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }

    /* Header */
    .topbar {
      position: sticky; top: 0; z-index: 30;
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
    }
    .topbar-inner {
      display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 60px;
    }
    .brand { font-weight: 700; font-size: 16px; letter-spacing: -0.02em; white-space: nowrap; }
    .brand span.sub { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-text); margin-left: 8px; }
    .nav { display: flex; align-items: center; gap: 18px; font-size: 13px; font-weight: 500; color: var(--text-muted); overflow-x: auto; }
    .nav a { white-space: nowrap; }
    .nav a:hover { color: var(--text); }
    .theme-btn {
      border: 1px solid var(--border); background: var(--surface); color: var(--text);
      padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;
    }
    @media (max-width: 760px) { .nav { display: none; } }

    /* Sections */
    section { padding: 56px 0; border-bottom: 1px solid var(--border); }
    .section-kicker {
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--accent-text); margin-bottom: 8px;
    }
    .section-title { font-size: clamp(24px, 3vw, 32px); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; }
    .section-sub { font-size: 15px; color: var(--text-muted); max-width: 680px; margin-bottom: 28px; }

    /* Hero */
    .hero-grid { display: grid; grid-template-columns: 1.35fr 0.95fr; gap: 40px; align-items: start; }
    @media (max-width: 920px) { .hero-grid { grid-template-columns: 1fr; } }
    .kicker-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; color: var(--text-subtle); margin-bottom: 14px; }
    .kicker-name { font-size: 14px; font-weight: 700; color: var(--text); }
    .kicker-role { color: var(--accent-text); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
    .kicker-open { color: var(--success); font-weight: 600; }
    h1.headline {
      font-size: clamp(28px, 4vw, 44px); font-weight: 800; line-height: 1.14; letter-spacing: -0.025em;
      margin-bottom: 16px;
    }
    .trust-row { display: flex; flex-wrap: wrap; gap: 10px; font-size: 12px; color: var(--text-muted); margin-bottom: 20px; font-weight: 500; }
    .trust-ok { color: var(--success); font-weight: 600; }
    .bio p { font-size: 15.5px; color: var(--text-muted); margin-bottom: 14px; }
    .bio strong { color: var(--text); font-weight: 600; }

    .competencies { margin: 24px 0; }
    .competencies-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-subtle); font-weight: 700; margin-bottom: 10px; }
    .comp-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 18px; font-size: 13.5px; }
    @media (max-width: 560px) { .comp-grid { grid-template-columns: 1fr; } }
    .comp-item { display: flex; align-items: flex-start; gap: 8px; color: var(--text-muted); }
    .comp-num { color: var(--accent-text); font-weight: 700; font-size: 12px; margin-top: 2px; }

    .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px;
      background: var(--text); color: var(--bg); font-size: 13px; font-weight: 600;
    }
    .btn-secondary {
      display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 8px;
      background: var(--accent-soft); color: var(--accent-text); border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
      font-size: 13px; font-weight: 600;
    }

    /* Profile Card */
    .profile-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 20px;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
    }
    .avatar-box {
      position: relative; aspect-ratio: 4 / 5; width: 100%; border-radius: 12px; overflow: hidden;
      background: var(--surface-alt); margin-bottom: 18px; border: 1px solid var(--border);
    }
    .avatar-box img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
    .avatar-fallback {
      position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--surface-alt), var(--border)); text-align: center; padding: 16px;
    }
    .avatar-circle {
      width: 64px; height: 64px; border-radius: 999px; background: var(--accent-soft); color: var(--accent-text);
      display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; margin-bottom: 10px;
    }
    .fact-row {
      display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;
      padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 12px;
    }
    .fact-lbl { color: var(--text-subtle); flex-shrink: 0; }
    .fact-val { font-weight: 600; text-align: right; color: var(--text); }
    .fact-val.accent { color: var(--accent-text); }
    .contact-links {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; padding-top: 14px; font-size: 12px; font-weight: 600;
    }
    .contact-links a.email { color: var(--accent-text); text-decoration: underline; text-underline-offset: 3px; }

    /* Proof Strip */
    .proof-strip { margin-top: 42px; padding-top: 28px; border-top: 1px solid var(--border); }
    .proof-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; margin-top: 14px; }
    @media (max-width: 720px) { .proof-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .proof-val { font-size: 32px; font-weight: 800; line-height: 1.1; }
    .proof-lbl { font-size: 13px; font-weight: 600; margin-top: 4px; }
    .proof-ctx { font-size: 12px; color: var(--text-subtle); margin-top: 2px; }

    /* Projects */
    .filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
    .filter-btn {
      padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface);
      color: var(--text-muted); font-size: 12.5px; font-weight: 600; cursor: pointer;
    }
    .filter-btn.active { background: var(--text); color: var(--bg); border-color: var(--text); }
    .projects-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
    @media (max-width: 820px) { .projects-grid { grid-template-columns: 1fr; } }
    .project-card {
      background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden;
      display: flex; flex-direction: column; cursor: pointer; transition: transform 0.16s ease, box-shadow 0.16s ease;
    }
    .project-card:hover { transform: translateY(-2px); box-shadow: 0 10px 25px -10px rgba(15, 23, 42, 0.16); }
    .project-img-wrap { position: relative; aspect-ratio: 4 / 3; background: var(--surface-alt); overflow: hidden; border-bottom: 1px solid var(--border); }
    .project-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .img-fallback {
      position: absolute; inset: 0; align-items: center; justify-content: center;
      background: linear-gradient(135deg, var(--surface-alt), var(--border)); font-weight: 700; color: var(--text-muted);
    }
    .domain-chip {
      position: absolute; top: 12px; left: 12px; background: rgba(15, 23, 42, 0.85); color: #fff;
      padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
    }
    .project-body { padding: 20px; display: flex; flex-direction: column; flex: 1; }
    .project-meta { display: flex; justify-content: space-between; gap: 10px; font-size: 11.5px; font-weight: 600; color: var(--text-subtle); margin-bottom: 8px; }
    .project-body h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
    .project-sub { font-size: 13.5px; color: var(--text-muted); margin-bottom: 16px; }
    .project-metrics {
      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px;
      padding: 12px 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 14px;
    }
    .metric-val { font-family: 'JetBrains Mono', monospace; font-size: 16px; font-weight: 700; }
    .metric-lbl { font-size: 11px; color: var(--text-subtle); }
    .project-footer { margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .project-tags { font-size: 11.5px; color: var(--text-subtle); }
    .read-btn {
      background: none; border: none; color: var(--accent-text); font-size: 12.5px; font-weight: 700;
      cursor: pointer; white-space: nowrap;
    }

    /* Toolkit, Timeline, Credentials */
    .two-col { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
    @media (max-width: 780px) { .two-col { grid-template-columns: 1fr; } }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 20px; }
    .list-clean { list-style: none; display: grid; gap: 10px; font-size: 14px; color: var(--text-muted); }
    .list-clean li { display: flex; gap: 10px; align-items: flex-start; }
    .list-dot { color: var(--accent-text); font-weight: 800; }
    .tool-group { margin-bottom: 14px; }
    .tool-group:last-child { margin-bottom: 0; }
    .tool-cat { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); margin-bottom: 4px; }
    .tool-items { font-size: 13.5px; color: var(--text); font-weight: 500; }

    .exp-stack { display: grid; gap: 18px; }
    .exp-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
    .exp-role { font-size: 17px; font-weight: 700; }
    .exp-company { font-size: 14px; font-weight: 600; color: var(--accent-text); }
    .exp-period { font-size: 12.5px; font-weight: 600; color: var(--text-subtle); font-family: 'JetBrains Mono', monospace; }
    .exp-bullets { padding-left: 18px; display: grid; gap: 6px; font-size: 13.5px; color: var(--text-muted); }

    .cred-item { padding: 14px 0; border-bottom: 1px solid var(--border); }
    .cred-item:last-child { border-bottom: none; padding-bottom: 0; }
    .cred-title { font-weight: 700; font-size: 15px; }
    .cred-meta { font-size: 12.5px; color: var(--accent-text); font-weight: 600; margin: 2px 0 4px; }
    .cred-desc { font-size: 13px; color: var(--text-muted); }

    footer { padding: 32px 0; text-align: center; font-size: 13px; color: var(--text-subtle); }

    /* Case Study Modal */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 60; background: rgba(2, 6, 23, 0.72);
      display: none; align-items: center; justify-content: center; padding: 16px;
    }
    .modal-backdrop.open { display: flex; }
    .modal-panel {
      width: 100%; max-width: 820px; max-height: 90vh; overflow-y: auto;
      background: var(--surface); color: var(--text); border: 1px solid var(--border);
      border-radius: 16px; padding: 28px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
    }
    .modal-top { display: flex; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border); margin-bottom: 18px; }
    .modal-close {
      border: 1px solid var(--border); background: var(--surface-alt); color: var(--text);
      width: 34px; height: 34px; border-radius: 8px; font-size: 18px; cursor: pointer; flex-shrink: 0;
    }
    .cs-block { margin-bottom: 18px; }
    .cs-block h4 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-text); margin-bottom: 6px; }
    .cs-block p { font-size: 14px; color: var(--text-muted); margin-bottom: 6px; }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="container topbar-inner">
      <a href="#intro" class="brand">${escapeHtml(profile.fullName)} <span class="sub">PM Showcase</span></a>
      <nav class="nav">
        <a href="#intro">Introduction</a>
        <a href="#projects">Featured Products</a>
        <a href="#toolkit">PM Toolkit</a>
        <a href="#experience">Career Journey</a>
        <a href="#credentials">Honors &amp; Degrees</a>
      </nav>
      <button type="button" class="theme-btn" onclick="toggleTheme()" id="themeBtn">Toggle Theme</button>
    </div>
  </header>

  <main>
    <section id="intro">
      <div class="container">
        <div class="hero-grid">
          <div>
            <div class="kicker-row">
              <span class="kicker-name">${escapeHtml(profile.fullName)}</span>
              <span>&middot;</span>
              <span class="kicker-role">${escapeHtml(profile.title)}</span>
              <span>&middot;</span>
              <span>${escapeHtml(profile.location)}</span>
              <span>&middot;</span>
              <span class="kicker-open">${escapeHtml(profile.openToRoles)}</span>
            </div>
            <h1 class="headline">${escapeHtml(profile.headline)}</h1>
            <div class="trust-row">
              <span class="trust-ok">&#10003; ${escapeHtml(profile.workPermit || 'Valid in Germany, unrestricted employment permitted')}</span>
              <span>&middot;</span>
              <span>Languages: ${escapeHtml((profile.languages || ['English (C1)']).join(', '))}</span>
              ${profile.phone ? `<span>&middot;</span><a href="tel:${escapeHtml(profile.phone)}">${escapeHtml(profile.phone)}</a>` : ''}
            </div>
            <div class="bio">
              ${formatBioToHtml(profile.bio)}
            </div>
            <div class="competencies">
              <div class="competencies-title">Core Competencies &amp; Product Superpowers</div>
              <div class="comp-grid">
                ${profile.superpowers
                  .map(
                    (power, i) => `
                  <div class="comp-item">
                    <span class="comp-num mono">${i < 9 ? `0${i + 1}.` : `${i + 1}.`}</span>
                    <span>${escapeHtml(power)}</span>
                  </div>`
                  )
                  .join('')}
              </div>
            </div>
            <div class="cta-row">
              <a href="#projects" class="btn-primary">View Product Case Studies &rarr;</a>
              <a href="${escapeHtml(resumeUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">Download Resume (PDF)</a>
            </div>
          </div>

          <aside class="profile-card">
            <div class="avatar-box">
              ${
                avatarSrc
                  ? `<img src="${escapeHtml(avatarSrc)}" alt="${escapeHtml(profile.fullName)} portrait" onerror="this.style.display='none';" />`
                  : ''
              }
              <div class="avatar-fallback" style="z-index: -1;">
                <div class="avatar-circle">${escapeHtml(initials)}</div>
                <strong>${escapeHtml(profile.fullName)}</strong>
                <span style="font-size:12px;color:var(--text-subtle);">${escapeHtml(profile.title)}</span>
              </div>
            </div>
            <div class="fact-row">
              <span class="fact-lbl">Current Role</span>
              <span class="fact-val">Founder &amp; Product Owner @ TraceAmigo</span>
            </div>
            <div class="fact-row">
              <span class="fact-lbl">Primary Domains</span>
              <span class="fact-val">Product Development, Solution Consulting, TravelTech, B2B SaaS, Analytics</span>
            </div>
            <div class="fact-row">
              <span class="fact-lbl">Pitch Wins</span>
              <span class="fact-val accent">GUS Network '25 &amp; GISMA '24</span>
            </div>
            <div class="contact-links">
              ${
                profile.email
                  ? `<a class="email" href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>`
                  : ''
              }
              ${
                profile.linkedinUrl
                  ? `<a href="${escapeHtml(profile.linkedinUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`
                  : ''
              }
              <a href="${escapeHtml(resumeUrl)}" target="_blank" rel="noopener noreferrer">PDF Resume</a>
            </div>
          </aside>
        </div>

        <div class="proof-strip">
          <div class="section-kicker" style="color: var(--text-subtle);">Verified Career Impact &amp; Key Performance Metrics</div>
          <div class="proof-grid">
            ${profile.trackRecordMetrics
              .map(
                (m) => `
              <div>
                <div class="proof-val mono">${escapeHtml(m.value)}</div>
                <div class="proof-lbl">${escapeHtml(m.label)}</div>
                ${m.context ? `<div class="proof-ctx">${escapeHtml(m.context)}</div>` : ''}
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>

    <section id="projects">
      <div class="container">
        <div class="section-kicker">Product Case Studies</div>
        <h2 class="section-title">Featured Products &amp; 0-to-1 Solutions</h2>
        <p class="section-sub">Click any product card to inspect problem framing, discovery research, strategic trade-offs, execution, and measurable results.</p>

        <div class="filter-row">
          ${uniqueDomains
            .map(
              (dom, idx) =>
                `<button type="button" class="filter-btn ${idx === 0 ? 'active' : ''}" onclick="filterProjects('${escapeHtml(dom)}', this)">${escapeHtml(dom)}</button>`
            )
            .join('')}
        </div>

        <div class="projects-grid">
          ${projectsCardsHtml}
        </div>
      </div>
    </section>

    <section id="toolkit">
      <div class="container">
        <div class="section-kicker">PM Methodology &amp; Stack</div>
        <h2 class="section-title">Product Toolkit &amp; Execution Craft</h2>
        <div class="two-col" style="margin-top:24px;">
          <div class="card">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:14px;">Core Frameworks &amp; Discovery Methods</h3>
            <ul class="list-clean">
              ${frameworks
                .map((fw) => `<li><span class="list-dot">&rsaquo;</span><span>${escapeHtml(fw)}</span></li>`)
                .join('')}
            </ul>
          </div>
          <div class="card">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:14px;">Technical, Analytics &amp; Product Stack</h3>
            ${tools
              .map(
                (group) => `
              <div class="tool-group">
                <div class="tool-cat">${escapeHtml(group.category)}</div>
                <div class="tool-items">${group.items.map(escapeHtml).join(' &middot; ')}</div>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>

    <section id="experience">
      <div class="container">
        <div class="section-kicker">Career Progression</div>
        <h2 class="section-title">Leadership &amp; Product Experience</h2>
        <div class="exp-stack" style="margin-top:24px;">
          ${experiences
            .map(
              (exp) => `
            <div class="card">
              <div class="exp-head">
                <div>
                  <div class="exp-role">${escapeHtml(exp.role)}</div>
                  <div class="exp-company">${escapeHtml(exp.company)} &middot; ${escapeHtml(exp.location)}</div>
                </div>
                <div class="exp-period">${escapeHtml(exp.period)}</div>
              </div>
              <ul class="exp-bullets">
                ${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
              </ul>
            </div>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <section id="credentials">
      <div class="container">
        <div class="section-kicker">Credentials &amp; Recognition</div>
        <h2 class="section-title">Education, Honors &amp; Pitch Wins</h2>
        <div class="two-col" style="margin-top:24px;">
          <div class="card">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:10px;">Academic Background</h3>
            ${education
              .map(
                (edu) => `
              <div class="cred-item">
                <div class="cred-title">${escapeHtml(edu.degree)}</div>
                <div class="cred-meta">${escapeHtml(edu.institution)} &middot; ${escapeHtml(edu.period)}</div>
                <div class="cred-desc">${escapeHtml(edu.focus)}${edu.thesis ? ` | Thesis: ${escapeHtml(edu.thesis)}` : ''}</div>
              </div>`
              )
              .join('')}
          </div>
          <div class="card">
            <h3 style="font-size:16px;font-weight:700;margin-bottom:10px;">Startup Pitch Wins &amp; Honors</h3>
            ${awards
              .map(
                (aw) => `
              <div class="cred-item">
                <div class="cred-title">${escapeHtml(aw.title)}</div>
                <div class="cred-meta">${escapeHtml(aw.eventOrOrg)} &middot; ${escapeHtml(aw.date)}</div>
                <div class="cred-desc">${escapeHtml(aw.description)}</div>
              </div>`
              )
              .join('')}
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="container">
      <strong>${escapeHtml(profile.fullName)}</strong> &middot; ${escapeHtml(profile.title)} &middot; ${escapeHtml(profile.location)}
      ${profile.email ? ` &middot; <a href="mailto:${escapeHtml(profile.email)}" style="color:var(--accent-text);text-decoration:underline;">${escapeHtml(profile.email)}</a>` : ''}
    </div>
  </footer>

  <div class="modal-backdrop" id="csModal" onclick="if(event.target === this) closeCaseStudy()">
    <div class="modal-panel" role="dialog" aria-modal="true">
      <div class="modal-top">
        <div>
          <div id="csMeta" style="font-size:12px;font-weight:700;color:var(--accent-text);margin-bottom:4px;"></div>
          <h3 id="csTitle" style="font-size:22px;font-weight:800;line-height:1.25;"></h3>
          <p id="csSub" style="font-size:13.5px;color:var(--text-muted);margin-top:4px;"></p>
        </div>
        <button type="button" class="modal-close" onclick="closeCaseStudy()" aria-label="Close">&times;</button>
      </div>
      <div id="csBody"></div>
    </div>
  </div>

  <script>
    const CASE_STUDIES = ${serializedCaseStudies};

    function toggleTheme() {
      document.documentElement.classList.toggle('dark');
    }

    function filterProjects(domain, btn) {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      if (btn) btn.classList.add('active');
      document.querySelectorAll('.project-card').forEach(function(card) {
        if (domain === 'All' || card.getAttribute('data-domain') === domain) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function esc(s) {
      return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function paragraphs(text) {
      return String(text || '')
        .split(/\\n/)
        .map(function(l) { return l.trim(); })
        .filter(Boolean)
        .map(function(l) { return '<p>' + esc(l) + '</p>'; })
        .join('');
    }

    function openCaseStudy(id) {
      var proj = CASE_STUDIES.find(function(p) { return p.id === id; });
      if (!proj) return;
      document.getElementById('csMeta').textContent = proj.company + ' · ' + proj.role + ' · ' + proj.timeline;
      document.getElementById('csTitle').textContent = proj.title;
      document.getElementById('csSub').textContent = proj.subtitle;

      var cs = proj.caseStudy || {};
      var html = '';
      if (cs.teamComposition) html += '<div class="cs-block"><h4>Team &amp; Scope</h4><p>' + esc(cs.teamComposition) + '</p></div>';
      if (cs.problemContext) html += '<div class="cs-block"><h4>Problem Context</h4>' + paragraphs(cs.problemContext) + '</div>';
      if (cs.discoveryResearch) html += '<div class="cs-block"><h4>Discovery &amp; Research</h4>' + paragraphs(cs.discoveryResearch) + '</div>';
      if (cs.strategicPrioritization) html += '<div class="cs-block"><h4>Strategic Prioritization</h4>' + paragraphs(cs.strategicPrioritization) + '</div>';
      if (cs.solutionExecution) html += '<div class="cs-block"><h4>Solution &amp; Execution</h4>' + paragraphs(cs.solutionExecution) + '</div>';
      if (cs.resultsImpact) html += '<div class="cs-block"><h4>Results &amp; Impact</h4>' + paragraphs(cs.resultsImpact) + '</div>';
      if (cs.learningsRetrospective) html += '<div class="cs-block"><h4>Key Learnings</h4>' + paragraphs(cs.learningsRetrospective) + '</div>';

      document.getElementById('csBody').innerHTML = html;
      document.getElementById('csModal').classList.add('open');
    }

    function closeCaseStudy() {
      document.getElementById('csModal').classList.remove('open');
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeCaseStudy();
    });
  </script>
</body>
</html>`;
}

export function generateGoogleSitesNativeKit(portfolio: PortfolioData): GoogleSitesPageKit[] {
  const { profile, projects, frameworks, tools, experiences, education, awards } = portfolio;

  return [
    {
      id: 'page-home',
      pageName: 'Page 1: Home & Introduction',
      description: 'Paste these blocks onto your Google Sites Home page using Header + Two-Column Content layout.',
      blocks: [
        {
          id: 'home-banner',
          title: 'Hero Banner Title & Subheader',
          placementHint: 'Top Banner / Title block',
          content: `${profile.headline}\n\n${profile.fullName} · ${profile.title} · ${profile.location}\n${profile.openToRoles} | ${profile.workPermit || 'Valid in Germany, unrestricted employment permitted'} | Languages: ${(profile.languages || ['English (C1)']).join(', ')}`,
        },
        {
          id: 'home-bio',
          title: 'About & Executive Narrative',
          placementHint: 'Left Text Box (next to your Portrait image)',
          content: stripMarkdownBold(profile.bio),
        },
        {
          id: 'home-sidebar',
          title: 'Profile Summary & Quick Connect',
          placementHint: 'Right Column below Portrait Image',
          content: `Current Role: Founder & Product Owner @ TraceAmigo\nPrimary Domains: Product Development, Solution Consulting, TravelTech, B2B SaaS, Analytics\nPitch Wins: GUS Network '25 & GISMA '24\nEmail: ${profile.email}\nPhone: ${profile.phone}\nLinkedIn: ${profile.linkedinUrl}`,
        },
        {
          id: 'home-competencies',
          title: 'Core Competencies & Product Superpowers',
          placementHint: '2-Column Text Grid below Hero',
          content: profile.superpowers.map((s, idx) => `${idx < 9 ? `0${idx + 1}` : idx + 1}. ${s}`).join('\n'),
        },
        {
          id: 'home-metrics',
          title: 'Verified Career Impact (4-Column Scorecards)',
          placementHint: '4-Column Layout row below Introduction',
          content: profile.trackRecordMetrics
            .map((m) => `${m.value} — ${m.label}${m.context ? ` (${m.context})` : ''}`)
            .join('\n'),
        },
      ],
    },
    {
      id: 'page-projects',
      pageName: 'Page 2: Featured Products',
      description: 'Use Google Sites Collapsible Groups or Image + Text blocks for each of your 4 case studies.',
      blocks: projects.map((p) => ({
        id: `proj-${p.id}`,
        title: p.title,
        placementHint: `${p.domain} · ${p.role} (${p.timeline})`,
        content: [
          `${p.title}`,
          `${p.subtitle}`,
          `Role: ${p.role} | Company: ${p.company} | Timeline: ${p.timeline}`,
          `North Star Metric: ${p.northStarMetric}`,
          `Key Metrics: ${p.metrics.map((m) => `${m.value} ${m.label}`).join(' · ')}`,
          '',
          `TEAM & SCOPE\n${p.caseStudy.teamComposition}`,
          '',
          `PROBLEM CONTEXT\n${p.caseStudy.problemContext}`,
          '',
          `DISCOVERY & RESEARCH\n${p.caseStudy.discoveryResearch}`,
          '',
          `STRATEGIC PRIORITIZATION\n${p.caseStudy.strategicPrioritization}`,
          '',
          `SOLUTION & EXECUTION\n${p.caseStudy.solutionExecution}`,
          '',
          `RESULTS & IMPACT\n${p.caseStudy.resultsImpact}`,
          '',
          `KEY LEARNINGS\n${p.caseStudy.learningsRetrospective}`,
        ].join('\n'),
      })),
    },
    {
      id: 'page-toolkit',
      pageName: 'Page 3: PM Toolkit',
      description: 'Add a 2-column section showcasing your discovery frameworks and technical stack.',
      blocks: [
        {
          id: 'toolkit-frameworks',
          title: 'Core Frameworks & Discovery Methods',
          placementHint: 'Left Column',
          content: frameworks.map((f) => `• ${f}`).join('\n'),
        },
        {
          id: 'toolkit-tools',
          title: 'Technical, Analytics & Product Stack',
          placementHint: 'Right Column',
          content: tools.map((g) => `${g.category}:\n${g.items.join(', ')}`).join('\n\n'),
        },
      ],
    },
    {
      id: 'page-career',
      pageName: 'Page 4: Career & Honors',
      description: 'Paste your streamlined career timeline, education credentials, and pitch competition wins.',
      blocks: [
        {
          id: 'career-experience',
          title: 'Leadership & Product Experience',
          placementHint: 'Full-width or Collapsible sections',
          content: experiences
            .map(
              (exp) =>
                `${exp.role}\n${exp.company} · ${exp.location} | ${exp.period}\n${exp.highlights.map((h) => `• ${h}`).join('\n')}`
            )
            .join('\n\n---\n\n'),
        },
        {
          id: 'career-education',
          title: 'Academic Background',
          placementHint: 'Left Column (Credentials)',
          content: education
            .map(
              (edu) =>
                `${edu.degree}\n${edu.institution} · ${edu.period} (${edu.location})\nFocus: ${edu.focus}${edu.thesis ? `\nThesis: ${edu.thesis}` : ''}`
            )
            .join('\n\n'),
        },
        {
          id: 'career-awards',
          title: 'Startup Pitch Wins & Honors',
          placementHint: 'Right Column (Awards)',
          content: awards
            .map((a) => `${a.title}\n${a.eventOrOrg} · ${a.date}\n${a.description}`)
            .join('\n\n'),
        },
      ],
    },
  ];
}
