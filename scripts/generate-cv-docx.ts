/**
 * Builds a Word (.docx) CV from src/content.ts into public/Mohammed_Younus_CV.docx
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  VerticalAlign,
} from 'docx'
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
const outDocx = join(root, 'public', 'Mohammed_Younus_CV.docx')
const badgesDir = join(root, 'public', 'certificates', 'badges')
const outSystemsRed = 'E4002B'

const website = 'https://www.myounusm.in'
const seaDeep = '0F4D48'
const sea = '1A6B63'
const inkSoft = '3A4D57'
const ink = '14232B'

const highlightLimitFor = (index: number, total: number) => {
  if (index <= 2) return total
  if (index === 3) return Math.min(4, total)
  return Math.min(3, total)
}

const sectionHeading = (text: string) =>
  new Paragraph({
    spacing: { before: 240, after: 100 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: seaDeep, space: 4 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 26,
        font: 'Calibri',
        color: seaDeep,
        allCaps: true,
      }),
    ],
  })

const bodyPara = (text: string, opts?: { before?: number; after?: number; size?: number }) =>
  new Paragraph({
    spacing: { before: opts?.before ?? 40, after: opts?.after ?? 40 },
    children: [
      new TextRun({
        text,
        size: opts?.size ?? 24,
        font: 'Calibri',
        color: ink,
      }),
    ],
  })

const bullet = (text: string) =>
  new Paragraph({
    spacing: { before: 30, after: 30 },
    indent: { left: 280 },
    children: [
      new TextRun({ text: '•  ', size: 24, font: 'Calibri', color: sea }),
      new TextRun({ text, size: 24, font: 'Calibri', color: ink }),
    ],
  })

const children: Paragraph[] = [
  new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: profile.name,
        bold: true,
        size: 40,
        font: 'Calibri',
        color: seaDeep,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: `${profile.title} · Software Development`,
        bold: true,
        size: 26,
        font: 'Calibri',
        color: sea,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: profile.tagline,
        size: 24,
        font: 'Calibri',
        color: inkSoft,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 20 },
    children: [
      new TextRun({
        text: [
          profile.location,
          profile.email,
          profile.phone,
          'linkedin.com/in/myounusm',
          'github.com/myounusm',
          'myounusm.in',
        ].join('  ·  '),
        size: 20,
        font: 'Calibri',
        color: inkSoft,
      }),
    ],
  }),

  sectionHeading('Professional Summary'),
  bodyPara(about.body.replace(/\n+/g, ' ')),

  sectionHeading('Experience'),
]

for (const [index, job] of experience.entries()) {
  const limit = highlightLimitFor(index, job.highlights.length)
  children.push(
    new Paragraph({
      spacing: { before: 160, after: 20 },
      children: [
        new TextRun({
          text: job.role,
          bold: true,
          size: 26,
          font: 'Calibri',
          color: ink,
        }),
        new TextRun({
          text: `    ${job.period}`,
          bold: true,
          size: 22,
          font: 'Calibri',
          color: sea,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: job.company.replace(/\s*\|\s*/g, ' · '),
          size: 22,
          font: 'Calibri',
          color: inkSoft,
        }),
      ],
    }),
  )

  if (job.summary && index <= 3) {
    children.push(bodyPara(job.summary, { size: 24, before: 20, after: 40 }))
  }

  for (const highlight of job.highlights.slice(0, limit)) {
    const text = highlight.title ? `${highlight.title}: ${highlight.text}` : highlight.text
    children.push(bullet(text))
  }

  if (index <= 3 && job.techStack) {
    children.push(
      new Paragraph({
        spacing: { before: 60, after: 40 },
        children: [
          new TextRun({
            text: 'Stack: ',
            bold: true,
            size: 20,
            font: 'Calibri',
            color: seaDeep,
          }),
          new TextRun({
            text: job.techStack,
            size: 20,
            font: 'Calibri',
            color: seaDeep,
          }),
        ],
      }),
    )
  }
}

