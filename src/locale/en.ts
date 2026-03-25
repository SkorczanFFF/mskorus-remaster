import type { Dictionary } from '@/locale/types';

import { experiences, nonWebProjects, projects, services } from './data/en';

export const en: Dictionary = {
  seoTitle: 'Maciej Skorus - Frontend Developer | Websites, Web Apps & Extensions',
  seoSiteName: 'Maciej Skorus - Frontend Developer',
  seoDescription:
    'Freelance frontend/fullstack developer from Poland. Modern websites, web applications, browser extensions, and 3D experiences. React, Next.js, TypeScript. B2B invoices, worldwide availability.',

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
  heroHeadline: 'I build modern websites and web applications',
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
  portfolioStayTuned: 'STAY TUNED',
  portfolioRepo: 'repo',
  portfolioLiveDemo: 'live demo',
  projects,
  nonWebProjects,

  contactPhone: '+48 668 366 648',
  contactEmail: 'skorusmaciej94@gmail.com',
  contactResponseTime: 'I respond within 24 hours',
  contactCompanyName: 'SKOFTware Maciej Skorus',
  contactCompanyInfo: 'Frontend / Fullstack Developer - Available for projects',
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
    'Versatile and open-minded developer focused on building engaging, user-centered frontend solutions, with solid hands-on experience in backend work. Skilled in Web3 development for the gaming industry and in crafting custom platforms and tools for the medical events sector, backed by a strong foundation in IT support. Personally passionate about WebGL, modding, and building useful and entertaining code, not only frontend centered',
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
