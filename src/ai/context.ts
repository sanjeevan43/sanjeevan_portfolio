import { portfolioKnowledge } from "./portfolioKnowledge";

export function buildRelevantContext(query: string): string {
  const q = query.toLowerCase();
  const contextParts: string[] = [];

  contextParts.push(`NAME: ${portfolioKnowledge.name}`);
  contextParts.push(`ROLE: ${portfolioKnowledge.role}`);
  contextParts.push(`SUMMARY: ${portfolioKnowledge.summary}`);

  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("tool") ||
    q.includes("python") ||
    q.includes("react") ||
    q.includes("swift") ||
    q.includes("sql") ||
    q.includes("node")
  ) {
    contextParts.push(`SKILLS:
- Languages: ${portfolioKnowledge.skills.languages.join(", ")}
- Frameworks & Tools: ${portfolioKnowledge.skills.frameworksAndTools.join(", ")}
- Core Competencies: ${portfolioKnowledge.skills.coreCompetencies.join(", ")}`);
  }

  const matchedProjects = portfolioKnowledge.projects.filter(p => {
    const pName = p.name.toLowerCase();
    return (
      q.includes("project") ||
      q.includes("work") ||
      q.includes("built") ||
      q.includes("app") ||
      q.includes(pName)
    );
  });

  if (matchedProjects.length > 0) {
    const projectStrings = matchedProjects.map(p => {
      let str = `- ${p.name}: ${p.description} (Tech: ${p.technologies.join(", ")})`;
      if (p.url) str += ` [Link: ${p.url}]`;
      return str;
    });
    contextParts.push(`PROJECTS:\n${projectStrings.join("\n")}`);
  }

  if (q.includes("service") || q.includes("offer") || q.includes("hire") || q.includes("do")) {
    contextParts.push(`SERVICES:\n${portfolioKnowledge.services.map(s => `- ${s}`).join("\n")}`);
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("study")) {
    contextParts.push(
      `EDUCATION:\n${portfolioKnowledge.education.map(e => `- ${e.degree} at ${e.institution}`).join("\n")}`
    );
  }

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("reach") || q.includes("github") || q.includes("linkedin")) {
    contextParts.push(`CONTACT:
- Email: ${portfolioKnowledge.contact.email}
- Phone: ${portfolioKnowledge.contact.phone}
- GitHub: ${portfolioKnowledge.contact.github}
- LinkedIn: ${portfolioKnowledge.contact.linkedin}`);
  }

  return contextParts.join("\n\n");
}
