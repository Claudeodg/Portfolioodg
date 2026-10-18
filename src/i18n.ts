export type Lang = 'de' | 'en'

export interface Project {
  name: string
  description: Record<Lang, string>
  tech: string[]
  repoUrl?: string
  demoUrl?: string
}

export interface Content {
  meta: { title: string }
  nav: { skills: string; projects: string; education: string; contact: string }
  hero: { name: string; heading: string; ctaProjects: string; ctaCv: string }
  intro: { text: string }
  skills: { heading: string; groups: { heading: string; items: string[] }[] }
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
      de: 'Full-Stack-Webanwendung mit Spring Boot (Backend) und JavaScript (Frontend). Benutzerauthentifizierung über Spring Security, MySQL-Datenbank und Integration der Gemini API zur dynamischen Wortgenerierung.',
      en: 'Full-stack web application with a Spring Boot backend and JavaScript frontend. User authentication via Spring Security, MySQL database, and Gemini API integration for dynamic word generation.',
    },
    tech: ['Spring Boot', 'Spring Security', 'MySQL', 'Gemini API', 'JavaScript'],
  },
  {
    name: 'BTC/USDT Trading Pipeline',
    description: {
      de: 'Echtzeit-Pipeline für Bitcoin-Kursdaten von der Binance-API: stündliche OHLCV-Daten in Neon-PostgreSQL, Transformationen mit dbt (SMA-7, SMA-20 und Kursänderung) und Orchestrierung mit Airflow. Öffentliches Streamlit-Dashboard mit Plotly.',
      en: 'Real-time Bitcoin price pipeline using Binance hourly OHLCV data, Neon PostgreSQL, dbt transformations (SMA-7, SMA-20 and hourly price change), and Airflow orchestration. Public Streamlit dashboard with Plotly.',
    },
    tech: ['Python 3.12', 'Airflow 2.9', 'dbt', 'PostgreSQL (Neon)', 'Streamlit', 'Plotly', 'Docker Compose'],
    repoUrl: 'https://github.com/Claudeodg/trading_pipeline',
    demoUrl: 'https://trading-sma.streamlit.app',
  },
]

const skillItems = {
  languages: ['Java', 'Kotlin', 'Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  tools: ['Spring Boot', 'JUnit', 'Git', 'GitHub', 'GitLab', 'MySQL', 'Linux'],
  data: ['NumPy', 'SciPy', 'Pandas', 'Matplotlib', 'Jupyter'],
}

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
    skills: {
      heading: 'Fähigkeiten',
      groups: [
        { heading: 'Programmiersprachen', items: skillItems.languages },
        { heading: 'Tools & Technologien', items: skillItems.tools },
        { heading: 'Data & Signalverarbeitung', items: skillItems.data },
      ],
    },
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
    skills: {
      heading: 'Skills',
      groups: [
        { heading: 'Languages', items: skillItems.languages },
        { heading: 'Tools & Technologies', items: skillItems.tools },
        { heading: 'Data & Signal Processing', items: skillItems.data },
      ],
    },
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
  cvUrl: '/CV_Sonafouo_Claude_se_14_10.pdf',
}

export function projectRepoUrl(projectName: string): string {
  return `https://github.com/Claudeodg/${projectName}.git`
}