children.push(sectionHeading('Core Skills'))
for (const group of skills.groups) {
  children.push(
    new Paragraph({
      spacing: { before: 60, after: 20 },
      children: [
        new TextRun({
          text: `${group.label}: `,
          bold: true,
          size: 22,
          font: 'Calibri',
          color: sea,
        }),
        new TextRun({
          text: group.items.join(' · '),
          size: 22,
          font: 'Calibri',
          color: ink,
        }),
      ],
    }),
  )
}
children.push(
  new Paragraph({
    spacing: { before: 80, after: 40 },
    children: [
      new TextRun({
        text: 'Core strengths: ',
        bold: true,
        size: 22,
        font: 'Calibri',
        color: seaDeep,
      }),
      new TextRun({
        text: skills.coreStrengths,
        size: 22,
        font: 'Calibri',
        color: inkSoft,
      }),
    ],
  }),
)

children.push(sectionHeading('Selected Work'))
for (const project of projects) {
  children.push(
    new Paragraph({
      spacing: { before: 60, after: 10 },
      children: [
        new TextRun({
          text: project.name,
          bold: true,
          size: 22,
          font: 'Calibri',
          color: ink,
        }),
        new TextRun({
          text: `  ·  ${project.year}  ·  ${project.stack.join(' · ')}`,
          size: 20,
          font: 'Calibri',
          color: sea,
        }),
      ],
    }),
    bodyPara(project.description, { size: 22, before: 10, after: 30 }),
  )
}

children.push(sectionHeading('Education'))
for (const item of education) {
  children.push(
    new Paragraph({
      spacing: { before: 40, after: 20 },
      children: [
        new TextRun({
          text: item.degree,
          bold: true,
          size: 24,
          font: 'Calibri',
          color: ink,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: `${item.school} · ${item.period}`,
          size: 22,
          font: 'Calibri',
          color: inkSoft,
        }),
      ],
    }),
  )
}

children.push(sectionHeading('Certifications'))
for (const group of certifications.groups) {
  children.push(
    new Paragraph({
      spacing: { before: 60, after: 20 },
      children: [
        new TextRun({
          text: group.label,
          bold: true,
          size: 22,
          font: 'Calibri',
          color: sea,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: group.items
            .map((item) => (item.since ? `${item.name} (${item.since})` : item.name))
            .join(' · '),
          size: 22,
          font: 'Calibri',
          color: ink,
        }),
      ],
    }),
  )
}

children.push(
  new Paragraph({
    spacing: { before: 280 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: `Curriculum Vitae generated from ${website} · ${profile.name}`,
        size: 18,
        font: 'Calibri',
        color: inkSoft,
        italics: true,
      }),
    ],
  }),
)

type TimelineCert = {
  name: string
  date: string
  sortKey: string
  platform: string
  level: string
  track: string
  badge: string
  highlight: string
}

