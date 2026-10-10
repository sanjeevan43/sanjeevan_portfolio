export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface ModelProgress {
  progress: number;
  text: string;
}

export type AIState = "idle" | "checking" | "downloading" | "loading" | "ready" | "error";

export interface ProjectKnowledge {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  highlights?: string[];
}

export interface PortfolioKnowledge {
  name: string;
  role: string;
  summary: string;
  skills: {
    languages: string[];
    frameworksAndTools: string[];
    coreCompetencies: string[];
    spokenLanguages: string[];
  };
  projects: ProjectKnowledge[];
  education: {
    institution: string;
    degree: string;
    details: string;
  }[];
  experience: string[];
  services: string[];
  strengths?: string[];
  aliases?: string[];
  brandAndVision?: string;
  challengesAndFailures?: string[];
  valuesAndMotivation?: string[];
  unknownsMatrix?: string[];
  indexKeywords?: Record<string, string>;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    instagram: string;
  };
}
