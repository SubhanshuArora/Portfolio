import { PortfolioData } from '../types/portfolio';
import traceAmigoCover from '../assets/images/project_traceamigo_brand_1794835080871.jpg';
import assetDataMartCover from '../assets/images/project_asset_data_mart_1794834069204.jpg';
import productHierarchyCover from '../assets/images/project_product_hierarchy_1794834068312.jpg';
import growthFunnelCover from '../assets/images/project_growth_funnel_1793544393475.jpg';

const BASE = import.meta.env.BASE_URL;

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    fullName: "Subhanshu Arora",
    title: "Product Manager",
    headline: "I turn ideas, data, and complex problems into products that create real impact.",
    location: "Berlin, Germany",
    phone: "+49-15235803564",
    email: "subhanshuarora@gmail.com",
    linkedinUrl: "https://linkedin.com/in/subhanshu-arora",
    githubOrWebUrl: "",
    openToRoles: "Open to Product Manager / Growth PM / Lead PM roles",
    workPermit: "Valid work permit in Germany",
    languages: ["English (C1)"],
    resumePdfUrl: `${BASE}assets/aistudio/Product_Manager_-_Subhanshu_Arora_Resume_cc28ed7f.pdf`,
    avatarUrl: `${BASE}assets/aistudio/Gemini_Generated_Image_i954p7i954p7i954_1cb5e590.png`,
    bio: `I'm a **Product Manager, entrepreneur, and digital transformation professional** with 10+ years of experience at the intersection of business, technology, data analytics, and product development.

I enjoy identifying opportunities, understanding complex problems, and transforming them into practical digital solutions. My experience spans product strategy, customer discovery, business analysis, MVP development, UX/UI design, cross-functional leadership, and data-driven decision-making.

I'm the **Founder of TraceAmigo**, a zero-to-one TravelTech venture I am building from the ground up. Combining founder ownership with hands-on product management and product ownership, I shape the startup's business model, market positioning, investor narrative, and early go-to-market traction (150+ pre-launch signups)—while owning the product vision, customer discovery, MVP scope, UX/UI design, backlog prioritization, and iterative sprint delivery with our engineering team.

Previously, I worked across technology, analytics, and business transformation initiatives, contributing to 30+ projects and developing solutions that improved operational efficiency, streamlined workflows, and supported better business decisions. I bring together strategic thinking, analytical problem-solving, and entrepreneurial execution to turn ideas into meaningful outcomes.

I hold an **M.Sc. in Leadership in Digital Transformation** and am a winner of a university startup pitch competition, recognised for my entrepreneurial venture.`,
    superpowers: [
      "0-to-1 Product Building & 1-to-n Product Scaling",
      "Customer Discovery & Validation",
      "0-to-1 Data Architecture & Analytics Pipelines",
      "Data-Driven Prioritization (SQL, KPIs, Hypothesis Testing)",
      "Lean MVP Scoping & Product Roadmapping",
      "End-to-End UX/UI & Journey Architecture",
      "Cross-Functional Leadership",
      "Go-to-Market & Pre-Launch Audience Building"
    ],
    trackRecordMetrics: [
      {
        id: "m1",
        label: "Initiatives Delivered",
        value: "30+",
        context: "Cross-functional tech & analytics rollouts"
      },
      {
        id: "m2",
        label: "Pre-Launch Signups",
        value: "150+",
        context: "Early market validation ahead of MVP launch"
      },
      {
        id: "m3",
        label: "Operational Efficiency",
        value: "+20%",
        context: "Through automated reporting pipelines"
      },
      {
        id: "m4",
        label: "Pitch Competition Wins",
        value: "2",
        context: "GUS Network (2025) & GISMA (2024)"
      }
    ]
  },
  projects: [
    {
      id: "proj-traceamigo",
      title: "TraceAmigo: 0-to-1 TravelTech Platform",
      subtitle: "End-to-end product strategy, customer discovery, MVP definition, and GTM execution for an early-stage travel venture.",
      domain: "TravelTech & Consumer",
      role: "Founder & Product Lead",
      company: "TraceAmigo (Startup)",
      timeline: "01/2026 – Present",
      northStarMetric: "Pre-Launch Validation (150+ Signups & Pitch Wins)",
      coverImage: traceAmigoCover,
      tags: ["0-to-1 Product", "TravelTech", "Customer Discovery", "MVP Definition", "UX/UI Design", "GTM"],
      featured: true,
      metrics: [
        {
          id: "ta-1",
          label: "Discovery Interviews",
          value: "30+",
          context: "Conducted with global travellers & prototype testers"
        },
        {
          id: "ta-2",
          label: "Pre-Launch Signups",
          value: "150+",
          context: "Organic waitlist generated ahead of MVP"
        },
        {
          id: "ta-3",
          label: "Startup Pitch Wins",
          value: "2x",
          context: "GUS Network (2025) & GISMA (2024)"
        }
      ],
      caseStudy: {
        teamComposition: "1 Founder & Product Owner (myself), 2-person Engineering Squad",
        problemContext: `Independent and group travellers face acute itinerary fragmentation: juggling disparate booking platforms, static offline guides, social media saves, and messy chat threads. This creates pre-trip planning fatigue and in-trip scheduling friction.

TravelTech solutions in the market either cater strictly to corporate business itineraries or are bloated with sponsored recommendations that travellers do not trust.`,
        discoveryResearch: `To de-risk the product prior to writing code, I led a rigorous customer discovery initiative:
• Ran 30+ traveller interviews and interactive prototype walkthroughs across pre-build discovery and validation stages.
• Uncovered that 72% of travellers abandoned itinerary builders because manual entry was too tedious.
• Identified the core emotional desire: seamless collaborative itinerary sharing with flexible, real-time discovery.
• Translated recurring qualitative pain points into prioritized MVP requirements and iterative design modifications.`,
        strategicPrioritization: `Conducted comprehensive market and competitive analysis to map target traveler personas, feature differentiation, and defensible positioning:
• Evaluated feature trade-offs based on customer value, technical feasibility for a two-person dev team, and long-term retention.
• Scoped a focused Phase-1 MVP concentrating on friction-free itinerary creation, automated timeline sequencing, and social sharing.
• Intentionally deferred complex multi-party expense splitting and hotel affiliate booking engines to post-validation iterations.`,
        solutionExecution: `• Owned end-to-end UX/UI and product design: built wireframes, user journeys, interaction flows, and developer specifications in Figma.
• Established an agile delivery rhythm with the engineering team, shipping 2–3 feature modules a month from planning through release.
• Built the go-to-market and pre-launch marketing approach, crafting positioning and value propositions that secured 150+ pre-launch registrations ahead of launch.
• Formulated the product measurement framework, establishing tracking KPIs for activation, engagement, and retention.
• Pitched the product vision and business model to investors and startup juries, winning both the GUS Network International Startup Pitch (2025) and GISMA Startup Pitch (2024).`,
        resultsImpact: `• Delivered a launch-ready first-phase MVP in ~6 months on an accelerated lean timeline with a two-person engineering team.
• Built an organic pre-launch waitlist of 150+ high-intent travel beta users.
• Validated product positioning and investor appetite with 2 startup pitch competition victories.
• Created a repeatable discovery-to-delivery playbook for subsequent product releases.`,
        learningsRetrospective: `• Pre-Build Validation Saves Engineering Bandwidth: Conducting 30+ interviews before freezing the architecture prevented building 3 features that users explicitly said they wouldn't use.
• Clear Developer Specs Accelerate Velocity: Providing high-fidelity interactive Figma flows and explicit API expectations enabled our 2-person dev squad to ship the MVP with zero rework.`,
        artifacts: [
          {
            title: "TraceAmigo Phase-1 MVP PRD",
            type: "PRD",
            description: "Feature specs, user personas, API requirements, and MVP scope boundaries."
          },
          {
            title: "Traveller Journey & User Flow Map",
            type: "User Flow",
            description: "End-to-end journey from trip ideation to collaborative itinerary sharing."
          },
          {
            title: "Pre-Launch GTM & Audience Funnel",
            type: "Launch Checklist",
            description: "Waitlist acquisition strategy, conversion copy, and activation KPIs."
          }
        ]
      }
    },
    {
      id: "proj-routineai-datamart",
      title: "RoutineAI: Asset Data Mart Solution",
      subtitle: "0-to-1 enterprise Asset Management Data Mart architecture and automated ETL reporting pipelines scaled into a reusable B2B SaaS offering.",
      domain: "Data Architecture & B2B SaaS",
      role: "Project Manager - Product Development and Data Solutions",
      company: "RoutineAI (Startup)",
      timeline: "02/2022 – 06/2024",
      northStarMetric: "Operational Efficiency (+20%) & Automated SLA Delivery",
      coverImage: assetDataMartCover,
      tags: ["0-to-1 Data Architecture", "Asset Data Mart", "ETL Automation", "B2B SaaS", "SLAs & KPIs"],
      featured: true,
      metrics: [
        {
          id: "dm-1",
          label: "Operational Efficiency",
          value: "+20%",
          context: "Automated reporting & ETL pipelines"
        },
        {
          id: "dm-2",
          label: "Resource Optimization",
          value: "12 → 4",
          context: "Team utilization on key engagement"
        },
        {
          id: "dm-3",
          label: "Initiatives Delivered",
          value: "30+",
          context: "Cross-functional tech & analytics"
        }
      ],
      caseStudy: {
        teamComposition: "Project Manager - Product Development and Data Solutions leading Data Engineers, Analysts, and Client Stakeholders",
        problemContext: `Enterprise clients relied on fragmented asset tracking systems and manual spreadsheet reconciliation, creating high error rates, slow reporting cycles, and bespoke one-off engineering work for every account.

Without a unified data foundation, scaling analytics capabilities across additional client engagements required heavy manual service overhead and large delivery teams.`,
        discoveryResearch: `Conducted requirements-gathering workshops with client stakeholders and audited recurring operational workflows:
• Mapped common asset lifecycle entities, KPIs, and SLA reporting requirements shared across enterprise accounts.
• Identified repetitive manual reporting and transformation steps consuming substantial analyst bandwidth.
• Scoped how a standardized data mart could eliminate bespoke rework and unlock reusable B2B SaaS delivery.`,
        strategicPrioritization: `Prioritized building a 0-to-1 standardized Asset Management Data Mart architecture over maintaining custom per-client reporting scripts:
• Core Bet 1: Unified dimensional data mart schema supporting asset tracking, utilization, and lifecycle KPIs.
• Core Bet 2: Automated ETL and reporting pipelines with built-in SLA and data-quality monitoring.
• Core Bet 3: Lean delivery model enabling adaptation across multiple enterprise clients.`,
        solutionExecution: `• Gathered complex business requirements and translated them into a structured Asset Management Data Mart solution design and implementation plan.
• Built and automated end-to-end data pipelines and reporting workflows, removing manual operational bottlenecks.
• Coordinated cross-functional stakeholders, managing delivery risks, dependencies, SLAs, and KPIs across 30+ initiatives.
• Streamlined operational workflows on a key engagement, improving resource utilization from 12 to 4 team members.`,
        resultsImpact: `• Improved operational efficiency by over 20% through automated reporting workflows and data pipelines.
• Successfully adapted the bespoke client data mart into a reusable B2B SaaS offering for additional enterprise clients.
• Optimized engagement resource utilization from 12 team members down to 4 while maintaining strict SLA compliance.`,
        learningsRetrospective: `• Architect for Reusability Early: Modeling the Asset Data Mart around shared enterprise patterns turned a single-client engagement into a repeatable 1-to-n product offering.
• Automation Unlocks Leaner Squads: Replacing manual reporting scripts with monitored ETL pipelines freed engineering and analyst capacity for higher-value modeling.`,
        artifacts: [
          {
            title: "Asset Management Data Mart Solution Design",
            type: "Data Model",
            description: "0-to-1 dimensional schema, entity relationships, and asset lifecycle KPI definitions."
          },
          {
            title: "Automated ETL & Reporting Pipeline Spec",
            type: "PRD",
            description: "Data ingestion contracts, transformation rules, and automated SLA alerting."
          },
          {
            title: "SLA & Operational Efficiency Runbook",
            type: "Launch Checklist",
            description: "Monitoring criteria, dependency handoffs, and stakeholder reporting cadence."
          }
        ]
      }
    },
    {
      id: "proj-routineai-hierarchy",
      title: "RoutineAI: Product Hierarchy Structure Solution",
      subtitle: "Standardized multi-level product taxonomy, solution design, and forecasting-ready data foundation for enterprise B2B SaaS clients.",
      domain: "Data Architecture & B2B SaaS",
      role: "Project Manager - Product Development and Data Solutions",
      company: "RoutineAI (Startup)",
      timeline: "02/2022 – 06/2024",
      northStarMetric: "1-to-n Client Standardization & Forecasting Readiness",
      coverImage: productHierarchyCover,
      tags: ["Product Hierarchy", "Solution Design", "Forecasting", "B2B SaaS Scaling", "Team Scaling"],
      featured: true,
      metrics: [
        {
          id: "ph-1",
          label: "Initiatives Delivered",
          value: "30+",
          context: "End-to-end cross-functional delivery"
        },
        {
          id: "ph-2",
          label: "Analytics Team Scaled",
          value: "4 → 20+",
          context: "Recruited, trained & onboarded"
        },
        {
          id: "ph-3",
          label: "Solution Scalability",
          value: "1-to-n",
          context: "Adapted into reusable SaaS offering"
        }
      ],
      caseStudy: {
        teamComposition: "Project Manager - Product Development and Data Solutions scaling and leading a cross-functional analytics team (4 to 20+ members)",
        problemContext: `Enterprise clients maintained inconsistent, flat, or ad-hoc product catalogues across regions and business units. These fragmented classifications broke roll-up analytics, distorted executive KPIs, and prevented reliable demand forecasting.

Each new client engagement required painful manual SKU mapping before forecasting algorithms or dashboards could function.`,
        discoveryResearch: `Partnered with business stakeholders, operations leads, and data teams to analyze taxonomy gaps:
• Audited legacy product categories and identified conflicting hierarchy levels across client reporting units.
• Defined downstream requirements needed for a forecasting algorithm design to operate reliably across product tiers.
• Validated opportunities to generalize the hierarchy framework into a reusable B2B SaaS capability.`,
        strategicPrioritization: `Focused on establishing a clean, governed Product Hierarchy Structure as the foundational layer for analytics and forecasting:
• Priority 1 (P0): Multi-level Product Hierarchy Structure and classification governance rules.
• Priority 2 (P0): Integration with forecasting algorithm design so predictions aggregate accurately across tiers.
• Priority 3 (P1): Playbooks and onboarding documentation to scale delivery across a growing analytics team.`,
        solutionExecution: `• Gathered detailed business requirements and translated complex product-catalogue rules into a structured Product Hierarchy Structure solution design and implementation plan.
• Collaborated on forecasting algorithm design anchored on the standardized hierarchy tiers.
• Adapted successful client implementations beyond single engagements into reusable B2B SaaS offerings for additional clients.
• Led recruitment, training, and onboarding, scaling the analytics team from 4 to 20+ members to support multi-client expansion.`,
        resultsImpact: `• Delivered a standardized Product Hierarchy Structure powering accurate cross-tier analytics and forecasting readiness.
• Scaled the solution from an individual client engagement into a reusable B2B SaaS offering for new clients.
• Grew and enabled the analytics organization from 4 to 20+ members while delivering 30+ initiatives against business KPIs and SLAs.
• Recognized with the Empowerment Ambassador Award for mentorship and team enablement.`,
        learningsRetrospective: `• Taxonomy Is the Backbone of Forecasting: Without a rigorous Product Hierarchy Structure, downstream forecasting and executive reporting lose credibility.
• Structured Onboarding Scales Execution: Documenting solution design patterns enabled new team members to contribute effectively as the team grew 5x.`,
        artifacts: [
          {
            title: "Product Hierarchy Structure Blueprint",
            type: "Data Model",
            description: "Multi-tier taxonomy schema, attribute inheritance, and SKU mapping governance."
          },
          {
            title: "Forecasting Algorithm Design Spec",
            type: "PRD",
            description: "Requirements linking hierarchical product levels to demand forecasting inputs and validation KPIs."
          },
          {
            title: "B2B SaaS Adaptation & Onboarding Playbook",
            type: "Launch Checklist",
            description: "Reusable client rollout steps and training framework for scaling analytics squads."
          }
        ]
      }
    },
    {
      id: "proj-google-partner",
      title: "Enterprise Data Governance & Analytics Platform",
      subtitle: "Built operational reporting dashboards and data validation controls for Google's onsite stakeholder team.",
      domain: "Enterprise Data & Quality",
      role: "Data Analyst",
      company: "Vaco Binary Semantics (Partnering with Google)",
      timeline: "11/2018 – 01/2022",
      northStarMetric: "Error Rate Reduction (12–15% down to 5–8%)",
      coverImage: growthFunnelCover,
      tags: ["Data Quality", "Google Partnership", "Tableau", "SQL", "Process Improvement"],
      featured: true,
      metrics: [
        {
          id: "gp-1",
          label: "Error Rate Reduced",
          value: "5–8%",
          context: "Slashed from 12–15% baseline"
        },
        {
          id: "gp-2",
          label: "Partnership Cadence",
          value: "Weekly",
          context: "Syncs with Google onsite team"
        },
        {
          id: "gp-3",
          label: "Validation Coverage",
          value: "100%",
          context: "Automated checks on operational feeds"
        }
      ],
      caseStudy: {
        teamComposition: "Data Analyst partnering with Google's onsite team and cross-functional operational stakeholders",
        problemContext: `Operational teams handled large volumes of enterprise data with inconsistent manual validation checks. This resulted in an average monthly error rate of 12–15%, introducing delays in stakeholder decision-making and requiring frequent retrospective data corrections.`,
        discoveryResearch: `Analyzed operational data pipelines and tracked recurring error failure patterns:
• 65% of discrepancies stemmed from unvalidated manual spreadsheet transformations.
• Stakeholders spent substantial time clarifying report definitions due to inconsistent KPI documentation.`,
        strategicPrioritization: `Prioritized the development of centralized SQL validation scripts and interactive Tableau dashboards that automated anomaly detection before reports reached executive review.`,
        solutionExecution: `• Partnered weekly with Google's onsite stakeholder team, driving structured knowledge transfer, process documentation, and continuous process improvements.
• Designed and deployed automated validation workflows and interactive Tableau dashboards, translating raw operational data into actionable business insights.
• Standardized metric definitions and built comprehensive documentation to ensure auditability and compliance.`,
        resultsImpact: `• Reduced average monthly error rate from 12–15% to 5–8% through automated data validation and process controls.
• Accelerated executive stakeholder review cycles with real-time dashboards replacing static spreadsheets.
• Received commendations from Google onsite stakeholders for data integrity and reliability.`,
        learningsRetrospective: `• Shift-Left on Data Quality: Validating inputs at the source prevents exponential downstream debugging.
• Strong Stakeholder Partnerships Build Trust: Weekly alignment rituals ensured that dashboards evolved in lockstep with shifting business priorities.`,
        artifacts: [
          {
            title: "Data Quality Validation Protocol",
            type: "Launch Checklist",
            description: "Automated rule checks, threshold alerts, and exception handling SOP."
          },
          {
            title: "Executive Operational Dashboard Spec",
            type: "Wireframe",
            description: "Tableau interface design for multi-tier stakeholder KPIs."
          }
        ]
      }
    }
  ],
  experiences: [
    {
      id: "exp-traceamigo",
      company: "TraceAmigo (Startup)",
      role: "Founder | Product Owner",
      period: "01/2026 – Present",
      location: "Potsdam, Germany",
      highlights: [
        "Product Strategy & Roadmap: Own the strategy, roadmap and backlog of a zero-to-one TravelTech product, taking it from idea to a launch-ready MVP in about 6 months.",
        "User Research & Discovery: Ran 30+ traveler interviews and prototype tests to find the problems worth solving, then used the findings to narrow the scope to a traveler-first focus and build features around the needs users described.",
        "Requirements & Prioritisation: Wrote and prioritised MVP requirements and user stories for product-market-fit validation, and worked through refinement with engineers.",
        "KPIs & Early Traction: Defined activation, engagement and retention metrics to guide what to build next, and reached 150+ user registrations ahead of public launch.",
        "Process & UX Design: Turned user journeys and interaction flows into specifications that engineering could build from.",
        "Delivery & Execution: Shipped 2–3 feature modules a month, from planning through release, working with engineers."
      ]
    },
    {
      id: "exp-routineai",
      company: "RoutineAI (Startup)",
      role: "Project Manager – Product Development, Operations and Data Solutions",
      period: "02/2022 – 06/2024",
      location: "Noida, India",
      highlights: [
        "Prominent Clients: US (NetScout, Datamatics, Lumentum, Datavail, Lozier Corporation) and Europe (Bayer, Mahle, and more).",
        "Requirements & Solution Design: Translated business requirements into functional specifications and delivered them as technology and data products for enterprise clients.",
        "Productised Solutions: Productised successful client solutions into reusable offerings for broader deployment.",
        "Data Architecture: Designed the data architecture for product hierarchy, asset data mart, ERP implementation, data migration and forecasting solutions that supported reporting and business decisions.",
        "Reporting Automation: Automated reporting workflows and data pipelines, improving efficiency by 20%+ and reducing manual effort.",
        "Cross-Functional Delivery: Led 30+ technology and analytics initiatives across stakeholders, priorities, risks, SLAs and KPIs.",
        "Team & Resource Scaling: Scaled the analytics team from 4 to 20+ and restructured a key engagement team from 12 to 4."
      ]
    },
    {
      id: "exp-vaco",
      company: "Vaco Binary Semantics",
      role: "Data Analyst – Google India Private Ltd (Vendor Partner)",
      period: "11/2018 – 01/2022",
      location: "Gurugram, India",
      highlights: [
        "Data Cleaning & Quality: Cleaned large BigQuery datasets for 25+ clients, cutting monthly error rate from 12–15% to 5–8%.",
        "Management Reporting: Delivered management reports and dashboards, and partnered weekly with Google's team."
      ]
    }
  ],
  education: [
    {
      institution: "GISMA University of Applied Sciences",
      degree: "M.Sc., Leadership in Digital Transformation",
      period: "10/2024 – 12/2025",
      location: "Potsdam, Germany",
      focus: "Project Management, Product Strategy, Digital Innovation",
      thesis: "Neuromarketing applications in digital platforms and consumer decision-making."
    },
    {
      institution: "Simplilearn (EdTech)",
      degree: "Data Science Certification Program",
      period: "2020 – 2021",
      location: "Online / Global",
      focus: "Machine Learning, Predictive Modeling, Statistical Analysis"
    },
    {
      institution: "Amity University",
      degree: "B.Tech, Electrical and Electronics Engineering",
      period: "2012 – 2016",
      location: "Noida, India",
      focus: "Systems Engineering, Mathematical Analysis & Computation"
    }
  ],
  awards: [
    {
      title: "Winner – GUS Network International Startup Pitch",
      eventOrOrg: "Global University Systems (GUS) Network",
      date: "March 2025",
      description: "Pitched TraceAmigo product vision, market validation, and business model against international ventures."
    },
    {
      title: "Winner – GISMA Startup Pitch Competition",
      eventOrOrg: "GISMA University of Applied Sciences",
      date: "November 2024",
      description: "Awarded 1st place for 0-to-1 TravelTech product strategy and market opportunity."
    },
    {
      title: "Empowerment Ambassador Award",
      eventOrOrg: "RoutineAI",
      date: "2023",
      description: "Recognized for sustained leadership in mentorship, diversity & inclusion advocacy, and scaling the analytics team."
    }
  ],
  frameworks: [
    "0-to-1 Customer Discovery & 30+ Traveller Research",
    "Product Strategy, Market & Competitive Analysis",
    "MVP Definition & Feature Prioritization",
    "PRDs, User Stories & Backlog Management",
    "OKRs & KPI Definition (Activation, Engagement, Retention)",
    "UX/UI Design & User Journey Mapping (Figma)",
    "Agile & Scrum Delivery Leadership (Eng Squads)",
    "Go-to-Market Strategy & Pre-Launch Marketing"
  ],
  tools: [
    {
      category: "Product & Delivery",
      items: ["Jira", "Confluence", "Figma", "Agile / Scrum", "UAT & Release Testing"]
    },
    {
      category: "Analytics & Data",
      items: ["SQL", "BigQuery", "Tableau", "ETL & Data Pipelines", "Reporting Automation"]
    },
    {
      category: "AI & Modern Workflows",
      items: ["AI-Assisted Workflows (Antigravity, Grok)", "LLM Tools & Prompt Engineering"]
    },
    {
      category: "Business & Communication",
      items: ["Excel", "PowerPoint", "Data Storytelling", "English (C1)"]
    }
  ]
};
