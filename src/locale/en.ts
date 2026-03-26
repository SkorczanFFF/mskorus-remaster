import type { Dictionary } from '@/locale/types';

import { experiences, nonWebProjects, projects, services } from './data/en';

export const en: Dictionary = {
  seoTitle: 'Maciej Skorus - Creative Fullstack Developer | Web Apps, Services & 3D',
  seoSiteName: 'Maciej Skorus - Creative Fullstack Developer',
  seoDescription:
    'Creative fullstack developer from Poland. Web applications, digital services, 3D experiences, and mobile apps. React, Next.js, Python, TypeScript. B2B invoices, worldwide availability.',

  notFoundTitle: 'Page Not Found',
  notFoundBack: 'Back to Home',

  navHome: 'Home',
  navExperience: 'Experience',
  navTechnologies: 'Technologies',
  navPortfolio: 'Portfolio',
  navContact: 'Contact',
  navResume: 'Resume',
  toggleMenu: 'Toggle Menu',

  heroGreeting: "Hey, I'm Maciej.",
  heroName: 'Skorus Maciej.',
  heroHeadline: 'Ideas in. Software out.',
  heroErrorFallback: '3D scene could not be loaded.',

  footerCopyright: '© {year} SKOFTWARE Maciej Skorus. All rights reserved.',
  footerResume: 'RESUME',
  footerResumeOnline: 'VIEW ONLINE',
  footerResumeDownload: 'DOWNLOAD PDF',
  footerHeading: "LET'S TALK.",
  footerNarrative:
    'Seeking a partner to translate complex requirements into elegant technical solutions? Reach out to start a conversation about your next venture.',
  footerDirectLabel: 'Direct Communication',
  footerNetworkLabel: 'Network',

  navServices: 'Services',
  servicesSectionTitle: 'SERVICES',
  services,

  experienceSectionTitle: 'WORK EXP',
  experiences,

  techStackTitle: 'TECH STACK',
  techCategoryFrontend: 'frontend',
  techCategoryBackend: 'backend',
  techCategoryDatabase: 'database',
  techCategoryDesign: 'design',
  techCategoryTools: 'tools',

  portfolioTitle: 'PORTFOLIO',
  portfolioNonWeb: 'NON WEB',
  portfolioRelated: 'RELATED',
  portfolioCorner: 'CORNER',
  portfolioRepo: 'repo',
  portfolioLiveDemo: 'live demo',
  projects,
  nonWebProjects,

  contactPhone: '+48 668 366 648',
  contactEmail: 'skorusmaciej94@gmail.com',
  contactResponseTime: 'I respond within 24 hours',
  contactCompanyName: 'SKOFTware Maciej Skorus',
  contactCompanyInfo: 'Creative Fullstack Developer - Available for projects',
  contactNip: 'NIP: 6252501911',
  contactLocation: 'Silesia, Poland',
  contactInvoiceInfo: 'Worldwide',

  resumeHeaderAbout: 'ABOUT',
  resumeHeaderContact: 'CONTACT',
  resumeHeaderLanguagesTitle: 'LANGUAGES',
  resumeLanguageEnglish: 'English - C1',
  resumeLanguageRussian: 'Russian - A2',
  resumeLanguagePolish: 'Polish - native',
  resumeHeaderLinks: 'LINKS',
  resumeHeaderHobbies: 'HOBBIES',
  resumeHeaderExperience: 'EXPERIENCE',
  resumeHeaderEducation: 'EDUCATION',
  resumeHeaderSelectedProjects: 'SELECTED PROJECTS',
  resumeHeaderSkills: 'SKILLS AND TOOLS',
  resumeHeaderDownload: 'DOWNLOAD',
  resumeAboutMe:
    'Creative fullstack developer with nearly 4 years of professional experience across web applications, internal systems, mobile apps, and 3D. Built production platforms for the medical events sector, decentralized blockchain applications for the gaming industry, and fullstack tools for document and media processing. Experienced in running and integrating local AI/LLM models. Comfortable across the entire stack: React/Next.js on the frontend, Python/Node.js on the backend, PostgreSQL/MongoDB for data, and Docker for deployment. Personally passionate about WebGL, modding, and building useful and entertaining code',
  resumeEducation: {
    university: 'UNIVERSITY OF SILESIA',
    field: 'Web Application Programming',
    degree: 'Engineer degree',
    dates: 'October 2017 - June 2021',
  },
  resumeRodo:
    'I agree to the processing of personal data provided in this document for realising the recruitment process pursuant to the Personal Data Protection Act of 10 May 2018 (Journal of Laws 2018, item 1000) and in agreement with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation)',
  resumeRepo: 'repository',
  resumeDemo: 'web demo',
};
