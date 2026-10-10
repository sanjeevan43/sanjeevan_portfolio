import { portfolioKnowledge } from "./portfolioKnowledge";

export function buildRelevantContext(query: string): string {
  const q = query.toLowerCase().trim();
  const contextParts: string[] = [];

  contextParts.push(`NAME: ${portfolioKnowledge.name}`);
  if (portfolioKnowledge.aliases) {
    contextParts.push(`ALIASES / HANDLES: ${portfolioKnowledge.aliases.join(", ")}`);
  }
  contextParts.push(`ROLE: ${portfolioKnowledge.role}`);
  contextParts.push(`SUMMARY: ${portfolioKnowledge.summary}`);

  // Check Index Keywords Dictionary for direct match
  if (portfolioKnowledge.indexKeywords) {
    const matchedKeys = Object.entries(portfolioKnowledge.indexKeywords).filter(([key]) =>
      q.includes(key.toLowerCase())
    );
    if (matchedKeys.length > 0) {
      const indexDirectHits = matchedKeys.map(([, val]) => `- ${val}`).join("\n");
      contextParts.push(`DIRECT INDEX MATCH:\n${indexDirectHits}`);
    }
  }

  // Skills match
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
    q.includes("rust") ||
    q.includes("c++") ||
    q.includes("node")
  ) {
    contextParts.push(`SKILLS:
- Languages: ${portfolioKnowledge.skills.languages.join(", ")}
- Frameworks & Tools: ${portfolioKnowledge.skills.frameworksAndTools.join(", ")}
- Core Competencies: ${portfolioKnowledge.skills.coreCompetencies.join(", ")}`);
  }

  // Projects match
  const matchedProjects = portfolioKnowledge.projects.filter(p => {
    const pName = p.name.toLowerCase();
    return (
      q.includes("project") ||
      q.includes("work") ||
      q.includes("built") ||
      q.includes("app") ||
      q.includes("selvagam") ||
      q.includes("tamil") ||
      q.includes("axon") ||
      q.includes("pitchmap") ||
      q.includes("codelens") ||
      q.includes("voice") ||
      q.includes("yazhven") ||
      q.includes("omniflow") ||
      q.includes("safeguard") ||
      q.includes(pName)
    );
  });

  if (matchedProjects.length > 0) {
    const projectStrings = matchedProjects.map(p => {
      let str = `- ${p.name}: ${p.description} (Tech: ${p.technologies.join(", ")})`;
      if (p.highlights) str += ` | Key details: ${p.highlights.join("; ")}`;
      if (p.url) str += ` [Link: ${p.url}]`;
      return str;
    });
    contextParts.push(`PROJECTS:\n${projectStrings.join("\n")}`);
  }

  // Education & Schooling
  if (
    q.includes("education") ||
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("study") ||
    q.includes("school") ||
    q.includes("anchetty") ||
    q.includes("nachiappa") ||
    q.includes("hope3")
  ) {
    contextParts.push(
      `EDUCATION:\n${portfolioKnowledge.education.map(e => `- ${e.degree} at ${e.institution} (${e.details})`).join("\n")}`
    );
  }

  // Challenges, Arrears, Failures
  if (
    q.includes("arrear") ||
    q.includes("fail") ||
    q.includes("challenge") ||
    q.includes("error") ||
    q.includes("difficult") ||
    q.includes("english") ||
    q.includes("exam")
  ) {
    if (portfolioKnowledge.challengesAndFailures) {
      contextParts.push(`CHALLENGES & ACADEMIC ARREARS:\n${portfolioKnowledge.challengesAndFailures.map(c => `- ${c}`).join("\n")}`);
    }
  }

  // Strengths & Learning
  if (
    q.includes("strength") ||
    q.includes("fast learner") ||
    q.includes("learn") ||
    q.includes("best skill") ||
    q.includes("success")
  ) {
    if (portfolioKnowledge.strengths) {
      contextParts.push(`PRIMARY STRENGTHS:\n${portfolioKnowledge.strengths.map(s => `- ${s}`).join("\n")}`);
    }
  }

  // Brand, Motivation, Values & Future Vision
  if (
    q.includes("brand") ||
    q.includes("yazhven") ||
    q.includes("company") ||
    q.includes("motivation") ||
    q.includes("money") ||
    q.includes("goal") ||
    q.includes("future") ||
    q.includes("vision")
  ) {
    if (portfolioKnowledge.brandAndVision) {
      contextParts.push(`BRAND & FUTURE VISION: ${portfolioKnowledge.brandAndVision}`);
    }
    if (portfolioKnowledge.valuesAndMotivation) {
      contextParts.push(`MOTIVATION & VALUES:\n${portfolioKnowledge.valuesAndMotivation.map(v => `- ${v}`).join("\n")}`);
    }
  }

  // Services
  if (q.includes("service") || q.includes("offer") || q.includes("hire") || q.includes("do")) {
    contextParts.push(`SERVICES:\n${portfolioKnowledge.services.map(s => `- ${s}`).join("\n")}`);
  }

  // Contact
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("github") ||
    q.includes("linkedin") ||
    q.includes("instagram")
  ) {
    contextParts.push(`CONTACT:
- Email: ${portfolioKnowledge.contact.email}
- Phone: ${portfolioKnowledge.contact.phone}
- GitHub: ${portfolioKnowledge.contact.github}
- LinkedIn: ${portfolioKnowledge.contact.linkedin}
- Instagram: ${portfolioKnowledge.contact.instagram}`);
  }

  return contextParts.join("\n\n");
}
