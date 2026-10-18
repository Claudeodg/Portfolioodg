import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { content, contactInfo, projectRepoUrl, type Lang } from './i18n.ts'
import { detectInitialTheme, applyTheme, type Theme } from './theme.ts'
import { initParticles, refreshParticlesTheme } from './particles.ts'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

const LANG_STORAGE_KEY = 'lang'

function detectInitialLang(): Lang {
  const saved = localStorage.getItem(LANG_STORAGE_KEY)
  if (saved === 'de' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

let lang: Lang = detectInitialLang()
let theme: Theme = detectInitialTheme()

const app = document.querySelector<HTMLDivElement>('#app')!
initParticles()

const sunIcon = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><path d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.6 4.4l-1.4 1.4M5.8 14.2l-1.4 1.4M15.6 15.6l-1.4-1.4M5.8 5.8 4.4 4.4"/></svg>`
const moonIcon = `<svg viewBox="0 0 20 20" fill="currentColor"><path d="M17.3 12.8A7.6 7.6 0 0 1 7.2 2.7a.6.6 0 0 0-.7-.9A8.8 8.8 0 1 0 18.2 13.5a.6.6 0 0 0-.9-.7"/></svg>`

function splitWords(text: string): string {
  return text
    .split(' ')
    .map((word) => `<span class="word-mask"><span class="word">${word}</span></span>`)
    .join(' ')
}

app.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('a[href^="#"]')
  if (!target) return
  const href = target.getAttribute('href')
  if (!href || href.length < 2) return
  const el = document.querySelector(href)
  if (!el) return
  e.preventDefault()
  lenis.scrollTo(el as HTMLElement, { offset: -72 })
})

function render() {
  const t = content[lang]
  document.documentElement.lang = lang
  document.title = t.meta.title

  app.innerHTML = `
    <header id="site-header">
      <nav>
        <a class="brand" href="#top">
          <span class="brand-mark">CS</span>
          ${t.hero.name}
        </a>
        <div class="nav-wrap">
          <ul class="nav-links">
            <li><a href="#skills">${t.nav.skills}</a></li>
            <li><a href="#projects">${t.nav.projects}</a></li>
            <li><a href="#education">${t.nav.education}</a></li>
            <li><a href="#contact">${t.nav.contact}</a></li>
          </ul>
          <span class="nav-indicator" aria-hidden="true"></span>
        </div>
        <div class="header-controls">
          <button id="theme-toggle" type="button" aria-label="Toggle dark mode">${theme === 'dark' ? sunIcon : moonIcon}</button>
          <button id="lang-toggle" type="button" aria-label="Switch language">${t.langToggle}</button>
        </div>
      </nav>
    </header>

    <section id="top" class="hero">
      <span class="corner-triangle corner-triangle--tl" aria-hidden="true"></span>
      <span class="corner-triangle corner-triangle--br" aria-hidden="true"></span>
      <div class="hero-content">
        <h1>${splitWords(t.hero.heading)}</h1>
        <p class="intro-text">${t.intro.text}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${contactInfo.cvUrl}" download="Claude_Sonafouo_CV.pdf">
            <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#download-icon"></use></svg>
            ${t.hero.ctaCv}
          </a>
          <a class="btn btn-primary" href="#projects">
            ${t.hero.ctaProjects}
            <svg class="icon btn-arrow" role="presentation" aria-hidden="true"><use href="/icons.svg#arrow-right-icon"></use></svg>
          </a>
        </div>
      </div>
      <div class="hero-social">
        <a href="mailto:${contactInfo.email}" aria-label="Email">
          <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#mail-icon"></use></svg>
        </a>
        <a href="${contactInfo.github}" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
        </a>
        <a href="${contactInfo.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#linkedin-icon"></use></svg>
        </a>
      </div>
    </section>

    <section id="skills">
      <h2>${t.skills.heading}</h2>
      <div class="skill-groups">
        ${t.skills.groups
          .map(
            (group) => `
          <div class="skill-group">
            <h3 class="skill-group-title">${group.heading}</h3>
            <ul class="skill-list">
              ${group.items.map((skill) => `<li class="skill-pill">${skill}</li>`).join('')}
            </ul>
          </div>
        `,
          )
          .join('')}
      </div>
    </section>

    <section id="projects">
      <h2>${t.projects.heading}</h2>
      <div class="project-grid">
        ${t.projects.items
          .map(
            (project) => `
          <article class="project-card">
            <div class="project-card-head">
              <h3>${project.name}</h3>
              <div class="project-card-links">
                <a href="${project.repoUrl ?? projectRepoUrl(project.name)}" target="_blank" rel="noreferrer" aria-label="${project.name} on GitHub">
                  <svg class="icon repo-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
                </a>
                ${
                  project.demoUrl
                    ? `
                <a href="${project.demoUrl}" target="_blank" rel="noreferrer" aria-label="${project.name} live demo">
                  <svg class="icon repo-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#external-link-icon"></use></svg>
                </a>
                `
                    : ''
                }
              </div>
            </div>
            <p>${project.description[lang]}</p>
            <ul class="tech-list">
              ${project.tech.map((tech) => `<li class="tech-pill">${tech}</li>`).join('')}
            </ul>
          </article>
        `,
          )
          .join('')}
      </div>
    </section>

    <section id="education">
      <h2>${t.education.heading}</h2>
      <div class="education-entry">
        <h3>${t.education.institution}</h3>
        <p>${t.education.degree}</p>
        <p class="status">${t.education.status}</p>
      </div>
    </section>

    <section id="contact">
      <h2>${t.contact.heading}</h2>
      <ul class="contact-list">
        <li>
          <a href="mailto:${contactInfo.email}">
            <svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#mail-icon"></use></svg>
            ${contactInfo.email}
          </a>
        </li>
        <li>
          <a href="${contactInfo.github}" target="_blank" rel="noreferrer">
            <svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>
            ${contactInfo.githubLabel}
          </a>
        </li>
        <li>
          <a href="${contactInfo.linkedin}" target="_blank" rel="noreferrer">
            <svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#linkedin-icon"></use></svg>
            ${contactInfo.linkedinLabel}
          </a>
        </li>
      </ul>
    </section>

    <footer>
      <span class="corner-triangle corner-triangle--br footer-triangle" aria-hidden="true"></span>
      <p>&copy; ${new Date().getFullYear()} ${t.hero.name}</p>
    </footer>
  `

  document.querySelector<HTMLButtonElement>('#lang-toggle')!.addEventListener('click', () => {
    lang = lang === 'de' ? 'en' : 'de'
    localStorage.setItem(LANG_STORAGE_KEY, lang)
    rerenderWithCrossfade()
  })

  document.querySelector<HTMLButtonElement>('#theme-toggle')!.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark'
    applyTheme(theme)
    refreshParticlesTheme()
    rerenderWithCrossfade()
  })

  animate()
}

