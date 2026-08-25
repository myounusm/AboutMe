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
import { sectionIcon, navIcon, type SectionIconId } from './section-icons.ts'

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

function renderSectionHeading(iconId: SectionIconId, title: string): string {
  return `
    <div class="section-title">
      <span class="section-icon" aria-hidden="true">${sectionIcon(iconId)}</span>
      <h2>${escapeHtml(title)}</h2>
    </div>`
}

function renderNavLink(href: string, iconId: SectionIconId, label: string): string {
  return `<a href="${escapeHtml(href)}"><span class="nav-icon" aria-hidden="true">${navIcon(iconId)}</span><span>${escapeHtml(label)}</span></a>`
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

function shortCompany(company: string): string {
  return company.split(/[|,]/)[0]?.trim() || company
}

function renderExperience(): string {
  return `
    <div class="exp-tabs reveal">
      <div class="exp-tab-rail">
        <button type="button" class="exp-tab-shift exp-tab-prev" aria-label="Previous experience" data-exp-shift="-1">
          <span aria-hidden="true">‹</span>
        </button>
        <div class="exp-tablist" role="tablist" aria-label="Work experience">
          ${experience
            .map(
              (job, index) => `
            <button
              type="button"
              class="exp-tab${index === 0 ? ' is-active' : ''}"
              role="tab"
              id="exp-tab-${index}"
              aria-selected="${index === 0 ? 'true' : 'false'}"
              aria-controls="exp-panel-${index}"
              data-exp-index="${index}"
            >
              <span class="exp-tab-logo" aria-hidden="true">
                <img src="${escapeHtml(job.logo)}" alt="" width="40" height="40" loading="lazy" />
              </span>
              <span class="exp-tab-copy">
                <span class="exp-tab-period">${escapeHtml(job.period)}</span>
                <span class="exp-tab-role">${escapeHtml(job.role)}</span>
                <span class="exp-tab-company">${escapeHtml(shortCompany(job.company))}</span>
              </span>
            </button>`,
            )
            .join('')}
        </div>
        <button type="button" class="exp-tab-shift exp-tab-next" aria-label="Next experience" data-exp-shift="1">
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <div class="exp-panels">
        ${experience
          .map(
            (job, index) => `
          <article
            class="exp-panel${index === 0 ? ' is-active' : ''}"
            role="tabpanel"
            id="exp-panel-${index}"
            aria-labelledby="exp-tab-${index}"
            ${index === 0 ? '' : 'hidden'}
          >
            <div class="exp-panel-head">
              <img
                class="exp-panel-logo"
                src="${escapeHtml(job.logo)}"
                alt="${escapeHtml(job.logoAlt)}"
                width="56"
                height="56"
                loading="lazy"
              />
              <div>
                <p class="exp-panel-period">${escapeHtml(job.period)}</p>
                <h3>${escapeHtml(job.role)}</h3>
                <p class="exp-panel-company">${escapeHtml(job.company)}</p>
              </div>
            </div>
            ${
              job.summary
                ? `<p class="exp-panel-summary">${escapeHtml(job.summary)}</p>`
                : ''
            }
            <ol class="exp-points">
              ${job.highlights
                .map(
                  (h, i) => `
                <li>
                  <span class="exp-point-num" aria-hidden="true">${i + 1}</span>
                  <span class="exp-point-text">${escapeHtml(h)}</span>
                </li>`,
                )
                .join('')}
            </ol>
            ${
              job.techStack
                ? `<p class="exp-panel-stack"><span>Technical Stack:</span> ${escapeHtml(job.techStack)}</p>`
                : ''
            }
          </article>`,
          )
          .join('')}
      </div>
    </div>`
}

function renderProjects(): string {
  return projects
    .map((project, index) => {
      const stackTags = project.stack
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join('')
      const linkHtml = project.link
        ? `<a
            class="flash-link"
            href="${escapeHtml(project.link)}"
            ${project.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
          >Open project</a>`
        : ''

      return `
      <article
        class="flash-card reveal"
        style="--i: ${index}"
        role="listitem"
        data-flash-card
      >
        <div
          class="flash-inner"
          tabindex="0"
          role="button"
          aria-expanded="false"
          aria-label="Flip card: ${escapeHtml(project.name)}"
          data-flash-toggle
        >
          <div class="flash-face flash-front" aria-hidden="false">
            <span class="flash-year">${escapeHtml(project.year)}</span>
            <h3>${escapeHtml(project.name)}</h3>
            <span class="flash-hint" aria-hidden="true">Tap to flip</span>
          </div>
          <div class="flash-face flash-back" aria-hidden="true">
            <p class="flash-desc">${escapeHtml(project.description)}</p>
            <ul class="flash-stack">${stackTags}</ul>
            ${linkHtml}
            <span class="flash-hint" aria-hidden="true">Tap to flip back</span>
          </div>
        </div>
      </article>`
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
      ${renderNavLink('#work', 'work', 'Work')}
      ${renderNavLink('#experience', 'experience', 'Experience')}
      ${renderNavLink('#skills', 'skills', 'Skills')}
      ${renderNavLink('#education', 'education', 'Education')}
      ${renderNavLink('#certifications', 'certifications', 'Certifications')}
      ${renderNavLink('#about', 'about', 'About')}
      ${renderNavLink('#contact', 'contact', 'Contact')}
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
        ${renderSectionHeading('work', 'Selected work')}
        <p>Recent platforms and integrations delivered in the insurance domain. Flip a card for details.</p>
      </div>
      <div class="flash-grid" role="list">
        ${renderProjects()}
      </div>
    </section>

    <section id="experience" class="section section-experience">
      <div class="section-head reveal">
        ${renderSectionHeading('experience', 'Experience')}
        <p>21+ years across insurance, aviation, and enterprise software.</p>
      </div>
      <div class="timeline">
        ${renderExperience()}
      </div>
    </section>

    <section id="skills" class="section section-skills">
      <div class="section-head reveal">
        ${renderSectionHeading('skills', skills.heading)}
        <p>${escapeHtml(skills.lead)}</p>
      </div>
      <div class="skills-grid">
        ${renderSkills()}
      </div>
    </section>

    <section id="education" class="section section-education">
      <div class="section-head reveal">
        ${renderSectionHeading('education', 'Education')}
        <p>Academic foundation in computer science.</p>
      </div>
      <div class="edu-list">
        ${renderEducation()}
      </div>
    </section>

    <section id="certifications" class="section section-certifications">
      <div class="section-head reveal">
        ${renderSectionHeading('certifications', certifications.heading)}
        <p>Professional credentials across OutSystems, Microsoft, and agile delivery.</p>
      </div>
      ${renderCertifications()}
    </section>

    <section id="about" class="section section-about">
      <div class="about-layout">
        <div class="section-head reveal">
          ${renderSectionHeading('about', about.heading)}
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
            ${renderSectionHeading('contact', contact.heading)}
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

function initFlashCards(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-flash-card]')
  if (!cards.length) return

  const setFlipped = (card: HTMLElement, flipped: boolean) => {
    card.classList.toggle('is-flipped', flipped)
    const toggle = card.querySelector<HTMLElement>('[data-flash-toggle]')
    const front = card.querySelector<HTMLElement>('.flash-front')
    const back = card.querySelector<HTMLElement>('.flash-back')
    toggle?.setAttribute('aria-expanded', flipped ? 'true' : 'false')
    front?.setAttribute('aria-hidden', flipped ? 'true' : 'false')
    back?.setAttribute('aria-hidden', flipped ? 'false' : 'true')
  }

  cards.forEach((card) => {
    const toggle = card.querySelector<HTMLElement>('[data-flash-toggle]')
    if (!toggle) return

    const flipFromEvent = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('.flash-link')) return
      setFlipped(card, !card.classList.contains('is-flipped'))
    }

    // Whole card surface is clickable (faces + empty padding).
    card.addEventListener('click', flipFromEvent)

    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setFlipped(card, !card.classList.contains('is-flipped'))
      } else if (event.key === 'Escape' && card.classList.contains('is-flipped')) {
        event.preventDefault()
        setFlipped(card, false)
      }
    })
  })
}

