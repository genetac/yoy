import type { MockupConfig } from "./businessTypes";
import type { Tier } from "./servicePackages";

export type ProductExample = MockupConfig & {
  exampleName: string;
  exampleDescription: string;
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  examples: ProductExample[];
};

export type ProductTierCategory = {
  letter: string;
  name: string;
  priceRange: string;
  tagline: string;
  examplesText: string;
  color: string;
  accentColor: string;
  icon: string;
  tier: Tier;
  products: ProductType[];
};

export type ProductSection = {
  id: string;
  name: string;
  priceRange: string;
  tagline: string;
  examplesText: string;
  color: string;
  accentColor: string;
  icon: string;
  tier: Tier;
  products: ProductType[];
};

function mkExample(
  tier: Tier,
  label: string,
  tagline: string,
  features: string[],
  theme: MockupConfig["theme"],
  heroImage: string,
  layout: MockupConfig["layout"],
  exampleName: string,
  exampleDescription: string,
  extras?: Partial<Pick<MockupConfig, "showNewsletter" | "showTestimonials" | "showStats" | "showCTA">>
): ProductExample {
  return {
    tier,
    label,
    tagline,
    features,
    theme,
    heroImage,
    layout,
    showNewsletter: extras?.showNewsletter ?? (tier === "high" || tier === "enterprise"),
    showTestimonials: extras?.showTestimonials ?? (tier !== "low"),
    showStats: extras?.showStats ?? (tier === "high" || tier === "enterprise"),
    showCTA: true,
    exampleName,
    exampleDescription,
  };
}

const T = {
  light: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#fafafa", surface: "#ffffff", border: "#e5e5e5", text: "#171717", muted: "#737373",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#ffffff",
  }),
  lightBlue: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#f0f9ff", surface: "#ffffff", border: "#e0f2fe", text: "#0c4a6e", muted: "#0369a1",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#ffffff",
  }),
  dark: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#0a0a0a", surface: "#171717", border: "#262626", text: "#fafafa", muted: "#a3a3a3",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#0a0a0a",
  }),
  darkNavy: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#0a0f1c", surface: "#111827", border: "#1f2937", text: "#f1f5f9", muted: "#94a3b8",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#0a0f1c",
  }),
  darkGreen: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#052e16", surface: "#064e3b", border: "#065f46", text: "#f0fdf4", muted: "#86efac",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#052e16",
  }),
  darkViolet: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#1e1b4b", surface: "#312e81", border: "#4c1d95", text: "#f5f3ff", muted: "#c4b5fd",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#1e1b4b",
  }),
  warmLight: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#fefce8", surface: "#ffffff", border: "#fef9c3", text: "#422006", muted: "#a16207",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#ffffff",
  }),
  roseLight: (accent: string, accentSoft: string): MockupConfig["theme"] => ({
    bg: "#fdf2f8", surface: "#ffffff", border: "#fbcfe8", text: "#831843", muted: "#9d174d",
    accent, accentSoft, font: "Inter, sans-serif", nav: "#ffffff",
  }),
};