const outSystemsTimeline: TimelineCert[] = [
  {
    name: 'Architecture Specialist (ODC)',
    date: 'Jan 17, 2026',
    sortKey: '2026-01-17',
    platform: 'ODC',
    level: 'Specialist',
    track: 'Architecture',
    badge: 'architecture.png',
    highlight: 'Cloud-native architecture design for OutSystems Developer Cloud',
  },
  {
    name: 'Platform Ops (O11)',
    date: 'Jun 24, 2025',
    sortKey: '2025-06-24',
    platform: 'O11',
    level: 'Ops',
    track: 'Platform Operations',
    badge: 'platform-ops.png',
    highlight: 'LifeTime governance, environments, releases, and platform reliability',
  },
  {
    name: 'Tech Lead (O11)',
    date: 'Jun 18, 2025',
    sortKey: '2025-06-18',
    platform: 'O11',
    level: 'Tech Lead',
    track: 'Leadership',
    badge: 'tech-lead.png',
    highlight: 'Technical leadership, standards, mentoring, and delivery ownership',
  },
  {
    name: 'Web Developer Specialist (ODC)',
    date: 'Dec 28, 2024',
    sortKey: '2024-12-28',
    platform: 'ODC',
    level: 'Specialist',
    track: 'Web Development',
    badge: 'web-specialist.png',
    highlight: 'Advanced ODC web application patterns and specialist-level delivery',
  },
  {
    name: 'Associate Traditional Web Developer (O11)',
    date: 'Jun 27, 2024',
    sortKey: '2024-06-27',
    platform: 'O11',
    level: 'Associate',
    track: 'Traditional Web',
    badge: 'associate-traditional.png',
    highlight: 'Traditional Web skills complementing Reactive/ODC delivery',
  },
  {
    name: 'Architecture Specialist (O11)',
    date: 'Nov 03, 2023',
    sortKey: '2023-11-03-a',
    platform: 'O11',
    level: 'Specialist',
    track: 'Architecture',
    badge: 'architecture.png',
    highlight: 'Enterprise architecture, module design, and long-term maintainability',
  },
  {
    name: 'Professional Web Developer (O11)',
    date: 'Nov 03, 2023',
    sortKey: '2023-11-03-b',
    platform: 'O11',
    level: 'Professional',
    track: 'Web Development',
    badge: 'professional-web.png',
    highlight: 'Professional-grade Reactive/Web application development',
  },
  {
    name: 'Professional Mobile Developer (O11)',
    date: 'Nov 03, 2023',
    sortKey: '2023-11-03-c',
    platform: 'O11',
    level: 'Professional',
    track: 'Mobile Development',
    badge: 'professional-mobile.png',
    highlight: 'Mobile delivery with professional OutSystems mobile patterns',
  },
  {
    name: 'Security Specialist (O11 and ODC)',
    date: 'Sep 13, 2023',
    sortKey: '2023-09-13',
    platform: 'O11 & ODC',
    level: 'Specialist',
    track: 'Security',
    badge: 'security-specialist.png',
    highlight: 'Secure design, authentication, and platform security best practices',
  },
  {
    name: 'Web Developer Specialist (O11)',
    date: 'Aug 25, 2023',
    sortKey: '2023-08-25',
    platform: 'O11',
    level: 'Specialist',
    track: 'Web Development',
    badge: 'web-specialist.png',
    highlight: 'Specialist web patterns beyond professional developer baseline',
  },
  {
    name: 'Associate Developer (ODC)',
    date: 'Jul 24, 2023',
    sortKey: '2023-07-24',
    platform: 'ODC',
    level: 'Associate',
    track: 'Core Development',
    badge: 'associate.png',
    highlight: 'Foundational OutSystems Developer Cloud capability',
  },
  {
    name: 'Mobile Developer Specialist (O11 and ODC)',
    date: 'Jul 13, 2023',
    sortKey: '2023-07-13',
    platform: 'O11 & ODC',
    level: 'Specialist',
    track: 'Mobile Development',
    badge: 'mobile-specialist.png',
    highlight: 'Cross-platform mobile specialist skills on O11 and ODC',
  },
  {
    name: 'Associate Developer (O11)',
    date: 'Jun 10, 2023',
    sortKey: '2023-06-10',
    platform: 'O11',
    level: 'Associate',
    track: 'Core Development',
    badge: 'associate.png',
    highlight: 'Entry point of the OutSystems certification journey',
  },
]

const noBorder = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
}

const timelineRows: TableRow[] = []

