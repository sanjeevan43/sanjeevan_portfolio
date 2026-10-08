import { portfolioKnowledge } from "../portfolioKnowledge";

export function getResume() {
  return {
    name: portfolioKnowledge.name,
    role: portfolioKnowledge.role,
    summary: portfolioKnowledge.summary,
    skills: portfolioKnowledge.skills,
    projects: portfolioKnowledge.projects,
    education: portfolioKnowledge.education,
    strengths: portfolioKnowledge.strengths,
    contact: portfolioKnowledge.contact
  };
}
