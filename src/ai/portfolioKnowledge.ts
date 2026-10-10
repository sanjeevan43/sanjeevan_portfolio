import { PortfolioKnowledge } from "./types";

export const portfolioKnowledge: PortfolioKnowledge = {
  name: "Sanjeevan Moorthy (Sanjeeva Moorthy M)",
  aliases: ["Sanjeev", "King Of Dark", "Sanjeevan", "Sanjeeva"],
  role: "Full-Stack Developer, iOS Mobile Developer & Founder of Yazhven Technologies",
  summary:
    "Student (Class of 2026, B.Sc Computer Science at Nachiappa Swamigal College) and full-stack software developer who began coding in 2024. Experienced in building mobile transit systems, browser-based IDEs, embeddable AI agents, low-RAM voice assistants, and database architectures. Driven by a passion to learn quickly and build his own brand, Yazhven Technologies.",
  skills: {
    languages: ["C", "C++", "Java", "Python", "Swift", "Rust", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
    frameworksAndTools: [
      "React",
      "SwiftUI",
      "Node.js",
      "Fastify",
      "Firebase (Firestore & Realtime DB)",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Supabase",
      "Prisma",
      "Tailwind CSS",
      "VS Code Extension API",
      "Ollama",
      "llama.cpp",
      "WebLLM",
      "Gemini API",
      "Transformers.js",
      "Leaflet",
      "OpenStreetMap",
      "Overpass API",
      "Google Places API",
      "Ubuntu",
      "Nginx",
      "Vercel",
      "Oracle APEX",
      "Git",
      "Vite"
    ],
    coreCompetencies: [
      "Full-Stack Engineering & Web Applications",
      "iOS Mobile App Development (SwiftUI)",
      "Database Architecture & SQL Schema Normalization",
      "RESTful API & Server Infrastructure",
      "Browser-Local & Low-Resource AI Integration",
      "Real-Time Transit & Geolocation Systems"
    ],
    spokenLanguages: ["Tamil (Native)", "English (Working Professional / Improving Written English)"]
  },
  projects: [
    {
      name: "Selvagam Driver & Parent Suite",
      description:
        "Dual-application mobile transit system for school transportation monitoring, driver tracking, and parent alert notifications.",
      technologies: ["Python", "Firebase Realtime DB", "SQL", "GPS Transit APIs"],
      url: "https://play.google.com/store/apps/details?id=com.selvagam.parent",
      highlights: [
        "Published both Selvagam Parents App and Driver App to Google Play Store.",
        "Engineered real-time GPS coordinate streaming and route-specific parent notifications.",
        "Investigated and resolved intermediate stop notification failures by optimizing GPS distance threshold algorithms."
      ]
    },
    {
      name: "Tamil for You (formerly அகரவளம்)",
      description:
        "Educational application dedicated to learning Tamil language, literature, daily Thirukkural, and proverbs.",
      technologies: ["React", "TypeScript", "Tamil Audio & Writing Engine"],
      highlights: [
        "Includes daily Thirukkural verses, proverbs, moral stories, Tamil pronunciation exercises, and writing games."
      ]
    },
    {
      name: "AxOn IDE",
      description:
        "Browser-based integrated development environment inspired by VS Code built for developer productivity.",
      technologies: ["React", "TypeScript", "VS Code Architecture", "Web APIs"],
      highlights: [
        "Features workspace navigation, code editor interfaces, custom themes, and extension support."
      ]
    },
    {
      name: "Website Opportunity Finder / PitchMap",
      description:
        "Full-stack sales discovery product for locating local businesses that need websites and managing client outreach.",
      technologies: ["Fastify", "TypeScript", "Prisma", "SQLite", "OpenStreetMap", "Overpass API", "Google Places API"],
      url: "https://pitchmap-4ccca.web.app/",
      highlights: [
        "Discovers local shops, filters and scores web development opportunities, saves leads, and tracks sales pipelines."
      ]
    },
    {
      name: "CodeLens",
      description:
        "Embeddable AI assistant for website owners that allows site visitors to query site content directly.",
      technologies: ["JavaScript", "Retrieval System", "Browser-Local AI Models"],
      highlights: [
        "Grounded Q&A answering grounded in site content; leverages browser-local AI to reduce API cost reliance."
      ]
    },
    {
      name: "Android Voice AI Assistant",
      description:
        "Lightweight voice assistant engineered for Android devices with as little as 2 GB of RAM.",
      technologies: ["llama.cpp", "Local LLM Runtime", "Speech Recognition", "Tamil/English Code-Switching"],
      highlights: [
        "Supports offline device commands, optional web access, Tamil-English speech, and low-resource LLM runtimes."
      ]
    },
    {
      name: "OmniFlow / Data Engine",
      description:
        "Enterprise CSV import platform with visual column mapping tools and automated data validation.",
      technologies: ["React", "Firebase", "Data Mapping", "Batch Engine"],
      url: "https://omniflow-8665a.web.app/",
      highlights: [
        "Batch processing engine handling 100K+ row datasets with real-time validation feedback."
      ]
    },
    {
      name: "Apexon API Sentinel",
      description:
        "Published VS Code extension that accelerates API discovery and testing workflows directly inside VS Code.",
      technologies: ["TypeScript", "VS Code API", "Developer Tools"],
      url: "https://open-vsx.org/extension/sanjeevan43/apexon",
      highlights: [
        "Built clean UI overlays inside VS Code workspace containers to streamline API request/response testing."
      ]
    },
    {
      name: "Cinema Booking System",
      description:
        "Movie ticket reservation engine utilizing transactional database queries and normalized schemas.",
      technologies: ["SQL", "Backend Architecture", "Database Design"],
      url: "https://github.com/sanjeevan43/MovieBookingSystem",
      highlights: [
        "Designed normalized table structures with transactional locks to eliminate double-booking bugs."
      ]
    },
    {
      name: "Yazhven Technologies",
      description:
        "Sanjeevan's software brand and startup initiative for web/mobile development services and software products.",
      technologies: ["Full-Stack", "Mobile", "AI Solutions"],
      highlights: [
        "Represents Sanjeevan's overarching software company name, brand identity, and commercial ambitions."
      ]
    },
    {
      name: "SafeGuard Platform",
      description:
        "Cybersecurity tracking application concept for personal safety monitoring and real-time threat workflows.",
      technologies: ["React", "Node.js", "Security APIs"],
      url: "https://safe-guard-neon.vercel.app/"
    },
    {
      name: "ColdPulse / WhatsApp Campaign Tool",
      description:
        "Automated messaging campaign manager and outreach tracking tool.",
      technologies: ["Fastify", "TypeScript", "Prisma", "SQLite"],
      url: "https://github.com/sanjeevan-code/ColdPulse"
    },
    {
      name: "OnceOnThisDay & WishyFi",
      description:
        "Interactive web apps for digital birthday cards, greetings, animations, and background audio.",
      technologies: ["React", "Vite", "Tailwind CSS", "Web Audio API"],
      url: "https://wishyfi.vercel.app/"
    },
    {
      name: "LeetCode AI Solver",
      description:
        "Interactive coding challenge assistant utilizing React and Gemini API.",
      technologies: ["React", "Gemini API"]
    }
  ],
  education: [
    {
      institution: "Nachiappa Swamigal Arts and Science College, Koviloor, Tamil Nadu",
      degree: "B.Sc in Computer Science",
      details: "Class of 2026 (Enrolled). University exam context includes Alagappa University syllabuses."
    },
    {
      institution: "HOPE3 Ecosystem",
      degree: "Student Member & Developer",
      details: "Active member developing software projects."
    },
    {
      institution: "Anchetty Higher Secondary School, Krishnagiri District, Tamil Nadu",
      degree: "Higher Secondary Education",
      details: "Schooling background in Tamil Nadu."
    }
  ],
  services: [
    "Full-Stack Web Application Development (React, Node.js, Fastify, Python, Firebase)",
    "iOS Mobile Application Development (Swift, SwiftUI)",
    "Database Schema Design & SQL Optimization",
    "Developer Tools & VS Code Extensions",
    "Embedded Browser & Low-Resource AI Integration"
  ],
  experience: [
    "Coding since 2024; built and deployed 10+ web and mobile applications.",
    "Published Selvagam transit applications to Google Play Store and Apexon extension to Open VSX.",
    "Engineered local AI solutions including CodeLens embeddable bot and 2 GB RAM Android Voice AI Assistant.",
    "Developed sales discovery platform (PitchMap) and CSV data validation engines (OmniFlow).",
    "Founding Yazhven Technologies as his software product and client services brand."
  ],
  strengths: [
    "Ability to learn quickly - self-identified biggest strength, absorbing new technologies rapidly.",
    "Practical execution focus - learns concepts by building real, functional projects.",
    "Broad exploratory curiosity across web, mobile iOS, backend, databases, and low-resource AI."
  ],
  challengesAndFailures: [
    "Faced implementation difficulties and higher error rates in C++, Rust, and SQL projects.",
    "Had 4 arrears in a past semester and struggled with written English examinations; practical coding strength exceeds written exam performance.",
    "Managing multiple project ambitions across diverse technical domains."
  ],
  brandAndVision:
    "Ultimate ambition is to build his own software brand, Yazhven Technologies, combining software development services, proprietary products, and personal developer branding.",
  valuesAndMotivation: [
    "Original motivation for starting coding in 2024 was financial opportunity.",
    "Driven by continuous learning, personal brand building, and creating real commercial value."
  ],
  unknownsMatrix: [
    "Childhood events and specific early family circumstances",
    "Exact starting date in 2024 and first completed project name",
    "Exact financial metrics or revenue of Yazhven Technologies",
    "Current semester grades and exact arrear clearance status"
  ],
  indexKeywords: {
    "who is sanjeevan": "Sanjeevan Moorthy (also Sanjeev / King Of Dark) is a CS student (Class of 2026 at Nachiappa Swamigal College) and full-stack developer who started coding in 2024.",
    "strength": "Sanjeevan's primary self-identified strength is his ability to learn quickly.",
    "motivation": "Original motivation to learn programming in 2024 was financial opportunity. Main goal is building his brand, Yazhven Technologies.",
    "arrears": "Had 4 arrears in a past semester and struggled with written English exams. Practical coding performance is stronger than written theory.",
    "failures": "Encountered more implementation errors with C++, Rust, and SQL in projects. Had 4 academic arrears in a past semester.",
    "selvagam": "Selvagam is a school bus transit app suite (Parent & Driver apps on Play Store) with live GPS tracking and parent route notifications.",
    "tamil for you": "Tamil for You (formerly அகரவளம்) is an educational app for learning Tamil language, Thirukkural, proverbs, and writing.",
    "axon ide": "AxOn IDE is a browser-based developer IDE inspired by VS Code built with React & TypeScript.",
    "pitchmap": "PitchMap / Website Opportunity Finder discovers local businesses needing websites using Fastify, Prisma, SQLite & OpenStreetMap.",
    "codelens": "CodeLens is an embeddable website AI agent using browser-local models to answer visitor questions.",
    "voice ai": "Android Voice AI Assistant is a lightweight Tamil/English voice assistant designed for 2 GB RAM phones using llama.cpp.",
    "yazhven": "Yazhven Technologies is Sanjeevan's chosen software brand and startup initiative.",
    "c++ rust sql": "C++, Rust, and SQL presented more implementation errors during project development.",
    "anchetty": "Anchetty Higher Secondary School in Krishnagiri district, Tamil Nadu is Sanjeevan's school.",
    "nachiappa": "Nachiappa Swamigal Arts and Science College is where Sanjeevan pursues B.Sc Computer Science (Class of 2026)."
  },
  contact: {
    email: "sanjeevamoorthy35@gmail.com",
    phone: "+91 90807 50511",
    github: "https://github.com/sanjeevan43",
    linkedin: "https://www.linkedin.com/in/sanjeeva-moorthy-m-845917379",
    instagram: "https://www.instagram.com/sanjeev_amoorthy_"
  }
};
