/**
 * Builds a Word (.docx) CV from src/content.ts into public/Mohammed_Younus_CV.docx
 */
import { writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  TextRun,
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
    spacing: { before: 220, after: 80 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: seaDeep, space: 4 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
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
        size: opts?.size ?? 18,
        font: 'Calibri',
        color: ink,
      }),
    ],
  })

const bullet = (text: string) =>
  new Paragraph({
    spacing: { before: 20, after: 20 },
    indent: { left: 280 },
    children: [
      new TextRun({ text: '•  ', size: 18, font: 'Calibri', color: sea }),
      new TextRun({ text, size: 18, font: 'Calibri', color: ink }),
    ],
  })

const children: Paragraph[] = [
  new Paragraph({
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: profile.name,
        bold: true,
        size: 36,
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
        size: 22,
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
        size: 18,
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
        size: 16,
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
      spacing: { before: 140, after: 20 },
      children: [
        new TextRun({
          text: job.role,
          bold: true,
          size: 20,
          font: 'Calibri',
          color: ink,
        }),
        new TextRun({
          text: `    ${job.period}`,
          bold: true,
          size: 16,
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
          size: 17,
          font: 'Calibri',
          color: inkSoft,
        }),
      ],
    }),
  )

  if (job.summary && index <= 3) {
    children.push(bodyPara(job.summary, { size: 17, before: 20, after: 40 }))
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
            size: 15,
            font: 'Calibri',
            color: seaDeep,
          }),
          new TextRun({
            text: job.techStack,
            size: 15,
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
          size: 17,
          font: 'Calibri',
          color: sea,
        }),
        new TextRun({
          text: group.items.join(' · '),
          size: 17,
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
        size: 16,
        font: 'Calibri',
        color: seaDeep,
      }),
      new TextRun({
        text: skills.coreStrengths,
        size: 16,
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
          size: 17,
          font: 'Calibri',
          color: ink,
        }),
        new TextRun({
          text: `  ·  ${project.year}  ·  ${project.stack.join(' · ')}`,
          size: 15,
          font: 'Calibri',
          color: sea,
        }),
      ],
    }),
    bodyPara(project.description, { size: 16, before: 10, after: 30 }),
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
          size: 18,
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
          size: 16,
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
          size: 16,
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
          size: 16,
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
        size: 14,
        font: 'Calibri',
        color: inkSoft,
        italics: true,
      }),
    ],
  }),
)

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
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
  ],
})

const buffer = await Packer.toBuffer(doc)
writeFileSync(outDocx, buffer)
console.log(`Wrote ${outDocx}`)
