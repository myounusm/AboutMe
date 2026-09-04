/**
 * Builds a print-ready CV PDF from src/content.ts into public/Mohammed_Younus_CV.pdf
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'
import {
  about,
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
} from '../src/content.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const outPdf = join(root, 'public', 'Mohammed_Younus_CV.pdf')
const outHtml = join(root, 'scripts', '.cv-preview.html')

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const website = 'https://www.myounusm.in'

/** Keep the CV crisp: full detail for recent roles, condensed for early career. */
const highlightLimitFor = (index: number, total: number) => {
  if (index <= 2) return total
  if (index === 3) return Math.min(4, total)
  return Math.min(3, total)
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(profile.name)} — CV</title>
  <style>
    @page {
      size: A4;
      margin: 10mm 11mm 10mm 11mm;
    }
    :root {
      --ink: #14232b;
      --ink-soft: #3a4d57;
      --sea: #1a6b63;
      --sea-deep: #0f4d48;
      --brass: #b08d57;
      --line: rgba(20, 35, 43, 0.14);
      --mist: #eef3f1;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      color: var(--ink);
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 8.7pt;
      line-height: 1.32;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    h1, h2, h3 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-weight: 650;
      letter-spacing: -0.02em;
      color: var(--sea-deep);
    }
    p { margin: 0; }
    ul { margin: 0.25rem 0 0; padding-left: 1.05rem; }
    li { margin: 0.12rem 0; }
    a { color: var(--sea-deep); text-decoration: none; }

    .sheet { max-width: 190mm; margin: 0 auto; }

    .header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.85rem;
      align-items: end;
      padding-bottom: 0.7rem;
      border-bottom: 2.5px solid var(--sea-deep);
    }
    .name {
      font-size: 20pt;
      line-height: 1.05;
      color: var(--sea-deep);
    }
    .title {
      margin-top: 0.15rem;
      font-size: 10pt;
      font-weight: 650;
      color: var(--sea);
      font-family: Georgia, serif;
    }
    .tagline {
      margin-top: 0.22rem;
      color: var(--ink-soft);
      max-width: 42rem;
      font-size: 8.2pt;
    }
    .meta {
      text-align: right;
      font-size: 7.9pt;
      color: var(--ink-soft);
      line-height: 1.45;
    }
    .meta strong { color: var(--ink); font-weight: 650; }

    .section { margin-top: 0.65rem; }
    .section-title {
      display: flex;
      align-items: baseline;
      gap: 0.55rem;
      margin-bottom: 0.3rem;
      font-size: 9.5pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--sea-deep);
      border-bottom: 1px solid var(--line);
      padding-bottom: 0.12rem;
    }
    .section-title span {
      flex: 1;
      height: 0;
      border-top: 1px solid transparent;
    }

    .summary {
      color: var(--ink);
      font-size: 9.2pt;
    }

    .job {
      margin-top: 0.4rem;
      break-inside: avoid;
    }
    .job-head {
      display: flex;
      justify-content: space-between;
      gap: 0.75rem;
      align-items: baseline;
    }
    .job-role {
      font-size: 9.2pt;
      color: var(--ink);
      font-family: Georgia, serif;
      font-weight: 650;
    }
    .job-period {
      white-space: nowrap;
      font-size: 7.8pt;
      font-weight: 650;
      color: var(--sea);
    }
    .job-company {
      margin-top: 0.02rem;
      color: var(--ink-soft);
      font-size: 8pt;
      font-weight: 600;
    }
    .job-summary {
      margin-top: 0.15rem;
      color: var(--ink-soft);
      font-size: 8pt;
    }
    .job-stack {
      margin-top: 0.2rem;
      padding: 0.2rem 0.4rem;
      background: var(--mist);
      border-left: 2.5px solid var(--brass);
      color: var(--sea-deep);
      font-size: 7.3pt;
      line-height: 1.3;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.55rem;
    }
    .skill-group h3 {
      font-size: 8.4pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--sea);
      margin-bottom: 0.2rem;
      font-family: "Segoe UI", sans-serif;
      font-weight: 700;
    }
    .skill-group p {
      font-size: 8.3pt;
      color: var(--ink);
      line-height: 1.4;
    }
    .core {
      margin-top: 0.45rem;
      font-size: 8.2pt;
      color: var(--ink-soft);
    }
    .core strong { color: var(--sea-deep); }

    .projects {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.4rem 0.75rem;
    }
    .project {
      break-inside: avoid;
      padding: 0.3rem 0;
      border-bottom: 1px solid rgba(20, 35, 43, 0.06);
    }
    .project-name {
      font-weight: 700;
      font-size: 8.7pt;
      color: var(--ink);
    }
    .project-meta {
      color: var(--sea);
      font-size: 7.8pt;
      font-weight: 650;
    }
    .project-desc {
      margin-top: 0.1rem;
      color: var(--ink-soft);
      font-size: 8.1pt;
    }

    .two-col {
      display: grid;
      grid-template-columns: 1.1fr 1fr;
      gap: 0.85rem;
    }
    .edu-item {
      margin-top: 0.25rem;
    }
    .edu-item strong { display: block; font-size: 9pt; color: var(--ink); }
    .edu-item span { color: var(--ink-soft); font-size: 8.3pt; }

    .cert-block { margin-top: 0.35rem; }
    .cert-block h3 {
      font-size: 8.3pt;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--sea);
      margin-bottom: 0.15rem;
      font-family: "Segoe UI", sans-serif;
      font-weight: 700;
    }
    .cert-list {
      font-size: 8.1pt;
      color: var(--ink);
      line-height: 1.4;
    }
    .cert-list em {
      color: var(--ink-soft);
      font-style: normal;
      font-size: 7.7pt;
    }

    .footer-note {
      margin-top: 0.85rem;
      padding-top: 0.4rem;
      border-top: 1px solid var(--line);
      font-size: 7.6pt;
      color: var(--ink-soft);
      text-align: center;
    }

    .cert-page {
      page-break-before: always;
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 277mm;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cert-page img {
      width: 100%;
      height: auto;
      max-height: 277mm;
      object-fit: contain;
      display: block;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <header class="header">
      <div>
        <h1 class="name">${escapeHtml(profile.name)}</h1>
        <p class="title">${escapeHtml(profile.title)} · Software Development</p>
        <p class="tagline">${escapeHtml(profile.tagline)}</p>
      </div>
      <div class="meta">
        <div><strong>${escapeHtml(profile.location)}</strong></div>
        <div><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></div>
        <div><a href="tel:${escapeHtml(profile.phone.replace(/\\s+/g, ''))}">${escapeHtml(profile.phone)}</a></div>
        <div><a href="${escapeHtml(profile.linkedin)}">linkedin.com/in/myounusm</a></div>
        <div><a href="${escapeHtml(profile.github)}">github.com/myounusm</a></div>
        <div><a href="${website}">myounusm.in</a></div>
      </div>
    </header>

    <section class="section">
      <h2 class="section-title">Professional Summary</h2>
      <p class="summary">${escapeHtml(about.body.replace(/\\n\\n/g, ' '))}</p>
    </section>

    <section class="section">
      <h2 class="section-title">Experience</h2>
      ${experience
        .map((job, index) => {
          const limit = highlightLimitFor(index, job.highlights.length)
          const bullets = job.highlights
            .slice(0, limit)
            .map((h) => {
              const text = h.title ? `${h.title}: ${h.text}` : h.text
              return `<li>${escapeHtml(text)}</li>`
            })
            .join('')
          const showStack = index <= 3 && Boolean(job.techStack)
          return `
        <article class="job">
          <div class="job-head">
            <h3 class="job-role">${escapeHtml(job.role)}</h3>
            <p class="job-period">${escapeHtml(job.period)}</p>
          </div>
          <p class="job-company">${escapeHtml(job.company.replace(/\s*\|\s*/g, ' · '))}</p>
          ${job.summary && index <= 3 ? `<p class="job-summary">${escapeHtml(job.summary)}</p>` : ''}
          <ul>${bullets}</ul>
          ${showStack ? `<p class="job-stack"><strong>Stack:</strong> ${escapeHtml(job.techStack!)}</p>` : ''}
        </article>`
        })
        .join('')}
    </section>

    <section class="section">
      <h2 class="section-title">Core Skills</h2>
      <div class="skills-grid">
        ${skills.groups
          .map(
            (group) => `
          <div class="skill-group">
            <h3>${escapeHtml(group.label)}</h3>
            <p>${escapeHtml(group.items.join(' · '))}</p>
          </div>`,
          )
          .join('')}
      </div>
      <p class="core"><strong>Core strengths:</strong> ${escapeHtml(skills.coreStrengths)}</p>
    </section>

    <section class="section">
      <h2 class="section-title">Selected Work</h2>
      <div class="projects">
        ${projects
          .map(
            (project) => `
          <article class="project">
            <p class="project-name">${escapeHtml(project.name)}</p>
            <p class="project-meta">${escapeHtml(project.year)} · ${escapeHtml(project.stack.join(' · '))}</p>
            <p class="project-desc">${escapeHtml(project.description)}</p>
          </article>`,
          )
          .join('')}
      </div>
    </section>

    <section class="section">
      <div class="two-col">
        <div>
          <h2 class="section-title">Education</h2>
          ${education
            .map(
              (item) => `
            <div class="edu-item">
              <strong>${escapeHtml(item.degree)}</strong>
              <span>${escapeHtml(item.school)} · ${escapeHtml(item.period)}</span>
            </div>`,
            )
            .join('')}
        </div>
        <div>
          <h2 class="section-title">Certifications</h2>
          ${certifications.groups
            .map(
              (group) => `
            <div class="cert-block">
              <h3>${escapeHtml(group.label)}</h3>
              <p class="cert-list">
                ${group.items
                  .map(
                    (item) =>
                      `${escapeHtml(item.name)}${item.since ? ` <em>(${escapeHtml(item.since)})</em>` : ''}`,
                  )
                  .join(' · ')}
              </p>
            </div>`,
            )
            .join('')}
        </div>
      </div>
    </section>

    <p class="footer-note">Curriculum Vitae generated from ${website} · ${escapeHtml(profile.name)}</p>
  </div>

  <div class="sheet cert-page">
    <img
      src="../public/certificates/outsystems-certifications.png"
      alt="OutSystems consolidated certifications certificate for Mohammed Younus Mohiuddin"
    />
  </div>
</body>
</html>`

mkdirSync(dirname(outHtml), { recursive: true })
writeFileSync(outHtml, html, 'utf8')

const chromeCandidates = [
  '/usr/bin/google-chrome-stable',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
]

const chrome = chromeCandidates.find((bin) => {
  const result = spawnSync(bin, ['--version'], { encoding: 'utf8' })
  return result.status === 0
})

if (!chrome) {
  if (existsSync(outPdf)) {
    console.warn(
      'No Chrome/Chromium found — keeping existing public/Mohammed_Younus_CV.pdf',
    )
    process.exit(0)
  }
  console.error('No Chrome/Chromium binary found to print PDF.')
  process.exit(1)
}

const fileUrl = pathToFileURL(outHtml).href
const print = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--allow-file-access-from-files',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outPdf}`,
    fileUrl,
  ],
  { encoding: 'utf8' },
)

if (print.status !== 0) {
  console.error(print.stderr || print.stdout || 'PDF generation failed')
  process.exit(print.status ?? 1)
}

console.log(`Wrote ${outPdf}`)
