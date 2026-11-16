export interface MetricItem {
  id: string;
  label: string;
  value: string;
  context?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface CaseStudyArtifact {
  title: string;
  type: 'PRD' | 'User Flow' | 'Wireframe' | 'Data Model' | 'Launch Checklist';
  description: string;
  url?: string;
}

export interface CaseStudy {
  problemContext: string;
  discoveryResearch: string;
  strategicPrioritization: string;
  solutionExecution: string;
  resultsImpact: string;
  learningsRetrospective: string;
  artifacts?: CaseStudyArtifact[];
  teamComposition?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  domain: string;
  role: string;
  company: string;
  timeline: string;
  northStarMetric: string;
  coverImage: string;
  metrics: MetricItem[];
  caseStudy: CaseStudy;
  tags: string[];
  featured?: boolean;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  focus?: string;
  thesis?: string;
}

export interface AwardItem {
  title: string;
  eventOrOrg: string;
  date: string;
  description?: string;
}

export interface ProfileData {
  fullName: string;
  title: string;
  headline: string;
  location: string;
  phone?: string;
  email: string;
  linkedinUrl: string;
  githubOrWebUrl?: string;
  bio: string;
  avatarUrl: string;
  openToRoles: string;
  workPermit?: string;
  languages?: string[];
  resumePdfUrl?: string;
  superpowers: string[];
  trackRecordMetrics: MetricItem[];
  storyPillars?: {
    title: string;
    timeframe: string;
    highlight: string;
    description: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface PortfolioData {
  profile: ProfileData;
  projects: Project[];
  experiences: ExperienceItem[];
  frameworks: string[];
  tools: { category: string; items: string[] }[];
  education: EducationItem[];
  awards: AwardItem[];
}

