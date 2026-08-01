export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: 'Completed' | 'In Development' | 'Featured' | 'Production';
  githubUrl: string;
  liveUrl: string;
  image: string;
  features: string[];
  architectureDetails: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools';
  level: number; // 0 to 100
  iconName: string;
  description: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: 'AWS' | 'NPTEL' | 'Internship' | 'Hackathons' | 'Workshops';
  date: string;
  credentialId: string;
  downloadUrl: string;
  badgeUrl?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updated: string;
}

export const PERSONAL_INFO = {
  name: "MAHENDIRAN S",
  role: "Software Developer",
  tagline: "Building scalable, modern, and user-friendly web applications with clean code and elegant design.",
  subtext: "Information Technology Student at Mahendra Engineering College | Tamil Nadu, India",
  college: "Mahendra Engineering College",
  location: "Tamil Nadu, India",
  email: "mahendirans002@gmail.com",
  phone: "+91 86107 74327",
  github: "https://github.com/Mahendiran-S",
  linkedin: "https://www.linkedin.com/in/mahendiran-s-/",
  instagram: "https://instagram.com/mahendiran_dev",
  seeking: [
    "Software Engineer Internships",
    "Full-Stack Developer Roles",
    "Freelance Engineering Contracts"
  ],
  aboutBio: "Dynamic Software Developer specializing in full-stack development, low-code solutions, and web design. Deep understanding of backend security, database architecture, and modern web technologies. Driven by the challenge of solving complex problems and building robust, user-centric applications. Strong believer in the power of clean code, scalable systems, and continuous innovation.",
};

