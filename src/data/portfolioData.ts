import {
  FileCode,
  Palette,
  Code2,
  Atom,
  FileSpreadsheet,
  Sparkles,
  Server,
  Coffee,
  Workflow,
  Database,
  Flame,
  Terminal,
  GitBranch,
  Laptop,
  Send,
} from "lucide-react";

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Tools";
  level: number;
  iconName: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: "Featured" | "Completed" | "In Development";
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  galleryImages?: string[];
  problemStatement?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
}

export interface ExperienceItem {
  company: string;
  companyLogo?: string;
  role: string;
  employmentType?: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  website?: string;
  currentJob?: boolean;
}

export const HERO_DATA = {
  name: "MAHENDIRAN S",
  role: "Software Developer",
  tagline: "FULL-STACK SOFTWARE DEVELOPER",
  email: "mahendiran.dev@gmail.com",
  phone: "+91 98765 43210",
  location: "TAMIL NADU, INDIA",
  bio: "Information Technology student at Mahendra Engineering College. Crafting high-performance, scalable web applications with React, Next.js, Node.js, Express, Java, and modern cloud technologies.",
  availability: "Available for Full-time Roles & Engineering Internships",
  socialLinks: {
    github: "https://github.com/Mahendiran-S",
    linkedin: "https://linkedin.com/in/mahendiran-s",
    instagram: "https://instagram.com/mahendiran_dev",
    email: "mailto:mahendiran.dev@gmail.com",
    phone: "tel:+919876543210",
  },
  stats: [
    { label: "YEARS OF CODE", value: "3+" },
    { label: "PROJECTS BUILT", value: "15+" },
    { label: "REPOSITORIES", value: "24+" },
    { label: "COMMITS '26", value: "480+" },
  ],
};

export const PERSONAL_INFO = HERO_DATA;
export const STATS = HERO_DATA.stats;