export const productTierCategories: ProductTierCategory[] = [
  {
    letter: "A",
    name: "Microproducts",
    priceRange: "$3 – $19",
    tagline: "Small, focused digital products that solve one problem well.",
    examplesText: "Landing templates, calculators, resume kits, checklists",
    color: "amber",
    accentColor: "#f59e0b",
    icon: "Zap",
    tier: "low",
    products: [
      {
        id: "landing-template",
        name: "Landing Page Templates",
        description: "One-page templates for launches, campaigns, and product reveals.",
        icon: "FileLayout",
        examples: [
          mkExample("low", "LaunchPad", "Get your idea online in minutes.", ["One-page layout", "Contact form", "Mobile responsive"], T.light("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "SaaS Launch Page", "A clean one-pager for a software product launch with hero, features, and signup."),
          mkExample("low", "CampaignKit", "Promote your next big push.", ["Countdown timer", "Email capture", "Social proof strip"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/6956450/pexels-photo-6956450.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Campaign Teaser", "A pre-launch teaser page with countdown and email list signup."),
          mkExample("low", "ProductReveal", "Show the world what you built.", ["Product hero", "Feature bullets", "Buy button"], T.light("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Product Reveal", "A single-product reveal page with large imagery and buy link."),
          mkExample("low", "EventPage", "One night, one page.", ["Event details", "RSVP form", "Map embed"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Event Landing", "A one-page event promotion with RSVP and location map."),
        ],
      },
      {
        id: "calculator",
        name: "Calculator Tools",
        description: "Interactive calculators for finance, health, pricing, and more.",
        icon: "Calculator",
        examples: [
          mkExample("low", "MortgageCalc", "Know your monthly payment.", ["Principal + interest", "Tax + insurance", "Down payment slider"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/8293750/pexels-photo-8293750.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Mortgage Calculator", "Monthly payment calculator with down payment and rate sliders."),
          mkExample("low", "ROICalc", "Will this investment pay off?", ["Initial cost", "Expected return", "Time horizon"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/669454/pexels-photo-669454.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "ROI Calculator", "Return on investment calculator with timeline visualization."),
          mkExample("low", "PriceQuote", "Instant pricing for clients.", ["Service selector", "Quantity tiers", "PDF export"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Pricing Calculator", "A service pricing tool that generates instant quotes for clients."),
          mkExample("low", "CalorieTrack", "Hit your daily target.", ["Food database", "Macro breakdown", "Progress chart"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Calorie Calculator", "A daily calorie and macro calculator with food search."),
        ],
      },
      {
        id: "resume-kit",
        name: "Resume Kits",
        description: "Downloadable resume templates in multiple styles and formats.",
        icon: "FileText",
        examples: [
          mkExample("low", "CleanResume", "Minimal and professional.", ["1-page design", "ATS-friendly", "DOCX + PDF"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/590044/pexels-photo-590044.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Minimal Resume", "A clean single-column resume for corporate roles."),
          mkExample("low", "CreativeResume", "Stand out with color.", ["Two-column layout", "Color accents", "Skill bars"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Creative Resume", "A two-column resume with color accents for design roles."),
          mkExample("low", "ExecutiveResume", "For senior leadership.", ["Classic serif", "Leadership focus", "Achievement format"], T.light("#1e40af", "#dbeafe"), "https://images.pexels.com/photos/5989943/pexels-photo-5989943.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Executive Resume", "A traditional serif resume for C-suite and executive positions."),
          mkExample("low", "TechResume", "Built for engineers.", ["Skills matrix", "Project highlights", "GitHub link section"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/270238/pexels-photo-270238.png?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Tech Resume", "A resume optimized for software engineers with skills matrix."),
        ],
      },
      {
        id: "checklist",
        name: "Checklist Tools",
        description: "Interactive checklists for processes, launches, and daily routines.",
        icon: "CheckSquare",
        examples: [
          mkExample("low", "LaunchList", "Don't miss a step.", ["Pre-launch tasks", "Progress tracking", "Export PDF"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/1226398/pexels-photo-1226398.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Product Launch Checklist", "A pre-launch task list covering marketing, tech, and ops."),
          mkExample("low", "DailyRoutine", "Build better habits.", ["Morning + evening", "Streak tracking", "Reminders"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/131979/pexels-photo-131979.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Daily Routine Checklist", "A morning and evening routine tracker with streaks."),
          mkExample("low", "TravelPrep", "Never forget your passport.", ["Pre-trip tasks", "Packing list", "Documents check"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/35719566/pexels-photo-35719566.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Travel Prep Checklist", "A pre-departure checklist with packing and documents."),
          mkExample("low", "OnboardingList", "Get new hires set up.", ["IT provisioning", "HR forms", "Team intros"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/5861183/pexels-photo-5861183.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Employee Onboarding", "A new hire onboarding checklist for HR teams."),
        ],
      },
    ],
  },

  {
    letter: "B",
    name: "Practical Digital Products",
    priceRange: "$19 – $79",
    tagline: "Useful toolkits and systems that help people work faster.",
    examplesText: "Template packs, toolkits, Notion systems, assessment tools",
    color: "amber",
    accentColor: "#f59e0b",
    icon: "Wrench",
    tier: "low",
    products: [
      {
        id: "template-pack",
        name: "Template Packs",
        description: "Bundles of document, email, and presentation templates.",
        icon: "Files",
        examples: [
          mkExample("low", "EmailPack", "50 emails ready to send.", ["Welcome series", "Cold outreach", "Follow-up templates"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Email Template Pack", "50 copy-and-paste email templates for marketing and sales."),
          mkExample("low", "ProposalPack", "Close faster.", ["Service proposals", "Pricing tables", "Terms + conditions"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/4939604/pexels-photo-4939604.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Proposal Template Pack", "Client proposal templates with pricing and scope sections."),
          mkExample("low", "SlidePack", "Present with confidence.", ["20 slide layouts", "Pitch deck", "Report slides"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/4068294/pexels-photo-4068294.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Presentation Template Pack", "20 slide layouts for pitches, reports, and webinars."),
          mkExample("low", "ContractPack", "Legal-ready documents.", ["Service agreements", "NDAs", "SOW templates"], T.light("#1e40af", "#dbeafe"), "https://images.pexels.com/photos/4174742/pexels-photo-4174742.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Contract Template Pack", "Standardized legal contract templates for freelancers and agencies."),
        ],
      },
      {
        id: "toolkit",
        name: "Toolkits",
        description: "Collections of tools and scripts for specific workflows.",
        icon: "Tool",
        examples: [
          mkExample("low", "SEOToolkit", "Rank higher.", ["Keyword checker", "Meta generator", "Sitemap tool"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "SEO Toolkit", "A bundle of SEO tools for keyword research and on-page optimization."),
          mkExample("low", "DesignToolkit", "Ship faster.", ["Color generator", "Font pairer", "Grid tool"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Designer's Toolkit", "Utility tools for color, typography, and layout generation."),
          mkExample("low", "DevToolkit", "Code less, ship more.", ["Snippet library", "Regex tester", "JSON formatter"], T.dark("#10b981", "#064e3b"), "https://images.pexels.com/photos/6424583/pexels-photo-6424583.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Developer's Toolkit", "A collection of dev utilities: snippets, formatters, and testers."),
          mkExample("low", "ContentToolkit", "Write better.", ["Headline analyzer", "Outline generator", "Readability checker"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/34803986/pexels-photo-34803986.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Content Writer's Toolkit", "Tools for headline scoring, outlining, and readability checks."),
        ],
      },
      {
        id: "notion-system",
        name: "Notion Systems",
        description: "Pre-built Notion workspaces with databases and dashboards.",
        icon: "LayoutGrid",
        examples: [
          mkExample("low", "ProjectOS", "Manage every project.", ["Task database", "Sprint board", "Timeline view"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/10567169/pexels-photo-10567169.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Project Management OS", "A Notion workspace for tracking projects, sprints, and timelines."),
          mkExample("low", "SalesOS", "Close more deals.", ["CRM database", "Pipeline board", "Meeting notes"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/6177596/pexels-photo-6177596.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Sales CRM System", "A Notion-based CRM with pipeline, contacts, and deal tracking."),
          mkExample("low", "ContentOS", "Plan, write, publish.", ["Editorial calendar", "Content database", "Idea backlog"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/7504756/pexels-photo-7504756.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Content Planning System", "An editorial calendar and content database for creators."),
          mkExample("low", "LifeOS", "One workspace for everything.", ["Habit tracker", "Reading list", "Budget tracker"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/8472561/pexels-photo-8472561.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Personal Life OS", "An all-in-one Notion dashboard for habits, goals, and finances."),
        ],
      },
      {
        id: "assessment-tool",
        name: "Assessment Tools",
        description: "Interactive quizzes and assessments that score and report.",
        icon: "ClipboardCheck",
        examples: [
          mkExample("low", "SkillQuiz", "What's your level?", ["10 questions", "Score result", "Skill breakdown"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/6684209/pexels-photo-6684209.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Skill Assessment Quiz", "A technical skill level assessment with scored results."),
          mkExample("low", "PersonalityTest", "Discover your type.", ["Scenario questions", "Type result", "Strengths report"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/31115182/pexels-photo-31115182.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Personality Assessment", "A personality type quiz with strengths and traits report."),
          mkExample("low", "BizHealth", "How's your business?", ["20 questions", "Health score", "Action items"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/6683673/pexels-photo-6683673.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Business Health Check", "A business readiness assessment with scored recommendations."),
          mkExample("low", "ReadinessQuiz", "Are you ready to launch?", ["Pre-launch checklist quiz", "Readiness score", "Gap analysis"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/6683441/pexels-photo-6683441.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "basic", "Launch Readiness Quiz", "An interactive quiz that scores your product launch readiness."),
        ],
      },
    ],
  },
  {
    letter: "C",
    name: "Premium Digital Products",
    priceRange: "$79 – $299",
    tagline: "Polished, production-ready products with custom design.",
    examplesText: "Niche website kits, dashboards, design systems, training products",
    color: "sky",
    accentColor: "#0ea5e9",
    icon: "Sparkles",
    tier: "mid",
    products: [
      {
        id: "website-kit",
        name: "Niche Website Kits",
        description: "Complete website kits tailored to a specific industry.",
        icon: "Globe",
        examples: [
          mkExample("mid", "DentalKit", "A full site for dental practices.", ["5 pages", "Appointment form", "Service pages", "Insurance info"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/6627651/pexels-photo-6627651.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Dental Practice Kit", "A website kit for dental clinics with appointment booking."),
          mkExample("mid", "GymKit", "Get members online.", ["Class schedule", "Membership tiers", "Trainer profiles", "Progress gallery"], T.dark("#84cc16", "#365314"), "https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Gym & Fitness Kit", "A website kit for gyms with class schedules and membership tiers."),
          mkExample("mid", "LawFirmKit", "Professional and trustworthy.", ["Practice areas", "Attorney bios", "Case results", "Consultation form"], T.light("#1e40af", "#dbeafe"), "https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Law Firm Kit", "A website kit for law firms with practice areas and intake forms."),
          mkExample("mid", "RestaurantKit", "Hungry visitors become customers.", ["Full menu", "Reservation widget", "Photo gallery", "Events page"], T.warmLight("#b45309", "#fef3c7"), "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Restaurant Kit", "A website kit for restaurants with menu and reservations."),
        ],
      },
      {
        id: "dashboard",
        name: "Dashboard Kits",
        description: "Data dashboards with charts, filters, and export capabilities.",
        icon: "LayoutDashboard",
        examples: [
          mkExample("mid", "SalesDash", "Track revenue in real time.", ["Revenue charts", "Deal pipeline", "Rep leaderboard", "Export PDF"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/3782889/pexels-photo-3782889.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Sales Dashboard", "A revenue and pipeline dashboard for sales teams."),
          mkExample("mid", "FinanceDash", "See where the money goes.", ["P&L charts", "Cash flow", "Budget vs actual", "Category breakdown"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Finance Dashboard", "A financial overview dashboard with P&L and cash flow."),
          mkExample("mid", "MarketingDash", "Know what's working.", ["Campaign performance", "Channel ROI", "Funnel visualization", "Goal tracking"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Marketing Dashboard", "A marketing analytics dashboard with channel and funnel data."),
          mkExample("mid", "OpsDash", "Keep things running.", ["Uptime monitors", "Error rates", "Task queue", "Team workload"], T.dark("#0ea5e9", "#0c4a6e"), "https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Operations Dashboard", "An ops monitoring dashboard with uptime and error tracking."),
        ],
      },
      {
        id: "design-system",
        name: "Design Systems",
        description: "Component libraries with tokens, docs, and Storybook.",
        icon: "Palette",
        examples: [
          mkExample("mid", "WebDesignKit", "For web products.", ["Color tokens", "Typography scale", "40+ components", "Storybook docs"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Web Component Library", "A web-focused design system with 40+ React components."),
          mkExample("mid", "MobileDesignKit", "For mobile apps.", ["iOS + Android tokens", "Touch-optimized components", "Dark mode", "Figma sync"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Mobile Design System", "A mobile-first component library with iOS and Android tokens."),
          mkExample("mid", "BrandKit", "Keep brands consistent.", ["Logo system", "Color palette", "Typography rules", "Usage guidelines"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/3782889/pexels-photo-3782889.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Brand Guidelines Kit", "A brand identity system with logo, color, and typography rules."),
          mkExample("mid", "DashboardKit", "For data products.", ["Chart components", "Data table patterns", "KPI cards", "Filter controls"], T.dark("#0ea5e9", "#0c4a6e"), "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Dashboard Component Kit", "A design system specialized for data dashboards and analytics UI."),
        ],
      },
      {
        id: "training-product",
        name: "Training Products",
        description: "Interactive learning modules with quizzes and certificates.",
        icon: "GraduationCap",
        examples: [
          mkExample("mid", "CodeCourse", "Learn to build.", ["5 video lessons", "Code exercises", "Quiz per lesson", "Certificate"], T.dark("#10b981", "#064e3b"), "https://images.pexels.com/photos/6424583/pexels-photo-6424583.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Coding Bootcamp", "A 5-lesson programming course with exercises and certificate."),
          mkExample("mid", "MarketingCourse", "Master growth.", ["Video lessons", "Templates", "Case studies", "Progress tracking"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Marketing Course", "A digital marketing training with templates and case studies."),
          mkExample("mid", "DesignCourse", "Create beautiful work.", ["Design tutorials", "Figma exercises", "Portfolio project", "Feedback system"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Design Fundamentals", "A design training with Figma exercises and portfolio project."),
          mkExample("mid", "OnboardingCourse", "Get new hires up to speed.", ["Company modules", "Policy quizzes", "Role-specific tracks", "Completion tracking"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "standard", "Employee Onboarding Course", "An onboarding training with policy quizzes and role tracks."),
        ],
      },
    ],
  },
  {
    letter: "D",
    name: "Professional Tools",
    priceRange: "$299 – $1,500+",
    tagline: "Business-grade tools with auth, database, and admin panel.",
    examplesText: "Appointment systems, client portals, inventory dashboards, CRM packages",
    color: "emerald",
    accentColor: "#10b981",
    icon: "Briefcase",
    tier: "high",
    products: [
      {
        id: "appointment-system",
        name: "Appointment Systems",
        description: "Online booking with calendar sync and automated reminders.",
        icon: "CalendarClock",
        examples: [
          mkExample("high", "SalonBooker", "Chairs filled, every day.", ["Service menu", "Stylist selection", "SMS reminders", "Deposit payments"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Salon Booking System", "A booking platform for hair salons with stylist selection and deposits."),
          mkExample("high", "ClinicBooker", "Patients scheduled seamlessly.", ["Provider directory", "Insurance check", "Telehealth option", "Waitlist management"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/6129444/pexels-photo-6129444.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Medical Clinic Booking", "A patient scheduling system with insurance verification and telehealth."),
          mkExample("high", "GymBooker", "Classes booked in seconds.", ["Class schedule", "Capacity management", "Waitlist", "Membership sync"], T.dark("#84cc16", "#365314"), "https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Gym Class Booking", "A fitness class booking system with capacity and waitlist management."),
          mkExample("high", "ConsultBooker", "Consultations, automated.", ["Service tiers", "Calendar sync", "Intake forms", "Payment on booking"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/7433840/pexels-photo-7433840.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Consultant Booking", "A booking system for consultants with intake forms and pre-payment."),
        ],
      },
      {
        id: "client-portal",
        name: "Client Portals",
        description: "Secure portals for document sharing and client communication.",
        icon: "KeyRound",
        examples: [
          mkExample("high", "AccountingPortal", "Clients see their numbers.", ["Document upload", "Tax deadline tracker", "Secure messaging", "Invoice view"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/7680744/pexels-photo-7680744.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Accounting Client Portal", "A portal for accounting firms to share documents and track deadlines."),
          mkExample("high", "LegalPortal", "Case files, secured.", ["Case documents", "Hearing dates", "Secure messaging", "E-signature"], T.light("#1e40af", "#dbeafe"), "https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Law Firm Client Portal", "A secure portal for law firms with case files and e-signature."),
          mkExample("high", "AgencyPortal", "Projects on track.", ["Project status", "File delivery", "Approval workflow", "Time tracking"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Agency Client Portal", "A portal for creative agencies with approvals and file delivery."),
          mkExample("high", "TherapyPortal", "Private and compliant.", ["Session scheduling", "Secure notes", "Resource library", "HIPAA compliance"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/6129444/pexels-photo-6129444.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Therapy Client Portal", "A HIPAA-compliant portal for therapists with scheduling and notes."),
        ],
      },
      {
        id: "inventory-dashboard",
        name: "Inventory Dashboards",
        description: "Real-time stock tracking with alerts and reporting.",
        icon: "Boxes",
        examples: [
          mkExample("high", "RetailInventory", "Stock on the shelves.", ["Product tracking", "Low-stock alerts", "Supplier orders", "Sales sync"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/5650016/pexels-photo-5650016.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Retail Inventory Dashboard", "A stock management dashboard for retail stores with supplier ordering."),
          mkExample("high", "WarehouseInventory", "Everything in its place.", ["Multi-location", "Barcode scanning", "Pick + pack", "Receiving logs"], T.dark("#f97316", "#7c2d12"), "https://images.pexels.com/photos/4464826/pexels-photo-4464826.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Warehouse Dashboard", "A multi-location warehouse inventory system with barcode scanning."),
          mkExample("high", "EcomInventory", "Synced across channels.", ["Multi-channel sync", "Variant tracking", "Demand alerts", "FBA integration"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/4464826/pexels-photo-4464826.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "E-commerce Inventory", "An inventory dashboard syncing across Shopify, Amazon, and wholesale."),
          mkExample("high", "FoodInventory", "Fresh stock, zero waste.", ["Expiry tracking", "Recipe costing", "Supplier comparison", "Waste logging"], T.warmLight("#10b981", "#d1fae5"), "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Food Service Inventory", "A kitchen inventory system with expiry tracking and recipe costing."),
        ],
      },
      {
        id: "crm-package",
        name: "CRM Packages",
        description: "Contact management with pipeline, tasks, and communication log.",
        icon: "Users",
        examples: [
          mkExample("high", "SalesCRM", "Close more, track everything.", ["Pipeline board", "Deal stages", "Email sync", "Activity log"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Sales CRM", "A sales-focused CRM with pipeline board and email integration."),
          mkExample("high", "RealEstateCRM", "Listings and leads.", ["Property database", "Buyer matching", "Showing scheduler", "Offer tracking"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Real Estate CRM", "A CRM for real estate agents with property matching and showings."),
          mkExample("high", "AgencyCRM", "Clients and projects together.", ["Client database", "Project linking", "Retainer tracking", "Time billing"], T.light("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Agency CRM", "A CRM for agencies combining client management with project billing."),
          mkExample("high", "ContractorCRM", "Jobs and quotes, organized.", ["Job tracking", "Quote builder", "Crew scheduling", "Invoice generation"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/5215270/pexels-photo-5215270.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Contractor CRM", "A CRM for trades contractors with quotes, crews, and invoicing."),
        ],
      },
    ],
  },
  {
    letter: "E",
    name: "Premium & Enterprise",
    priceRange: "$1,500 – $25,000+",
    tagline: "Custom platforms, marketplaces, and multi-tenant systems.",
    examplesText: "Custom SaaS platforms, marketplaces, multi-tenant apps, enterprise systems",
    color: "violet",
    accentColor: "#8b5cf6",
    icon: "Building2",
    tier: "enterprise",
    products: [
      {
        id: "custom-saas",
        name: "Custom SaaS Platforms",
        description: "Bespoke SaaS applications built from scratch.",
        icon: "Layers",
        examples: [
          mkExample("enterprise", "AccountingSaaS", "Full- ledger accounting.", ["Double-entry ledger", "Reconciliation", "Financial reports", "Multi-entity"], T.darkNavy("#10b981", "#064e3b"), "https://images.pexels.com/photos/7680744/pexels-photo-7680744.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Accounting SaaS Platform", "A full-featured accounting platform with multi-entity support."),
          mkExample("enterprise", "HRPlatform", "People operations, automated.", ["Employee database", "Payroll", "Benefits admin", "Performance reviews"], T.darkViolet("#8b5cf6", "#4c1d95"), "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "HR Management Platform", "An enterprise HR platform with payroll, benefits, and reviews."),
          mkExample("enterprise", "LegalTechSaaS", "Matters, automated.", ["Case management", "Document automation", "Time + billing", "Court integrations"], T.darkNavy("#1e40af", "#1e3a8a"), "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Legal Tech Platform", "A legal practice management platform with document automation."),
          mkExample("enterprise", "EdTechSaaS", "Learning at scale.", ["Course platform", "Student CRM", "Assessments", "Certifications"], T.dark("#0ea5e9", "#0c4a6e"), "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "EdTech Platform", "An enterprise learning platform with certifications and student CRM."),
        ],
      },
      {
        id: "marketplace",
        name: "Marketplace Platforms",
        description: "Two-sided marketplaces connecting buyers and sellers.",
        icon: "Store",
        examples: [
          mkExample("enterprise", "ServiceMarket", "Find the right pro.", ["Provider profiles", "Booking + payment", "Reviews + ratings", "Dispute resolution"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Services Marketplace", "A services marketplace with provider profiles and escrow payments."),
          mkExample("enterprise", "ProductMarket", "Multi-vendor commerce.", ["Seller onboarding", "Commission engine", "Search + filters", "Seller analytics"], T.dark("#f97316", "#7c2d12"), "https://images.pexels.com/photos/4464826/pexels-photo-4464826.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Product Marketplace", "A multi-vendor product marketplace with commission and analytics."),
          mkExample("enterprise", "RentalMarket", "Rent anything.", ["Listing management", "Availability calendar", "Damage deposits", "Insurance integration"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Rental Marketplace", "A peer-to-peer rental marketplace with insurance and deposits."),
          mkExample("enterprise", "B2BMarket", "Wholesale, connected.", ["Bulk ordering", "Credit terms", "Vendor management", "ERP sync"], T.darkNavy("#8b5cf6", "#4c1d95"), "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "B2B Wholesale Marketplace", "A B2B wholesale marketplace with credit terms and ERP integration."),
        ],
      },
      {
        id: "multi-tenant-app",
        name: "Multi-Tenant Apps",
        description: "Platforms where each organization gets its own workspace.",
        icon: "Building2",
        examples: [
          mkExample("enterprise", "AgencyPlatform", "Each client, isolated.", ["Per-client workspaces", "White-label branding", "Usage metering", "Reseller billing"], T.darkViolet("#8b5cf6", "#4c1d95"), "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Agency Multi-Tenant Platform", "A white-label platform for agencies to serve multiple clients."),
          mkExample("enterprise", "FranchisePlatform", "Each location, connected.", ["Location dashboards", "Brand compliance", "Royalty tracking", "Performance benchmarking"], T.darkNavy("#0ea5e9", "#0c4a6e"), "https://images.pexels.com/photos/14011664/pexels-photo-14011664.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Franchise Management Platform", "A multi-tenant platform for franchise operations and compliance."),
          mkExample("enterprise", "SchoolPlatform", "Every classroom, managed.", ["School workspaces", "District dashboard", "Student data", "Parent portal"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/8617949/pexels-photo-8617949.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "School District Platform", "A multi-tenant education platform for school districts."),
          mkExample("enterprise", "PropertyPlatform", "Each building, optimized.", ["Property workspaces", "Tenant portal", "Maintenance tracking", "Financial reporting"], T.dark("#f59e0b", "#78350f"), "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Property Management Platform", "A multi-tenant platform for property management companies."),
        ],
      },
      {
        id: "enterprise-system",
        name: "Enterprise Systems",
        description: "Large-scale internal systems for operations, HR, or logistics.",
        icon: "Server",
        examples: [
          mkExample("enterprise", "ERPSystem", "Run the whole operation.", ["Inventory + procurement", "HR + payroll", "Accounting", "CRM integration"], T.darkNavy("#0ea5e9", "#0c4a6e"), "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "ERP System", "An enterprise resource planning system integrating all operations."),
          mkExample("enterprise", "LogisticsSystem", "Move things efficiently.", ["Route optimization", "Fleet tracking", "Delivery scheduling", "Customs docs"], T.dark("#f97316", "#7c2d12"), "https://images.pexels.com/photos/4276427/pexels-photo-4276427.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Logistics Management System", "A logistics platform with route optimization and fleet tracking."),
          mkExample("enterprise", "HealthcareSystem", "Patient care, coordinated.", ["EHR integration", "Appointment network", "Billing + claims", "Telehealth"], T.darkGreen("#06b6d4", "#164e63"), "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Healthcare Management System", "An enterprise healthcare system with EHR and telehealth."),
          mkExample("enterprise", "GovernmentSystem", "Public services, modernized.", ["Citizen portal", "Case management", "Document workflows", "Compliance + audit"], T.darkNavy("#1e40af", "#1e3a8a"), "https://images.pexels.com/photos/7433840/pexels-photo-7433840.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Government Services System", "A government case management and citizen services platform."),
        ],
      },
    ],
  },
];

export const subscriptionSection: ProductSection = {
  id: "subscriptions",
  name: "Subscription Products",
  priceRange: "$9 – $199/mo",
  tagline: "SaaS products with recurring billing and user accounts.",
  examplesText: "SaaS tools, monitoring dashboards, booking systems, research platforms",
  color: "emerald",
  accentColor: "#10b981",
  icon: "Repeat",
  tier: "high",
  products: [
      {
        id: "saas-tool",
        name: "SaaS Tools",
        description: "Web-based tools with accounts, billing, and dashboards.",
        icon: "AppWindow",
        examples: [
          mkExample("high", "InvoicingSaaS", "Get paid on time.", ["Invoice builder", "Recurring billing", "Payment tracking", "Client portal"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Invoicing SaaS", "A subscription invoicing tool with recurring billing and payment tracking."),
          mkExample("high", "ProjectSaaS", "Teams in sync.", ["Kanban + list views", "Time tracking", "File sharing", "Team chat"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Project Management SaaS", "A team project management tool with time tracking and collaboration."),
          mkExample("high", "SocialSaaS", "Schedule and analyze.", ["Post scheduler", "Analytics", "Multi-platform", "Content calendar"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Social Media SaaS", "A social media scheduling and analytics platform."),
          mkExample("high", "EmailSaaS", "Campaigns that convert.", ["Email builder", "Automation flows", "A/B testing", "Deliverability analytics"], T.light("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/4939604/pexels-photo-4939604.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Email Marketing SaaS", "An email marketing platform with automation and A/B testing."),
        ],
      },
      {
        id: "monitoring-dashboard",
        name: "Monitoring Dashboards",
        description: "Real-time monitoring with alerts and incident management.",
        icon: "Activity",
        examples: [
          mkExample("high", "UptimeMonitor", "Know before users do.", ["Uptime checks", "Status page", "Slack + email alerts", "Response time graph"], T.dark("#10b981", "#064e3b"), "https://images.pexels.com/photos/17489151/pexels-photo-17489151.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Website Uptime Monitor", "A uptime monitoring service with public status pages and alerts."),
          mkExample("high", "AppMonitor", "Catch errors in production.", ["Error tracking", "Performance metrics", "Release tracking", "Stack traces"], T.darkNavy("#0ea5e9", "#0c4a6e"), "https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Application Monitor", "An app performance and error monitoring platform."),
          mkExample("high", "ServerMonitor", "Infrastructure health.", ["CPU + memory", "Disk usage", "Network traffic", "Alert policies"], T.dark("#f97316", "#7c2d12"), "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Server Monitor", "A server infrastructure monitoring dashboard with alerting."),
          mkExample("high", "SecurityMonitor", "Threats detected.", ["Login anomalies", "Threat feed", "Vulnerability scan", "Audit log"], T.darkNavy("#ef4444", "#7f1d1d"), "https://images.pexels.com/photos/6077091/pexels-photo-6077091.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Security Monitor", "A security monitoring platform with anomaly detection and audit logs."),
        ],
      },
      {
        id: "booking-system",
        name: "Booking Systems",
        description: "Recurring booking platforms for classes, rooms, and equipment.",
        icon: "CalendarCheck",
        examples: [
          mkExample("high", "ClassBooking", "Fill every class.", ["Recurring slots", "Capacity limits", "Membership tiers", "Waitlist"], T.dark("#84cc16", "#365314"), "https://images.pexels.com/photos/3888405/pexels-photo-3888405.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Fitness Class Booking", "A recurring class booking platform with membership and waitlist."),
          mkExample("high", "RoomBooking", "Meeting rooms, managed.", ["Room directory", "Conflict detection", "Recurrence", "Check-in"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Meeting Room Booking", "An office room booking system with conflict detection and check-in."),
          mkExample("high", "EquipmentBooking", "Shared gear, tracked.", ["Equipment catalog", "Availability calendar", "Deposit system", "Return tracking"], T.warmLight("#f59e0b", "#fef3c7"), "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Equipment Rental Booking", "A booking system for shared equipment with deposits and returns."),
          mkExample("high", "CoworkingBooking", "Desks and offices on demand.", ["Hot desk booking", "Private office rental", "Day pass system", "Member portal"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Coworking Space Booking", "A coworking booking platform for desks, offices, and day passes."),
        ],
      },
      {
        id: "research-platform",
        name: "Research Platforms",
        description: "Platforms for surveys, data collection, and analysis.",
        icon: "Microscope",
        examples: [
          mkExample("high", "SurveyPlatform", "Ask, collect, analyze.", ["Survey builder", "Response collection", "Cross-tabs", "Export"], T.lightBlue("#0ea5e9", "#e0f2fe"), "https://images.pexels.com/photos/6684209/pexels-photo-6684209.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Survey Research Platform", "A survey creation and analysis platform with cross-tabulation."),
          mkExample("high", "UserResearch", "Understand your users.", ["Session recording", "Interview scheduler", "Note tagging", "Insight synthesis"], T.roseLight("#e11d48", "#fce7f3"), "https://images.pexels.com/photos/5212343/pexels-photo-5212343.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "User Research Platform", "A UX research platform with session recording and insight synthesis."),
          mkExample("high", "MarketResearch", "Know your market.", ["Competitor tracking", "Trend analysis", "Survey panels", "Report builder"], T.light("#10b981", "#d1fae5"), "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Market Research Platform", "A market intelligence platform with competitor and trend analysis."),
          mkExample("high", "AcademicResearch", "Rigorous and compliant.", ["IRB compliance", "Data collection", "Longitudinal tracking", "Citation export"], T.light("#1e40af", "#dbeafe"), "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=900&w=1260", "premium", "Academic Research Platform", "A research data platform with IRB compliance and longitudinal tracking."),
        ],
      },
  ],
  };
