export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  badges?: string[];
}

export interface Education {
  degree: string;
  field: string;
  school: string;
  start: string;
  end: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

/** Work history — newest first. Shown on /work */
export const experiences: Experience[] = [
  {
    role: "Medical Laboratory Scientist & Epic Beaker Super User",
    company: "Northwestern Medicine",
    location: "Chicago, IL",
    start: "Jul 2018",
    end: "Present",
    current: true,
    summary:
      "Supported hospital-wide LIS migration to Epic Beaker, providing workflow validation, end-user guidance, and frontline technical issue triage.",
    bullets: [
      "System Migration & Go-Live: Supported hospital-wide LIS migration from Cerner to Epic Beaker, providing at-the-elbow support and workflow validation to ensure continuity of patient care.",
      "End-User Guidance & Training: Guide lab staff across all shifts on new Beaker features, optimized workflows, and best practices. Authored accessible reference guides to ease adoption and reduce basic IT support requests.",
      "Frontline Support: Serve as the initial point of escalation for lab staff encountering Beaker issues. Triage incoming problems to distinguish between training gaps and application defects, streamlining the escalation process to technical teams.",
    ],
    badges: ["Epic Beaker", "Cerner", "LIS Migration", "Healthcare Tech", "Data Integrity"],
  },
  {
    role: "Open Source Contributor",
    company: "Electrify Chicago",
    location: "Chicago, IL (Remote)",
    start: "Apr 2025",
    end: "Present",
    current: true,
    summary:
      "Engineered features and validated deployments for an open-source citywide emissions data platform in an Agile workflow.",
    bullets: [
      "Engineered features and resolved bugs by independently claiming and executing GitHub issues for a citywide emissions data platform, driving tickets from development to PR approval.",
      "Validated deployment integrity by performing manual QA and analyzing automated Playwright test reports within GitHub Actions CI/CD pipelines to ensure parity across environments.",
      "Collaborated with a distributed engineering team in an Agile workflow, participating in feature planning, ideation sessions, and peer code reviews.",
    ],
    badges: ["Vue", "GraphQL", "Pandas", "Playwright", "GitHub Actions", "CI/CD"],
  },
  {
    role: "Section Leader",
    company: "Stanford University",
    location: "Palo Alto, CA (Remote)",
    start: "Apr 2025",
    end: "Present",
    current: true,
    summary:
      "Instruct and mentor a selective remote student cohort on software engineering fundamentals and critical debugging practices.",
    bullets: [
      "Teach core Python concepts and software engineering best practices to a highly selective remote student cohort.",
      "Foster resilient problem-solving by instructing students on how to critically evaluate and debug AI-generated code.",
    ],
    badges: ["Python", "Mentorship", "Code Review", "Pedagogy"],
  },
];

export const educations: Education[] = [
  {
    degree: "B.S.",
    field: "Computer Science",
    school: "Western Governors University",
    start: "Mar 2023",
    end: "Expected Jan 2027",
  },
  {
    degree: "B.S.",
    field: "Medical Lab Science",
    school: "University of Minnesota",
    start: "Sep 2013",
    end: "Dec 2017",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "Go", "Java", "C#", "SQL", "HTML/CSS"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Vue", "Spring", ".NET", "Pandas"],
  },
  {
    title: "Tools & Cloud",
    skills: [
      "Docker",
      "Git",
      "GitHub Actions",
      "GCP (Cloud Run, Cloud Build, Firestore)",
      "Cloudflare Workers",
      "Playwright",
      "Terraform",
      "Ansible",
      "GraphQL",
    ],
  },
];

/** Words typed out one character at a time in the hero */
export const typingRoles = [
  'Full Stack web developer',
  'Avid cyclist',
  'Scientist',
  'Cat and dog lover',
  'Pythonista',
  'Gopher',
];