for (const [index, cert] of outSystemsTimeline.entries()) {
  const badgePath = join(badgesDir, cert.badge)
  const badgeData = readFileSync(badgePath)
  const isLast = index === outSystemsTimeline.length - 1

  timelineRows.push(
    new TableRow({
      children: [
        new TableCell({
          width: { size: 1400, type: WidthType.DXA },
          borders: noBorder,
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              spacing: { before: 40, after: 0 },
              children: [
                new TextRun({
                  text: cert.date,
                  bold: true,
                  size: 18,
                  font: 'Calibri',
                  color: seaDeep,
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 700, type: WidthType.DXA },
          borders: noBorder,
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 0 },
              children: [
                new TextRun({
                  text: '●',
                  size: 28,
                  font: 'Calibri',
                  color: outSystemsRed,
                }),
              ],
            }),
            ...(isLast
              ? []
              : [
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 0, after: 0 },
                    children: [
                      new TextRun({
                        text: '│',
                        size: 22,
                        font: 'Calibri',
                        color: 'F2A0A8',
                      }),
                    ],
                  }),
                ]),
          ],
        }),
        new TableCell({
          width: { size: 1100, type: WidthType.DXA },
          borders: noBorder,
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              spacing: { before: 20, after: 20 },
              children: [
                new ImageRun({
                  type: 'png',
                  data: badgeData,
                  transformation: { width: 46, height: 50 },
                  altText: {
                    title: cert.name,
                    description: `${cert.name} badge`,
                    name: cert.badge,
                  },
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          width: { size: 6300, type: WidthType.DXA },
          borders: {
            ...noBorder,
            bottom: {
              style: BorderStyle.SINGLE,
              size: 4,
              color: 'E8EEF0',
              space: 1,
            },
          },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              spacing: { before: 40, after: 10 },
              children: [
                new TextRun({
                  text: cert.name,
                  bold: true,
                  size: 22,
                  font: 'Calibri',
                  color: ink,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 10 },
              children: [
                new TextRun({
                  text: `${cert.level}  ·  ${cert.track}  ·  ${cert.platform}`,
                  size: 17,
                  font: 'Calibri',
                  color: outSystemsRed,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 50 },
              children: [
                new TextRun({
                  text: cert.highlight,
                  size: 18,
                  font: 'Calibri',
                  color: inkSoft,
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  )
}

const timelineIntro: Paragraph[] = [
  new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({
        text: 'OutSystems Certification Journey',
        bold: true,
        size: 28,
        font: 'Calibri',
        color: seaDeep,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: '13 certifications  ·  O11 + ODC  ·  Jun 2023 → Jan 2026',
        bold: true,
        size: 20,
        font: 'Calibri',
        color: outSystemsRed,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 160 },
    children: [
      new TextRun({
        text:
          'Progressed from Associate Developer to Architecture Specialist and Tech Lead across OutSystems 11 and OutSystems Developer Cloud — spanning core development, mobile, security, platform operations, and architecture.',
        size: 20,
        font: 'Calibri',
        color: inkSoft,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: outSystemsRed, space: 2 },
    },
    children: [
      new TextRun({
        text: 'CERTIFICATION TIMELINE (MOST RECENT FIRST)',
        bold: true,
        size: 18,
        font: 'Calibri',
        color: outSystemsRed,
      }),
    ],
  }),
]

const a4WidthTwips = 11906
const a4HeightTwips = 16838

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: {
            width: a4WidthTwips,
            height: a4HeightTwips,
          },
          margin: {
            top: 720,
            right: 720,
            bottom: 720,
            left: 720,
          },
        },
      },
      children,
    },
    {
      properties: {
        page: {
          size: {
            width: a4WidthTwips,
            height: a4HeightTwips,
          },
          margin: {
            top: 540,
            right: 540,
            bottom: 540,
            left: 540,
          },
        },
      },
      children: [
        ...timelineIntro,
        new Table({
          width: { size: 10500, type: WidthType.DXA },
          columnWidths: [1400, 700, 1100, 6300],
          rows: timelineRows,
        }),
        new Paragraph({
          spacing: { before: 180 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: 'Source: Official OutSystems Certification Transcript  ·  outsystems.com/certifications',
              size: 15,
              font: 'Calibri',
              color: inkSoft,
              italics: true,
            }),
          ],
        }),
      ],
    },
  ],
})

const buffer = await Packer.toBuffer(doc)
writeFileSync(outDocx, buffer)
console.log(`Wrote ${outDocx} with ${outSystemsTimeline.length}-item certification timeline`)