export const STATS = [
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Certificates Earned", value: 6, suffix: "+" },
  { label: "Core Competencies", value: 12, suffix: "+" },
  { label: "Internship Delivered", value: 1, suffix: "" },
  { label: "GitHub Repositories", value: 15, suffix: "+" },
];

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
    institution: "Cognifyz Technologies",
    period: "Dec 2024 - Jan 2025",
    description: "Developed and contributed to full-stack web applications using React, Node.js, Express, RESTful APIs, and relational/NoSQL databases.",
  },
  {
    type: "Achievement",
    title: "BookMyEvent - College Event System",
    institution: "Lead Developer",
    period: "Jan 2026 - Present",
    description: "Built a full-stack College Event Management platform featuring Admin/Organizer/Student portals, QR ticket generation, and AI event assistant.",
  },
  {
    type: "Certification",
    title: "UI/UX Design Certification",
    institution: "Design Fundamentals",
    period: "2024",
    description: "Earned certification in UI/UX Design understanding core design principles, wireframing, and user experience workflows.",
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
    company: "Cognifyz Technologies",
    role: "Full Stack Developer Intern",
    period: "Dec 2024 - Jan 2025",
    location: "Remote",
    responsibilities: [
      "Developed and contributed to full stack web applications using frontend and backend technologies.",
      "Built responsive user interfaces and integrated them with backend services.",
      "Designed and consumed RESTful APIs for efficient client-server communication.",
      "Worked with databases to perform CRUD operations and basic schema design.",
      "Implemented authentication mechanisms and handled application security basics.",
      "Collaborated on debugging, testing, and improving application performance.",
      "Gained hands-on experience in real-world development workflows and deployment."
    ],
    technologies: ["React", "Node.js", "Express", "HTML", "CSS", "JavaScript", "REST APIs", "Git"]
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
    liveUrl: "https://bookmyevent-demo.vercel.app",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Multi-role RBAC access (Admin, Organizer, Student)",
      "QR-based ticket generation and verification",
      "Integrated AI assistant for natural language event queries",
      "Real-time event registration analytics & CSV exports"
    ],
    architectureDetails: "Built using React (Vite) consuming Supabase and Firebase authentication and database operations."
  },
  {
    id: "fullstack-web-apps",
    title: "Cognifyz Full-Stack Web Suite",
    category: "Web Application",
    description: "Suite of responsive web applications built during internship at Cognifyz Technologies featuring authentication and database schema design.",
    longDescription: "Engineered during full-stack developer internship at Cognifyz Technologies. Includes RESTful APIs for client-server communication, CRUD database integrations, and JWT authentication.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    status: "Completed",
    githubUrl: "https://github.com/Mahendiran-S/cognifyz-web-suite",
    liveUrl: "https://cognifyz-apps.vercel.app",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    features: [
      "RESTful API endpoints for client-server communication",
      "CRUD operations with structured database schema design",
      "Application security basics & authentication mechanisms",
      "Deployment on Vercel and Netlify platforms"
    ],
    architectureDetails: "React single page applications backed by Express/Node.js REST API routes."
  },
  {
    id: "portfolio-website",
    title: "Awwwards-Level Luxury Portfolio",
    category: "Design & Full Stack",
    description: "State-of-the-art developer portfolio featuring dark luxury aesthetics, 3D tilt profile card, custom cursor, and smooth Lenis motion.",
    longDescription: "An ultra-premium personal showcase built with Next.js 15, Framer Motion, GSAP, and Tailwind CSS. Implements custom glassmorphism cards, spotlight mouse tracking, and interactive modal dialogs.",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis"],
    status: "Featured",
    githubUrl: "https://github.com/Mahendiran-S/portfolio-website",
    liveUrl: "https://mahendiran.dev",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Luxury dark theme (#080808) with fine grid pattern & soft glow",
      "Interactive 3D mouse perspective profile card",
      "Lenis smooth scrolling and custom magnetic cursor",
      "Interactive resume viewer with direct PDF download"
    ],
    architectureDetails: "Next.js 15 App Router optimized for static site generation."
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-cognifyz-intern",
    title: "Full Stack Development Internship Certificate",
    issuer: "Cognifyz Technologies",
    category: "Internship",
    date: "Dec 2024 - Jan 2025",
    credentialId: "COG-FSD-2025-MAH",
    downloadUrl: "#"
  },
  {
    id: "cert-uiux-design",
    title: "Certification in UI/UX Design (Beginner)",
    issuer: "Design Principles & UX Concepts",
    category: "Workshops",
    date: "2024",
    credentialId: "UIUX-CERT-2024",
    downloadUrl: "#"
  },
  {
    id: "cert-python-c",
    title: "Foundational Programming in Python & C",
    issuer: "Programming Fundamentals",
    category: "NPTEL",
    date: "2024",
    credentialId: "PROG-PYC-2024",
    downloadUrl: "#"
  },
  {
    id: "cert-hackathon",
    title: "Hackathon Real-Time Problem Solving",
    issuer: "Technical Hackathon Forum",
    category: "Hackathons",
    date: "2024",
    credentialId: "HACK-2024-MAH",
    downloadUrl: "#"
  }
];

export const GITHUB_STATS = {
  profile: {
    username: "Mahendiran-S",
    avatar: "/mahendiran-profile.png",
    bio: "Software Developer | Information Technology Student at Mahendra Engineering College | Passionate about building modern, scalable web apps.",
    followers: 128,
    following: 45,
    publicRepos: 15,
    totalStars: 48,
    contributionsThisYear: 320
  },
  languages: [
    { name: "JavaScript", percentage: 45, color: "#F7DF1E" },
    { name: "HTML/CSS", percentage: 25, color: "#E34F26" },
    { name: "React", percentage: 15, color: "#3178C6" },
    { name: "Java", percentage: 10, color: "#B07219" },
    { name: "Python", percentage: 5, color: "#3572A5" }
  ],
  pinnedRepos: [
    {
      name: "BookMyEvent",
      description: "Full-stack College Event Management System with Admin, Organizer, Student roles & QR tickets.",
      stars: 24,
      forks: 6,
      language: "JavaScript",
      url: "https://github.com/Mahendiran-S/BookMyEvent",
      updated: "Today"
    },
    {
      name: "portfolio-website",
      description: "Awwwards-level luxury developer portfolio built with Next.js 15 & Framer Motion.",
      stars: 18,
      forks: 4,
      language: "TypeScript",
      url: "https://github.com/Mahendiran-S/portfolio-website",
      updated: "Today"
    }
  ]
};