export const TIMELINE_ITEMS = [
  {
    type: "Education",
    title: "Bachelor of Information Technology",
    institution: "Mahendra Engineering College",
    period: "June 2024 - June 2028",
    description: "Focusing on Software Engineering, Data Structures, Web Development, Database Management, and Modern Web Architectures.",
  },
  {
    type: "Internship",
    title: "Full Stack Developer Intern",
    institution: "Kwontum",
    period: "Jul 2026 - Aug 2026",
    description: "Engineered core HRMS enterprise modules, salary deduction engines, invoice generation pipelines, and bulk financial reporting tools.",
  },
  {
    type: "Internship",
    title: "Full Stack Developer Intern",
    institution: "Cognifyz Technologies",
    period: "Dec 2024 - Jan 2025",
    description: "Developed full-stack web applications using React, Node.js, Express, RESTful APIs, and relational/NoSQL databases.",
  },
  {
    type: "Achievement",
    title: "BookMyEvent - College Event System",
    institution: "Lead Developer",
    period: "Jan 2026 - Present",
    description: "Built a full-stack College Event Management platform featuring Admin/Organizer/Student portals, QR ticket generation, and AI event assistant.",
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: "HTML5", category: "Frontend", level: 95, iconName: "FileCode", description: "Semantic markup, DOM structure, web standards" },
  { name: "CSS3", category: "Frontend", level: 90, iconName: "Palette", description: "Responsive layouts, Flexbox, Grid, Custom styling" },
  { name: "JavaScript", category: "Frontend", level: 92, iconName: "Code2", description: "ES6+, async/await, DOM manipulation, functional patterns" },
  { name: "React (Vite)", category: "Frontend", level: 90, iconName: "Atom", description: "Component state, Hooks, SPA architecture, performance" },
  { name: "TypeScript", category: "Frontend", level: 85, iconName: "FileSpreadsheet", description: "Type safety, interfaces, strict typing" },
  { name: "Tailwind CSS", category: "Frontend", level: 92, iconName: "Sparkles", description: "Utility-first design systems, responsive UI" },

  // Backend
  { name: "Node.js", category: "Backend", level: 88, iconName: "Server", description: "Event-driven runtime, Express server architecture" },
  { name: "Java (Spring Boot)", category: "Backend", level: 82, iconName: "Coffee", description: "Object-oriented design, REST services, Spring ecosystem" },
  { name: "RESTful APIs", category: "Backend", level: 90, iconName: "Workflow", description: "API design, CRUD controllers, JWT authentication" },
  { name: "MySQL", category: "Backend", level: 85, iconName: "Database", description: "Relational schema design, SQL queries, indexing" },
  { name: "MongoDB / Firebase / Supabase", category: "Backend", level: 85, iconName: "Flame", description: "NoSQL DB, real-time data sync, authentication" },
  { name: "Python (Basics)", category: "Backend", level: 78, iconName: "Terminal", description: "Scripting, basic algorithms, problem solving" },

  // Tools
  { name: "Git & GitHub", category: "Tools", level: 90, iconName: "GitBranch", description: "Version control, repositories, pull requests" },
  { name: "VS Code", category: "Tools", level: 95, iconName: "Laptop", description: "IDE configuration, debugging workflows, extensions" },
  { name: "Vercel & Netlify", category: "Tools", level: 90, iconName: "Send", description: "Continuous deployment, static hosting, environment variables" },
  { name: "MS-Excel", category: "Tools", level: 85, iconName: "FileSpreadsheet", description: "Data management, participant CSV exports, reporting" },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Kwontum",
    role: "Full Stack Development Intern",
    period: "Jul 2026 – Aug 2026",
    location: "Bengaluru, India (Remote)",
    employmentType: "Internship",
    currentJob: true,
    responsibilities: [
      "Engineered automated Expense Claim Submission with audit trail logs and multi-currency processing.",
      "Developed enterprise Salary Deduction Engine integrating biometric attendance & loan calculation logic.",
      "Built dynamic vector PDF billing report generator and automated dispatch invoice pipeline.",
      "Optimized query performance for accounting audit visualizers handling high-volume transaction datasets.",
      "Built role-based access matrix and profile database with real-time status tracking.",
      "Implemented high-volume bulk Excel parsing and automated financial data validation tools."
    ],
    technologies: ["React", "Node.js", "Express", "TypeScript", "Tailwind CSS", "MySQL", "Excel Automation", "PDFKit"]
  },
  {
    company: "Cognifyz Technologies",
    role: "Full Stack Developer Intern",
    period: "Dec 2024 – Jan 2025",
    location: "Remote",
    employmentType: "Internship",
    currentJob: false,
    responsibilities: [
      "Developed and contributed to full stack web applications using frontend and backend technologies.",
      "Built responsive user interfaces and integrated them with RESTful backend microservices.",
      "Designed and consumed RESTful APIs for efficient client-server data streaming.",
      "Worked with databases to perform CRUD operations, query optimization, and schema design.",
      "Implemented JWT authentication mechanisms and handled application security protocols.",
      "Collaborated on debugging, testing, and improving web performance metrics."
    ],
    technologies: ["React", "Node.js", "Express", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"]
  },
  {
    company: "Mahendra Software Tech Lab",
    role: "Frontend Engineer Intern",
    period: "Jun 2024 – Nov 2024",
    location: "Namakkal, India",
    employmentType: "Internship",
    currentJob: false,
    responsibilities: [
      "Architected reusable UI design system component libraries using React and Tailwind CSS.",
      "Improved Core Web Vitals (LCP, CLS, FID) by 35% through image optimization and lazy loading.",
      "Integrated responsive dashboard visualizers for academic performance tracking.",
      "Collaborated with UI/UX designers to implement pixel-perfect Figma wireframes."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit", "Figma"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "bookmyevent",
    title: "BookMyEvent - College Event Management System",
    category: "Full Stack Application",
    description: "Comprehensive college event management platform supporting Admin, Organizer, and Student roles with QR-based ticket generation and AI assistant.",
    longDescription: "Developed a full-stack College Event Management System that enables seamless interaction between Admin, Organizer, and Student roles. Administrators manage organizers, organizers create/manage events, and students register for events with QR ticket generation. Features integrated AI assistant for natural language queries, automated registration, and CSV exports.",
    technologies: ["React (Vite)", "JavaScript", "HTML/CSS", "Supabase", "Firebase", "QR Code Engine", "Tailwind CSS"],
    status: "Featured",
    githubUrl: "https://github.com/Mahendiran-S/bookmyevent",
    liveUrl: "https://bookmyevent.vercel.app",
    problemStatement: "Manual event registration and attendance verification in colleges caused severe bottlenecks, duplicate entries, and lack of real-time event analytics.",
    solution: "Built an end-to-end event platform with QR verification, multi-role RBAC access, real-time analytics dashboard, and an AI event assistant.",
    features: [
      "Admin Dashboard: Approve organizers, manage platform settings, export audit CSV reports",
      "Organizer Portal: Create events, set ticket limits, track real-time attendance",
      "Student Hub: Browse events, register instantly, receive unique QR ticket pass",
      "QR Scanner: Fast mobile entry check-in for event organizers",
      "AI Event Assistant: Natural language queries for event schedules and details"
    ],
    architecture: "React (Vite) Frontend + Supabase/Firebase Backend + Tailwind CSS + QR Code Engine",
  },
  {
    id: "portfolio-website",
    title: "CMS-Powered Developer Portfolio",
    category: "Full Stack / Next.js",
    description: "Modern, high-performance developer portfolio integrated with Sanity CMS, GitHub API telemetry, and Framer Motion.",
    longDescription: "Architected a CMS-powered portfolio web application using Next.js 15, Tailwind CSS, Sanity CMS, and Framer Motion. Content is dynamically managed via Sanity Studio without modifying code.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Sanity CMS", "Tailwind CSS", "Framer Motion", "GSAP"],
    status: "Featured",
    githubUrl: "https://github.com/Mahendiran-S/portfolio-website",
    liveUrl: "https://mahendiran.dev",
    problemStatement: "Updating portfolio projects, certificates, and skills required manual code modifications and redeployments.",
    solution: "Integrated Sanity CMS and GitHub API telemetry for instant client-side updates via webhook revalidation.",
    features: [
      "Sanity Studio: Dynamic content management for Projects, Certificates, Experience, Skills",
      "GitHub Telemetry: Real-time repository stats and contribution heat map",
      "Framer Motion & GSAP: Smooth micro-interactions and scroll animations",
      "PDF Resume Viewer: Interactive modal with zoom and download capabilities"
    ],
    architecture: "Next.js 15 App Router + Sanity CMS + Tailwind CSS + Vercel Deployment",
  },
];

