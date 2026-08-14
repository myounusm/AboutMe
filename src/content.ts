/**
 * Portfolio content sourced from Younus_CV.pdf
 */

export interface Profile {
  name: string
  shortName: string
  title: string
  headline: string
  tagline: string
  builtWithLine: string
  email: string
  phone: string
  location: string
  github: string
  linkedin: string
  photoUrl: string
  photoAlt: string
  resumeUrl: string
  heroImage: string
  heroImageAlt: string
}

export interface About {
  heading: string
  lead: string
  body: string
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  summary: string
  highlights: string[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Skills {
  heading: string
  lead: string
  groups: SkillGroup[]
}

export interface Project {
  name: string
  year: string
  description: string
  stack: string[]
  link: string
}

export interface EducationItem {
  degree: string
  school: string
  period: string
}

export interface Certifications {
  heading: string
  items: string[]
}

export interface Contact {
  heading: string
  body: string
  cta: string
}

export const profile: Profile = {
  name: 'Mohammed Younus Mohiuddin',
  shortName: 'Mohammed Younus',
  title: 'Tech Lead',
  headline: 'Tech Lead crafting scalable enterprise systems.',
  tagline:
    '21+ years in insurance, aviation, and software — OutSystems, .NET, cloud, and AI-driven delivery.',
  builtWithLine:
    'Built with TypeScript & Cursor AI · Source on GitHub · Deployed to Azure',
  email: 'myounusmohiuddin@hotmail.com',
  phone: '+966 592889045',
  location: 'Jeddah, Saudi Arabia',
  github: 'https://github.com/myounusm',
  linkedin: 'https://www.linkedin.com/in/myounusm/',
  photoUrl: './profile.jpg',
  photoAlt: 'Portrait of Mohammed Younus Mohiuddin',
  resumeUrl: './Younus_CV.pdf',
  heroImage:
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80',
  heroImageAlt: 'Sunlit modern workspace with glass and soft architecture',
}

export const about: About = {
  heading: 'About',
  lead:
    'Always ready to learn new technologies and adapt to evolving challenges.',
  body: `Tech Lead with 21+ years of software development experience across the insurance, aviation, and software industries. Holds 12 OutSystems certifications, including Professional Developer and Architecture Specialist, and is certified in Microsoft Azure AI.

Expert in enterprise solution design, digital transformation, and building scalable, high-performance systems — from architecture and integrations to mentoring teams and engaging business stakeholders.`,
}

export const experience: ExperienceItem[] = [
  {
    role: 'Tech Lead – Software Development',
    company: 'Wataniya Insurance Company, Jeddah, Saudi Arabia',
    period: 'Jan 2026 — Present',
    summary:
      'Leading software delivery with a focus on scalable architecture, digital transformation, and high-performance enterprise systems.',
    highlights: [
      'Guide architecture, delivery, and engineering practices across product initiatives',
      'Mentor developers through code reviews and technical leadership',
      'Drive secure, integration-heavy platforms for insurance operations',
    ],
  },
  {
    role: 'Senior OutSystems Low-Code Developer',
    company: 'Wataniya Insurance Company, Jeddah, Saudi Arabia',
    period: 'Jan 2023 — Dec 2025',
    summary:
      'Built and evolved mission-critical insurance platforms using OutSystems, workflows, and enterprise integrations.',
    highlights: [
      'Delivered B2B and customer-facing insurance products with real-time quotation and issuance',
      'Automated renewals, claims recovery, and partner portal operations',
      'Integrated payment gateways, government APIs, SMS, and WhatsApp channels',
    ],
  },
  {
    role: 'Senior .NET Software Developer',
    company: 'General Authority of Civil Aviation (GACA), Jeddah, Saudi Arabia',
    period: 'Aug 2012 — Dec 2022',
    summary:
      'Developed enterprise .NET solutions supporting aviation authority systems over a decade of delivery.',
    highlights: [
      'Built backend solutions, APIs, and integrations across long-lived enterprise platforms',
      'Applied SDLC ownership from design through production support',
      'Strengthened security, performance, and maintainability of critical systems',
    ],
  },
  {
    role: 'Senior .NET Software Developer',
    company: 'EVER TEAM, Riyadh, Saudi Arabia',
    period: 'Nov 2007 — Aug 2012',
    summary:
      'Delivered .NET enterprise applications and system integrations for business clients.',
    highlights: [
      'Implemented service-oriented solutions and database-backed applications',
      'Collaborated with stakeholders on requirements through release',
    ],
  },
  {
    role: 'Software Developer',
    company: 'AFLAK Electronic Industries Co.',
    period: 'Aug 2007 — Oct 2007',
    summary: 'Software development for electronic industry systems.',
    highlights: ['Contributed to application delivery and support'],
  },
  {
    role: 'Software Developer',
    company: 'AL AHLIA for Cooperative Insurance',
    period: 'Mar 2005 — Jul 2007',
    summary: 'Early career software development in the insurance domain.',
    highlights: [
      'Built foundational insurance application experience that shaped later enterprise work',
    ],
  },
]

export const skills: Skills = {
  heading: 'Skills',
  lead: 'Cursor AI, OutSystems Low-code, .NET, integrations, data, and Azure AI.',
  groups: [
    {
      label: 'Back-end',
      items: [
        'ASP.NET Core (MVC)',
        'C# / .NET',
        'OutSystems (Low-Code)',
        'Entity Framework',
        'Microservices & SOA',
        'LINQ',
      ],
    },
    {
      label: 'APIs & front-end',
      items: [
        'REST & SOAP APIs',
        'JWT Authentication',
        'Angular 14',
        'TypeScript / JavaScript',
        'HTML5 & Bootstrap',
        'Ocelot / RedHat 3Scale',
      ],
    },
    {
      label: 'Data, AI & platforms',
      items: [
        'Cursor AI',
        'Microsoft SQL Server',
        'Oracle / PL-SQL',
        'Azure AI Services',
        'OCR & Computer Vision',
        'NLP & Machine Learning',
        'SharePoint Integration',
      ],
    },
  ],
}

export const projects: Project[] = [
  {
    name: 'Amazon Payfort – Digital Payment Integration',
    year: 'Wataniya',
    description:
      'Secure, high-performance payment processing for direct sales — improving transaction reliability and customer experience.',
    stack: ['Payments', 'API Integration', 'Security'],
    link: '',
  },
  {
    name: 'Retail Renewal Process',
    year: 'Insurance',
    description:
      'Automated policy renewals with smart notifications and self-service workflows to increase retention and operational efficiency.',
    stack: ['OutSystems', 'Workflows', 'Notifications'],
    link: '',
  },
  {
    name: 'Domestic Labor Insurance Platform',
    year: 'B2B',
    description:
      'Mission-critical B2B platform for real-time quotation, policy issuance, and activation for external partners.',
    stack: ['OutSystems', 'B2B', 'Insurance'],
    link: '',
  },
  {
    name: 'Claims Recovery Automation',
    year: 'Insurance',
    description:
      'Workflow-driven claim recovery automation that reduced manual effort and accelerated financial recovery cycles.',
    stack: ['BPT Workflows', 'Automation'],
    link: '',
  },
  {
    name: 'Partners Portal Platform',
    year: 'Insurance',
    description:
      'Centralized broker portal for motors, marine, property, and more — integrated with core insurance systems.',
    stack: ['Portal', 'Core Integration'],
    link: '',
  },
  {
    name: 'ELM & Messaging Integrations',
    year: 'Enterprise',
    description:
      'Government ELM APIs for verified personal and vehicle data, plus SMS and WhatsApp automation for real-time engagement.',
    stack: ['ELM', 'SMS', 'WhatsApp'],
    link: '',
  },
]

export const education: EducationItem[] = [
  {
    degree: 'Bachelor of Computer Science (BCA)',
    school: 'Osmania University',
    period: 'Mar 2003',
  },
]

export const certifications: Certifications = {
  heading: 'Certifications',
  items: [
    '12× OutSystems certified (Architecture Specialist, Professional Web/Mobile Developer, Security Specialist, Tech Lead, and more)',
    'Microsoft Certified: Azure AI Fundamentals',
    'Microsoft 365 Certified: Fundamentals',
    'SCRUM Fundamentals',
  ],
}

export const contact: Contact = {
  heading: 'Let’s talk',
  body: 'Open to conversations about tech leadership, OutSystems/.NET delivery, and enterprise digital transformation.',
  cta: 'Email me',
}
