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
  resumeUrlNew?: string
  heroImage: string
  heroImageAlt: string
}

export interface About {
  heading: string
  lead: string
  body: string
}

export interface ExperienceHighlight {
  title?: string
  text: string
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  summary: string
  highlights: ExperienceHighlight[]
  techStack?: string
  logo: string
  logoAlt: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Skills {
  heading: string
  lead: string
  groups: SkillGroup[]
  coreStrengths: string
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

export interface CertificationItem {
  name: string
  since?: string
}

export interface CertificationGroup {
  label: string
  items: CertificationItem[]
  logo?: string
  logoAlt?: string
}

export interface Certifications {
  heading: string
  groups: CertificationGroup[]
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
  resumeUrlNew: './Mohammed_Younus_CV.pdf',
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
    company: 'Wataniya Insurance Company | Jeddah, Saudi Arabia',
    period: 'Jan 2026 — Present',
    summary: '',
    highlights: [
      {
        text: 'Lead technical architecture, solution design, engineering standards, and end-to-end delivery across enterprise insurance and digital transformation initiatives.',
      },
      {
        text: 'Manage OutSystems LifeTime, including deployments across Development, UAT, and Production, along with hotfixes, rollbacks, release coordination, user access, roles, and permissions.',
      },
      {
        text: 'Oversee production stability, troubleshoot critical application and integration issues, and manage incidents and service requests through ManageEngine.',
      },
      {
        text: 'Mentor developers through technical guidance, solution reviews, code reviews, troubleshooting, performance optimization, security, and engineering best practices.',
      },
      {
        text: 'Collaborate with business stakeholders, vendors, product teams, architects, and technology teams on release planning, impact analysis, technical risk assessment, and delivery of secure, scalable, and reliable enterprise solutions.',
      },
    ],
    techStack:
      'OutSystems • LifeTime • Service Studio • Integration Studio • C#/.NET • REST APIs • SOAP Web Services • SQL Server • Advanced SQL • ManageEngine • Application Monitoring • Release Management • Production Support • CI/CD • Enterprise Integrations',
    logo: './logos/wataniya.png',
    logoAlt: 'Wataniya Insurance logo',
  },
  {
    role: 'Senior OutSystems Low-Code Developer',
    company: 'Wataniya Insurance Company | Jeddah, Saudi Arabia',
    period: 'Jan 2023 — Dec 2025',
    summary: '',
    highlights: [
      {
        text: 'Developed enterprise-grade OutSystems Reactive and Traditional Web applications for B2B, Partner Portal, quotation, policy issuance, renewals, payments, endorsements, and recovery processes.',
      },
      {
        text: 'Built custom C#/.NET Extensions using Integration Studio, including email functionality, reusable components, and integration of external .NET libraries beyond standard OutSystems capabilities.',
      },
      {
        text: 'Designed and consumed REST/SOAP APIs, integrating payment gateways, government services, internal insurance systems, SMS, WhatsApp, and third-party platforms.',
      },
      {
        text: 'Worked extensively on AO Reduction, Advanced SQL, database optimization, application refactoring, performance tuning, Timers, background processing, caching, logging, and exception handling.',
      },
      {
        text: 'Performed advanced debugging, root-cause analysis, technical-debt reduction, UAT support, production issue resolution, and permanent fixes for complex applications and integrations.',
      },
    ],
    techStack:
      'OutSystems • Service Studio • Integration Studio • Reactive Web • Traditional Web • C# • .NET Extensions • REST APIs • SOAP • Advanced SQL • SQL Server • Timers • Performance Optimization • AO Reduction',
    logo: './logos/wataniya.png',
    logoAlt: 'Wataniya Insurance logo',
  },
  {
    role: 'Senior .NET Software Developer',
    company: 'General Authority of Civil Aviation (GACA) | Jeddah, Saudi Arabia',
    period: 'Aug 2012 — Dec 2022',
    summary:
      'Developed and supported enterprise-grade .NET solutions for aviation authority systems, with extensive hands-on experience across backend development, APIs, integrations, data access, performance, and production support.',
    highlights: [
      {
        title: 'Enterprise .NET Development',
        text: 'Built and maintained large-scale applications using .NET Framework, C#, ASP.NET, Entity Framework, and layered enterprise architecture, supporting long-running and business-critical government systems.',
      },
      {
        title: 'Database & Data Access Expertise',
        text: 'Worked extensively with Entity Framework using both Code First and Database First approaches, including data modeling, relationships, migrations, stored procedures, query optimization, and SQL Server integration.',
      },
      {
        title: 'API Development & External Integrations',
        text: 'Designed and developed REST APIs and backend services, including integrations with ELM, government-sector APIs, external systems, and third-party services, with secure authentication, validation, logging, and error handling.',
      },
      {
        title: 'Validation, Security & Code Quality',
        text: 'Implemented robust business and request validation using FluentValidation, along with secure coding practices, exception handling, reusable components, clean architecture principles, and maintainable application design.',
      },
      {
        title: 'Full SDLC & Production Support',
        text: 'Handled the complete software development lifecycle from requirements analysis, design, development, testing, and deployment through production support, troubleshooting, performance optimization, and long-term application enhancement.',
      },
    ],
    techStack:
      '.NET Framework • C# • ASP.NET • Entity Framework • Code First • Database First • FluentValidation • REST APIs • External API Integration • ELM Integration • Government APIs • SQL Server • Stored Procedures • LINQ • Backend Services • Enterprise Architecture • Production Support',
    logo: './logos/gaca.png',
    logoAlt: 'General Authority of Civil Aviation (GACA) logo',
  },
  {
    role: 'Senior .NET Software Developer',
    company: 'EVER TEAM | Riyadh, Saudi Arabia',
    period: 'Nov 2007 — Aug 2012',
    summary:
      'Worked in a software house environment, delivering customized .NET solutions for multiple clients and supporting the full lifecycle from requirements gathering to on-premises production deployment.',
    highlights: [
      {
        title: 'Multi-Client .NET Development',
        text: 'Developed and enhanced enterprise applications using C#, .NET Framework, ASP.NET, SQL Server, and service-oriented architecture, adapting solutions to different client requirements and business domains.',
      },
      {
        title: 'Client-Facing Requirement Analysis',
        text: 'Visited client locations with the Project Manager to understand business requirements, analyze change requests, clarify technical needs, and translate them into practical software enhancements.',
      },
      {
        title: 'Customization & Issue Resolution',
        text: 'Implemented client-specific features, modifications, integrations, and database changes while troubleshooting and fixing application issues reported from live environments.',
      },
      {
        title: 'On-Premises Deployment & Production Support',
        text: 'Deployed application releases, patches, and database updates directly to client on-premises production servers, validating deployments and resolving post-release issues.',
      },
      {
        title: 'End-to-End Delivery & Support',
        text: 'Supported multiple customers across requirements, development, testing, deployment, production troubleshooting, and ongoing application maintenance, gaining strong exposure to real-world enterprise environments.',
      },
    ],
    techStack:
      '.NET Framework • C# • ASP.NET • SQL Server • Web Services • Service-Oriented Architecture (SOA) • Stored Procedures • Database Development • System Integration • On-Premises Deployment • Production Support • Client-Site Support',
    logo: './logos/everteam.png',
    logoAlt: 'everteam, a Kyocera Group company logo',
  },
  {
    role: 'Software Developer',
    company: 'AFLAK Electronic Industries Co.',
    period: 'Aug 2007 — Oct 2007',
    summary:
      'Worked on desktop applications integrated with electronic hardware devices, gaining hands-on experience with device communication, low-level data handling, and hardware-software integration.',
    highlights: [
      {
        title: 'Desktop Application Development',
        text: 'Developed and supported Windows desktop applications using VB.NET, integrated with electronic and peripheral devices.',
      },
      {
        title: 'Biometric & Barcode Integration',
        text: 'Worked with fingerprint attendance systems, barcode devices, and related electronic peripherals, handling device data exchange and application-side processing.',
      },
      {
        title: 'Retail Security Systems',
        text: 'Supported applications integrated with product security and detection devices used in shopping malls and retail environments.',
      },
      {
        title: 'Hardware–Software Communication',
        text: 'Gained practical experience in device protocols, binary data representation, low-level communication, and processing of raw binary data between applications and hardware devices.',
      },
      {
        title: 'Technical Exposure',
        text: 'Although a short tenure, the role provided valuable experience in hardware integration, device-driven applications, troubleshooting, and low-level system communication.',
      },
    ],
    techStack:
      'VB.NET • .NET Framework • Windows Desktop Applications • Device Integration • Fingerprint Systems • Barcode Integration • Retail Security Devices • Binary Data Handling • Hardware–Software Communication',
    logo: './logos/aflak.png',
    logoAlt: 'Aflak Electronics Industries Company logo',
  },
  {
    role: 'Software Developer',
    company: 'AL AHLIA for Cooperative Insurance',
    period: 'Mar 2005 — Jul 2007',
    summary:
      'Started my career in the insurance domain, developing .NET desktop applications integrated with Oracle databases and supporting distributed insurance sales operations.',
    highlights: [
      {
        title: 'Insurance Desktop Application Development',
        text: 'Developed small .NET-based desktop applications used by insurance brokers to sell policies directly at customer and corporate locations.',
      },
      {
        title: 'Oracle Database Development',
        text: 'Worked with Oracle Database, including SQL queries, Stored Procedures, data export/import, database backup activities, and application data management.',
      },
      {
        title: 'Offline Sales & Data Synchronization',
        text: 'Supported broker applications that operated offline on laptops, allowing policies to be issued and printed remotely, with data synchronized to the central production database once connected to the company network.',
      },
      {
        title: 'Reporting & Policy Printing',
        text: 'Created and maintained Crystal Reports for policy documents, operational reports, and customer-facing printouts generated directly from the desktop application.',
      },
      {
        title: 'Application Support & Data Operations',
        text: 'Handled application enhancements, troubleshooting, data synchronization issues, database operations, and support for broker-side insurance applications.',
      },
    ],
    techStack:
      '.NET • Desktop Applications • Oracle Database • SQL • Stored Procedures • Crystal Reports • Data Synchronization • Import/Export • Database Backup • Offline Applications • Insurance Systems',
    logo: './logos/alahlia.png',
    logoAlt: 'AL AHLIA for cooperative insurance logo',
  },
]

export const skills: Skills = {
  heading: 'Skills',
  lead: 'Cursor AI, GitHub Copilot, OutSystems Low-code, .NET, integrations, data, and Azure AI.',
  groups: [
    {
      label: 'BACK-END',
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
      label: 'APIS & FRONT-END',
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
      label: 'DATA, AI & PLATFORMS',
      items: [
        'Cursor AI',
        'GitHub Copilot',
        'Microsoft SQL Server',
        'Oracle / PL-SQL',
        'Azure AI Services',
        'OCR & Computer Vision',
        'NLP & Machine Learning',
        'SharePoint Integration',
      ],
    },
  ],
  coreStrengths:
    'Building scalable enterprise solutions • Integrations & APIs • Data management • AI-powered capabilities • Performance & security • Modern development best practices',
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
  groups: [
    {
      label: 'OutSystems Certifications',
      logo: './logos/outsystems.svg',
      logoAlt: 'OutSystems logo',
      items: [
        { name: 'Platform Ops (O11)', since: 'Jun 24, 2025' },
        { name: 'Tech Lead (O11)', since: 'Jun 18, 2025' },
        { name: 'Associate Traditional Web Developer (O11)', since: 'Jun 27, 2024' },
        { name: 'Professional Mobile Developer (O11)', since: 'Nov 03, 2023' },
        { name: 'Professional Web Developer (O11)', since: 'Nov 03, 2023' },
        { name: 'Associate Developer (ODC)', since: 'Jul 24, 2023' },
        { name: 'Associate Developer (O11)', since: 'Jun 10, 2023' },
      ],
    },
    {
      label: 'OutSystems Specializations',
      logo: './logos/outsystems.svg',
      logoAlt: 'OutSystems logo',
      items: [
        { name: 'Architecture Specialist (ODC)', since: 'Jan 17, 2026' },
        { name: 'Web Developer Specialist (ODC)', since: 'Dec 28, 2024' },
        { name: 'Architecture Specialist (O11)', since: 'Nov 03, 2023' },
        { name: 'Security Specialist (O11 and ODC)', since: 'Sep 13, 2023' },
        { name: 'Web Developer Specialist (O11)', since: 'Aug 25, 2023' },
        { name: 'Mobile Developer Specialist (O11 and ODC)', since: 'Jul 13, 2023' },
      ],
    },
    {
      label: 'Additional Credentials',
      items: [
        { name: 'Microsoft Certified: Azure AI Fundamentals' },
        { name: 'Microsoft 365 Certified: Fundamentals' },
        { name: 'SCRUM Fundamentals' },
      ],
    },
  ],
}

export const contact: Contact = {
  heading: 'Let’s talk',
  body: 'Open to conversations about tech leadership, OutSystems/.NET delivery, and enterprise digital transformation.',
  cta: 'Email me',
}
