export type Lang = 'de' | 'en'

export interface Project {
  name: string
  description: Record<Lang, string>
  tech: string[]
}

export interface Content {
  meta: { title: string }
  nav: { skills: string; projects: string; education: string; contact: string }
  hero: { name: string; heading: string; ctaProjects: string; ctaCv: string }
  intro: { text: string }
  skills: { heading: string; items: string[] }
  projects: { heading: string; items: Project[] }
  education: {
    heading: string
    institution: string
    degree: string
    status: string
  }
  contact: { heading: string; email: string; github: string; linkedin: string }
  langToggle: string
}

const projects: Project[] = [
  {
    name: 'KartenTreppe',
    description: {
      de: '2-Spieler-Kartenspiel in Kotlin mit grafischer Oberfläche (BGW-Framework), entwickelt im Rahmen des Softwarepraktikums der TU Dortmund.',
      en: "2-player card game built in Kotlin with a graphical interface (BGW framework), developed as part of TU Dortmund's software practicum.",
    },
    tech: ['Kotlin', 'BGW'],
  },
  {
    name: 'Faraway',
    description: {
      de: 'Netzwerkbasiertes Gruppenprojekt im Softwarepraktikum — Mehrspieler-Spiellogik mit Client-Server-Kommunikation.',
      en: 'Network-based group project from the software practicum — multiplayer game logic with client-server communication.',
    },
    tech: ['Kotlin', 'BGW', 'Networking'],
  },
  {
    name: 'AzerType',
    description: {
      de: 'Full-Stack-Webanwendung mit Spring Boot, MySQL und Flask, deployt auf Oracle Cloud.',
      en: 'Full-stack web application built with Spring Boot, MySQL and Flask, deployed on Oracle Cloud.',
    },
    tech: ['Spring Boot', 'MySQL', 'Flask', 'Oracle Cloud'],
  },
  {
    name: 'ApplyFlow',
    description: {
      de: 'Automatisierte Jobsuche-Pipeline mit n8n, die die Bundesagentur-API, Gemini und Gmail verbindet.',
      en: 'Automated job-search pipeline built with n8n, connecting the Bundesagentur API, Gemini, and Gmail.',
    },
    tech: ['n8n', 'Bundesagentur API', 'Gemini', 'Gmail API'],
  },
]

const skills = ['Java', 'Kotlin', 'Python', 'TypeScript', 'React', 'Spring Boot', 'SQL']

export const content: Record<Lang, Content> = {
  de: {
    meta: { title: 'Claude Sonafouo — Software Entwickler' },
    nav: {
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      education: 'Ausbildung',
      contact: 'Kontakt',
    },
    hero: {
      name: 'Claude Sonafouo',
      heading: 'Hallo, ich bin Claude Sonafouo.',
      ctaProjects: 'Projekte ansehen',
      ctaCv: 'Lebenslauf herunterladen',
    },
    intro: {
      text: 'Software Entwickler mit Sitz in Dortmund — Informatik-Student an der TU Dortmund im letzten Semester. Aktuell arbeite ich an meiner Bachelorarbeit zur akustischen Signalanalyse für die Rattermarken-Erkennung bei Zerspanungsprozessen, betreut von Prof. Wiederkehr und Dr. Finkeldey. Meine Erfahrung reicht von Full-Stack-Webentwicklung bis zu Backend-Services in Kotlin und Java.',
    },
    skills: { heading: 'Fähigkeiten', items: skills },
    projects: { heading: 'Projekte', items: projects },
    education: {
      heading: 'Ausbildung',
      institution: 'TU Dortmund',
      degree: 'B.Sc. Informatik',
      status: 'Abschluss in Kürze',
    },
    contact: {
      heading: 'Kontakt',
      email: 'E-Mail',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    langToggle: 'EN',
  },
  en: {
    meta: { title: 'Claude Sonafouo — Software Developer' },
    nav: {
      skills: 'Skills',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      name: 'Claude Sonafouo',
      heading: "Hi, I'm Claude Sonafouo.",
      ctaProjects: 'View my projects',
      ctaCv: 'Download CV',
    },
    intro: {
      text: "Software Developer based in Dortmund — Computer Science student at TU Dortmund in my final semester. I'm currently working on my Bachelor's thesis on audio signal analysis for chatter vibration detection in machining processes, supervised by Prof. Wiederkehr and Dr. Finkeldey. My experience spans full-stack web development and backend services in Kotlin and Java.",
    },
    skills: { heading: 'Skills', items: skills },
    projects: { heading: 'Projects', items: projects },
    education: {
      heading: 'Education',
      institution: 'TU Dortmund',
      degree: 'B.Sc. Computer Science',
      status: 'Graduating soon',
    },
    contact: {
      heading: 'Contact',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    langToggle: 'DE',
  },
}

export const contactInfo = {
  email: 'sonafouobonte@gmail.com',
  github: 'https://github.com/Claudeodg',
  githubLabel: 'github.com/Claudeodg',
  linkedin: 'https://linkedin.com/in/claudeodg',
  linkedinLabel: 'linkedin.com/in/claudeodg',
  cvUrl: '/CV_Sonafouo_26.02.2026.pdf',
}

export function projectRepoUrl(projectName: string): string {
  return `https://github.com/Claudeodg/${projectName}.git`
}