function initExperienceTabs(): void {
  const root = document.querySelector<HTMLElement>('.exp-tabs')
  if (!root) return

  const tablist = root.querySelector<HTMLElement>('.exp-tablist')
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('.exp-tab'))
  const panels = Array.from(root.querySelectorAll<HTMLElement>('.exp-panel'))
  const prevBtn = root.querySelector<HTMLButtonElement>('.exp-tab-prev')
  const nextBtn = root.querySelector<HTMLButtonElement>('.exp-tab-next')
  let activeIndex = 0

  const scrollTabIntoView = (index: number) => {
    const tab = tabs[index]
    if (!tab || !tablist) return

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth'

    // Keep the selected tab centered in the horizontal strip when possible.
    const listWidth = tablist.clientWidth
    const target =
      tab.offsetLeft - (listWidth - tab.offsetWidth) / 2
    tablist.scrollTo({
      left: Math.max(0, target),
      behavior,
    })
  }

  const updateShiftButtons = (index: number) => {
    prevBtn?.toggleAttribute('disabled', index <= 0)
    nextBtn?.toggleAttribute('disabled', index >= tabs.length - 1)
  }

  const activate = (index: number, options?: { focus?: boolean }) => {
    activeIndex = index

    tabs.forEach((tab, i) => {
      const selected = i === index
      tab.classList.toggle('is-active', selected)
      tab.setAttribute('aria-selected', selected ? 'true' : 'false')
      tab.tabIndex = selected ? 0 : -1
    })

    panels.forEach((panel, i) => {
      const selected = i === index
      panel.classList.toggle('is-active', selected)
      panel.toggleAttribute('hidden', !selected)
      if (selected) {
        panel.classList.remove('is-entering')
        void panel.offsetWidth
        panel.classList.add('is-entering')
      }
    })

    updateShiftButtons(index)
    scrollTabIntoView(index)

    if (options?.focus) {
      tabs[index]?.focus({ preventScroll: true })
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index))
    tab.addEventListener('keydown', (event) => {
      let next = index
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        next = Math.min(tabs.length - 1, index + 1)
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        next = Math.max(0, index - 1)
      } else if (event.key === 'Home') {
        next = 0
      } else if (event.key === 'End') {
        next = tabs.length - 1
      } else {
        return
      }
      event.preventDefault()
      activate(next, { focus: true })
    })
  })

  prevBtn?.addEventListener('click', () => {
    if (activeIndex > 0) activate(activeIndex - 1)
  })

  nextBtn?.addEventListener('click', () => {
    if (activeIndex < tabs.length - 1) activate(activeIndex + 1)
  })

  // Swipe the panel left/right on touch devices to change tabs.
  let touchStartX = 0
  let touchStartY = 0
  const panelsRoot = root.querySelector<HTMLElement>('.exp-panels')
  panelsRoot?.addEventListener(
    'touchstart',
    (event) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      touchStartX = touch.clientX
      touchStartY = touch.clientY
    },
    { passive: true },
  )
  panelsRoot?.addEventListener(
    'touchend',
    (event) => {
      const touch = event.changedTouches[0]
      if (!touch) return
      const dx = touch.clientX - touchStartX
      const dy = touch.clientY - touchStartY
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return
      if (dx < 0 && activeIndex < tabs.length - 1) {
        activate(activeIndex + 1)
      } else if (dx > 0 && activeIndex > 0) {
        activate(activeIndex - 1)
      }
    },
    { passive: true },
  )

  activate(0)
}

