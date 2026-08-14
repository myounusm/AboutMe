import './style.css'
import {
  profile,
  about,
  experience,
  skills,
  projects,
  education,
  certifications,
  contact,
} from './content.ts'
import { iconForSkill } from './skill-icons.ts'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Root element #app not found')
}

function escapeHtml(value: string | number): string {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderSkills(): string {
  return skills.groups
    .map(
      (group) => `
      <div class="skill-group reveal">
        <h3 class="skill-label">${escapeHtml(group.label)}</h3>
        <ul class="skill-list">
          ${group.items
            .map(
              (item) => `
            <li>
              ${iconForSkill(item)}
              <span>${escapeHtml(item)}</span>
            </li>`,
            )
            .join('')}
        </ul>
      </div>`,
    )
    .join('')
}

function renderExperience(): string {
  // Oldest → newest for left-to-right career progression
  const items = [...experience].reverse()

  return `
    <div class="timeline-wrap reveal">
      <div class="timeline-scroll" tabindex="0" aria-label="Career timeline">
        <div class="timeline-track" aria-hidden="true">
          <div class="timeline-progress"></div>
        </div>
        <ol class="timeline">
          ${items
            .map(
              (job, index) => `
            <li class="timeline-item" style="--i: ${index}">
              <div class="timeline-node" aria-hidden="true">
                <span class="timeline-dot"></span>
              </div>
              <article class="timeline-card">
                <p class="timeline-period">${escapeHtml(job.period)}</p>
                <h3>${escapeHtml(job.role)}</h3>
                <p class="timeline-company">${escapeHtml(job.company)}</p>
                <p class="timeline-summary">${escapeHtml(job.summary)}</p>
                <ul>
                  ${job.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
                </ul>
              </article>
            </li>`,
            )
            .join('')}
        </ol>
      </div>
      <p class="timeline-hint">Scroll sideways to explore the full career path →</p>
    </div>`
}

function renderProjects(): string {
  return projects
    .map((project) => {
      const inner = `
        <div class="project-main">
          <div class="project-title-row">
            <h3>${escapeHtml(project.name)}</h3>
            <span class="project-year">${escapeHtml(project.year)}</span>
          </div>
          <p>${escapeHtml(project.description)}</p>
          <p class="project-stack">${project.stack.map(escapeHtml).join(' · ')}</p>
        </div>`

      if (project.link) {
        return `
      <a
        class="project-row reveal"
        href="${escapeHtml(project.link)}"
        ${project.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
      >
        ${inner}
        <span class="project-arrow" aria-hidden="true">→</span>
      </a>`
      }

      return `<article class="project-row project-row-static reveal">${inner}</article>`
    })
    .join('')
}

function renderEducation(): string {
  return education
    .map(
      (item) => `
      <article class="edu-item reveal">
        <h3>${escapeHtml(item.degree)}</h3>
        <p>${escapeHtml(item.school)} · ${escapeHtml(item.period)}</p>
      </article>`,
    )
    .join('')
}

function renderCertifications(): string {
  return `
    <ul class="cert-list reveal">
      ${certifications.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>`
}

const socialLinks = [
  profile.github
    ? `<a href="${escapeHtml(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`
    : '',
  profile.linkedin
    ? `<a href="${escapeHtml(profile.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`
    : '',
  profile.phone
    ? `<a href="tel:${escapeHtml(profile.phone.replace(/\s+/g, ''))}">Call</a>`
    : '',
  `<a href="mailto:${escapeHtml(profile.email)}">Email</a>`,
  profile.resumeUrl
    ? `<a href="${escapeHtml(profile.resumeUrl)}" download>Download CV</a>`
    : '',
]
  .filter(Boolean)
  .join('')

app.innerHTML = `
  <div class="page-bg" aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>

  <header class="site-header">
    <a class="brand" href="#top">${escapeHtml(profile.shortName)}</a>
    <nav class="nav" aria-label="Primary">
      <a href="#work">Work</a>
      <a href="#experience">Experience</a>
      <a href="#skills">Skills</a>
      <a href="#education">Education</a>
      <a href="#certifications">Certifications</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-label="Introduction">
      <div
        class="hero-media"
        style="--hero-image: url('${escapeHtml(profile.heroImage)}')"
        role="img"
        aria-label="${escapeHtml(profile.heroImageAlt)}"
      ></div>
      <div class="hero-veil"></div>
      <div class="hero-content">
        <p class="hero-brand reveal-hero" style="--d: 0">${escapeHtml(profile.name)}</p>
        <h1 class="hero-title reveal-hero" style="--d: 1">
          ${escapeHtml(profile.headline)}
        </h1>
        <p class="hero-tagline reveal-hero" style="--d: 2">${escapeHtml(profile.tagline)}</p>
        <p class="hero-built reveal-hero" style="--d: 3">${escapeHtml(profile.builtWithLine)}</p>
        <div class="hero-actions reveal-hero" style="--d: 4">
          <a class="btn btn-primary" href="#work">View work</a>
          <a class="btn btn-ghost" href="${escapeHtml(profile.resumeUrl)}" download>Download CV</a>
        </div>
      </div>
      <a class="scroll-hint reveal-hero" style="--d: 5" href="#work" aria-label="Scroll to work">
        <span></span>
      </a>
    </section>

    <section id="work" class="section section-work">
      <div class="section-head reveal">
        <h2>Selected work</h2>
        <p>Recent platforms and integrations delivered in the insurance domain.</p>
      </div>
      <div class="project-list">
        ${renderProjects()}
      </div>
    </section>

    <section id="experience" class="section section-experience">
      <div class="section-head reveal">
        <h2>Experience</h2>
        <p>21+ years across insurance, aviation, and enterprise software.</p>
      </div>
      <div class="timeline">
        ${renderExperience()}
      </div>
    </section>

    <section id="skills" class="section section-skills">
      <div class="section-head reveal">
        <h2>${escapeHtml(skills.heading)}</h2>
        <p>${escapeHtml(skills.lead)}</p>
      </div>
      <div class="skills-grid">
        ${renderSkills()}
      </div>
    </section>

    <section id="education" class="section section-education">
      <div class="section-head reveal">
        <h2>Education</h2>
        <p>Academic foundation in computer science.</p>
      </div>
      <div class="edu-list">
        ${renderEducation()}
      </div>
    </section>

    <section id="certifications" class="section section-certifications">
      <div class="section-head reveal">
        <h2>${escapeHtml(certifications.heading)}</h2>
        <p>Professional credentials across OutSystems, Microsoft, and agile delivery.</p>
      </div>
      ${renderCertifications()}
    </section>

    <section id="about" class="section section-about">
      <div class="about-layout">
        <div class="section-head reveal">
          <h2>${escapeHtml(about.heading)}</h2>
          <p class="about-lead">${escapeHtml(about.lead)}</p>
        </div>
        <p class="about-body reveal">${escapeHtml(about.body)}</p>
      </div>
    </section>

    <section id="contact" class="section section-contact">
      <div class="contact-panel reveal">
        <div class="contact-layout">
          <div class="contact-photo-wrap">
            <img
              class="contact-photo"
              src="${escapeHtml(profile.photoUrl)}"
              alt="${escapeHtml(profile.photoAlt)}"
              width="160"
              height="160"
            />
          </div>
          <div class="contact-copy">
            <h2>${escapeHtml(contact.heading)}</h2>
            <p>${escapeHtml(contact.body)}</p>
            <p class="contact-meta">${escapeHtml(profile.location)} · ${escapeHtml(profile.phone)}</p>
            <div class="contact-actions">
              <a class="btn btn-primary" href="mailto:${escapeHtml(profile.email)}">${escapeHtml(contact.cta)}</a>
              <div class="socials">${socialLinks}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>© ${new Date().getFullYear()} ${escapeHtml(profile.name)}</p>
    <a href="#top">Back to top</a>
  </footer>
`

function initReveal(): void {
  const nodes = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )

  nodes.forEach((node) => observer.observe(node))
}

function initHeader(): void {
  const header = document.querySelector('.site-header')
  if (!header) return

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

function initHeroParallax(): void {
  const media = document.querySelector<HTMLElement>('.hero-media')
  if (!media || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  let ticking = false
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        media.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.06)`
        ticking = false
      })
    },
    { passive: true },
  )
}

function initTimeline(): void {
  const wrap = document.querySelector<HTMLElement>('.timeline-wrap')
  const scroller = document.querySelector<HTMLElement>('.timeline-scroll')
  const progress = document.querySelector<HTMLElement>('.timeline-progress')
  if (!wrap || !scroller || !progress) return

  const updateProgress = () => {
    const max = scroller.scrollWidth - scroller.clientWidth
    const ratio = max > 0 ? scroller.scrollLeft / max : 1
    progress.style.transform = `scaleX(${Math.max(0.08, ratio)})`
  }

  scroller.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress()

  // Convert vertical wheel to horizontal scroll when over the timeline
  scroller.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      if (scroller.scrollWidth <= scroller.clientWidth) return
      event.preventDefault()
      scroller.scrollLeft += event.deltaY
    },
    { passive: false },
  )

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wrap.classList.add('is-animated')
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          wrap.classList.add('is-animated')
          observer.unobserve(wrap)
        }
      })
    },
    { threshold: 0.25 },
  )
  observer.observe(wrap)
}

requestAnimationFrame(() => {
  document.body.classList.add('is-ready')
  initReveal()
  initHeader()
  initHeroParallax()
  initTimeline()
})