export const CERTIFICATES = [
  {
    id: "cert-1",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jan 2024",
    category: "AWS",
    badgeUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
    credentialId: "AWS-CP-892341",
    downloadUrl: "#"
  },
  {
    id: "cert-2",
    title: "Full Stack Internship Certificate",
    issuer: "Cognifyz Technologies",
    date: "Jan 2025",
    category: "Internship",
    badgeUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    credentialId: "COG-FS-2025-012",
    downloadUrl: "#"
  },
  {
    id: "cert-3",
    title: "NPTEL Cloud Computing Certification",
    issuer: "IIT Kharagpur / NPTEL",
    date: "Nov 2024",
    category: "NPTEL",
    badgeUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
    credentialId: "NPTEL24CS91S340",
    downloadUrl: "#"
  },
  {
    id: "cert-4",
    title: "Kwontum Internship Certificate",
    issuer: "Kwontum",
    date: "Aug 2026",
    category: "Internship",
    badgeUrl: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=600&q=80",
    credentialId: "KWON-FS-2026-08",
    downloadUrl: "#"
  }
];

export const GITHUB_STATS = {
  profile: {
    username: "Mahendiran-S",
    avatar: "https://github.com/Mahendiran-S.png",
    bio: "Information Technology Student | Full-Stack Software Developer | React, Next.js, Node.js, Java",
    publicRepos: 24,
    followers: 18,
    totalStars: 42,
    contributionsThisYear: 480,
  },
  languages: [
    { name: "TypeScript", percentage: 42, color: "#3178c6" },
    { name: "JavaScript", percentage: 28, color: "#f7df1e" },
    { name: "Java", percentage: 15, color: "#b07219" },
    { name: "HTML/CSS", percentage: 10, color: "#e34c26" },
    { name: "Other", percentage: 5, color: "#8b949e" },
  ],
  pinnedRepos: [
    {
      name: "bookmyevent",
      description: "College Event Management platform with QR verification, multi-role access, and AI event assistant.",
      stars: 18,
      forks: 5,
      language: "JavaScript",
      url: "https://github.com/Mahendiran-S/bookmyevent",
      updated: "Aug 2026",
    },
    {
      name: "portfolio-website",
      description: "CMS-powered developer portfolio built with Next.js 15, Tailwind CSS, Sanity CMS, and Framer Motion.",
      stars: 12,
      forks: 3,
      language: "TypeScript",
      url: "https://github.com/Mahendiran-S/portfolio-website",
      updated: "Aug 2026",
    },
  ],
};