function initActiveNav(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav a[href^="#"]'))
  if (!links.length) return

  const sections = links
    .map((link) => {
      const id = link.getAttribute('href')?.slice(1)
      if (!id) return null
      const section = document.getElementById(id)
      return section ? { link, section } : null
    })
    .filter((item): item is { link: HTMLAnchorElement; section: HTMLElement } => Boolean(item))

  const setActive = (activeLink: HTMLAnchorElement | null) => {
    links.forEach((link) => {
      const selected = link === activeLink
      link.classList.toggle('is-active', selected)
      if (selected) {
        link.setAttribute('aria-current', 'true')
      } else {
        link.removeAttribute('aria-current')
      }
    })
  }

  links.forEach((link) => {
    link.addEventListener('click', () => setActive(link))
  })

  if (!('IntersectionObserver' in window) || !sections.length) {
    return
  }

  const visible = new Map<Element, number>()

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.set(entry.target, entry.intersectionRatio)
        } else {
          visible.delete(entry.target)
        }
      })

      const best = sections.reduce<{ link: HTMLAnchorElement; ratio: number } | null>(
        (current, { link, section }) => {
          const ratio = visible.get(section) ?? 0
          if (!current || ratio > current.ratio) {
            return { link, ratio }
          }
          return current
        },
        null,
      )

      if (best && best.ratio > 0) {
        setActive(best.link)
      }
    },
    {
      rootMargin: '-28% 0px -55% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    },
  )

  sections.forEach(({ section }) => observer.observe(section))
}

requestAnimationFrame(() => {
  document.body.classList.add('is-ready')
  initReveal()
  initHeader()
  initHeroParallax()
  initFlashCards()
  initExperienceTabs()
  initActiveNav()
})