function rerenderWithCrossfade() {
  gsap.to(app, {
    opacity: 0,
    duration: 0.18,
    ease: 'power1.out',
    onComplete: () => {
      render()
      gsap.fromTo(app, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.out' })
    },
  })
}

function animate() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('#site-header', { y: -20, opacity: 0, duration: 0.6 })
    .from('.hero h1 .word', { yPercent: 120, duration: 0.7, stagger: 0.06 }, '-=0.3')
    .from(
      '.hero .intro-text, .hero .hero-actions',
      { y: 24, opacity: 0, duration: 0.8, stagger: 0.15 },
      '-=0.4',
    )
    .from('.hero-social a', { opacity: 0, x: 12, duration: 0.6, stagger: 0.15 }, '-=0.5')

  gsap.from('#education > *', {
    scrollTrigger: { trigger: '#education', start: 'top 82%' },
    y: 24,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
  })

  gsap.from('#skills .skill-pill', {
    scrollTrigger: { trigger: '#skills', start: 'top 82%' },
    y: 16,
    opacity: 0,
    duration: 0.5,
    stagger: 0.04,
    ease: 'power2.out',
  })

  gsap.from('#projects h2, #projects .project-card', {
    scrollTrigger: { trigger: '#projects', start: 'top 82%' },
    y: 28,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
  })

  gsap.from('#contact h2, #contact .contact-list li', {
    scrollTrigger: { trigger: '#contact', start: 'top 82%' },
    y: 16,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'power2.out',
  })

  gsap.to('.corner-triangle--tl', {
    y: 60,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  gsap.to('.corner-triangle--br', {
    y: -40,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  gsap.to('.footer-triangle', {
    y: -30,
    ease: 'none',
    scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
  })

  initScrollSpy()
}

function initScrollSpy() {
  const indicator = document.querySelector<HTMLElement>('.nav-indicator')
  if (!indicator) return

  const sections = ['skills', 'projects', 'education', 'contact']
  const links: Record<string, HTMLAnchorElement | null> = {}
  for (const id of sections) {
    links[id] = document.querySelector<HTMLAnchorElement>(`.nav-links a[href="#${id}"]`)
  }

  function setActive(id: string) {
    const link = links[id]
    if (!link) return
    gsap.to(indicator, {
      left: link.offsetLeft,
      width: link.offsetWidth,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  for (const id of sections) {
    ScrollTrigger.create({
      trigger: `#${id}`,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActive(id),
      onEnterBack: () => setActive(id),
    })
  }

  ScrollTrigger.create({
    trigger: '#top',
    start: 'top center',
    end: 'bottom center',
    onEnter: () => gsap.to(indicator, { opacity: 0, duration: 0.3 }),
    onEnterBack: () => gsap.to(indicator, { opacity: 0, duration: 0.3 }),
  })
}

render()
