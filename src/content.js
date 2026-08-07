/**
 * Edit this file to personalize your CV & portfolio.
 * Keep project links, dates, and copy accurate to your experience.
 */
export const profile = {
  name: 'Mohammed Younus Mohiuddin',
  shortName: 'Mohammed Younus',
  title: 'Software Engineer',
  tagline:
    'I build clear, reliable software — from thoughtful interfaces to solid backend systems.',
  email: 'myounusmohiuddin@hotmail.com',
  location: 'Open to remote & hybrid opportunities',
  github: 'https://github.com/myounusm',
  linkedin: '', // e.g. https://linkedin.com/in/your-handle
  resumeUrl: '#experience',
  heroImage:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80',
  heroImageAlt: 'Sunlit modern workspace with glass and soft architecture',
}

export const about = {
  heading: 'About',
  lead:
    'I care about craft: readable code, calm UX, and systems that stay maintainable as they grow.',
  body: `I'm a software engineer who enjoys turning ambiguous problems into shipping products.
I work across the stack — shaping product flows, implementing features, and keeping quality high
through testing, reviews, and clear communication with teammates.`,
}

export const experience = [
  {
    role: 'Software Engineer',
    company: 'Your Company',
    period: '2023 — Present',
    summary:
      'Ship product features end-to-end, improve performance, and collaborate with design and product.',
    highlights: [
      'Owned features from discovery through release',
      'Improved reliability with better testing and observability',
      'Mentored peers through reviews and pairing',
    ],
  },
  {
    role: 'Junior Software Engineer',
    company: 'Previous Role',
    period: '2021 — 2023',
    summary:
      'Built web applications, fixed production issues, and learned how strong teams deliver.',
    highlights: [
      'Delivered UI and API work on customer-facing products',
      'Reduced bugs with clearer edge-case handling',
      'Documented patterns that sped up onboarding',
    ],
  },
]

export const skills = {
  heading: 'Skills',
  groups: [
    {
      label: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    },
    {
      label: 'Frontend',
      items: ['React', 'HTML/CSS', 'Vite', 'Responsive design'],
    },
    {
      label: 'Backend & tools',
      items: ['Node.js', 'REST APIs', 'Git', 'CI basics'],
    },
  ],
}

export const projects = [
  {
    name: 'AboutMe Portfolio',
    year: '2026',
    description:
      'A personal site for CV and selected work — fast, accessible, and easy to update.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vite'],
    link: 'https://github.com/myounusm/AboutMe',
  },
  {
    name: 'Project Two',
    year: '2025',
    description:
      'Replace with a project you are proud of — what it solves, your role, and the outcome.',
    stack: ['React', 'API', 'Design'],
    link: '#',
  },
  {
    name: 'Project Three',
    year: '2024',
    description:
      'Another highlight: a side project, open-source contribution, or academic build.',
    stack: ['TypeScript', 'Node'],
    link: '#',
  },
]

export const contact = {
  heading: 'Let’s talk',
  body: 'Have a role, collaboration, or idea in mind? I’d love to hear from you.',
  cta: 'Email me',
}
