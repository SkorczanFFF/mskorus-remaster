import type {
  ExperienceEntry,
  NonWebProject,
  ProjectEntry,
  ServiceEntry,
} from '@/locale/types';

export const services: ServiceEntry[] = [
  {
    icon: 'Globe',
    title: 'Websites',
    tagline: 'Your digital front door.',
    description:
      'Landing pages, company sites, and business cards. Fast, responsive, SEO-optimized — designed to turn visitors into clients.',
  },
  {
    icon: 'React',
    title: 'Web applications',
    tagline: 'Software that runs your business.',
    description:
      'Dashboards, admin panels, SaaS, internal tools, and browser extensions. Scalable solutions in React, Next.js, and TypeScript.',
  },
  {
    icon: 'Sparkles',
    title: 'AI integration',
    tagline: 'Intelligence, locally yours.',
    description:
      'AI models integrated into real products — locally on your hardware or via the cloud. Wrapped in polished, user-ready interfaces.',
  },
  {
    icon: 'Cube',
    title: '3D & WebGL',
    tagline: 'The web, in three dimensions.',
    description:
      'Interactive scenes, product visualizers, and creative 3D experiences. Three.js, React Three Fiber, Blender — from model to browser.',
  },
  {
    icon: 'Phone',
    title: 'Mobile apps',
    tagline: 'Your app, everywhere.',
    description:
      'Cross-platform iOS & Android built with React Native. From barcode scanners and event kiosks to polished consumer products.',
  },
  {
    icon: 'Wrench',
    title: 'Maintenance & growth',
    tagline: 'Evolve, don\'t rewrite.',
    description:
      'Performance optimization, feature expansion, stack modernization, and ongoing technical support. Your codebase, always moving.',
  },
];

export const experiences: ExperienceEntry[] = [
  {
    company: '2SIMPLE',
    position: 'Fullstack Developer',
    date: 'SEP 2025 - PRESENT',
    resumeDate: 'Sep 2025 - Present',
    resumeType: 'Remote',
    stack: [
      'React',
      'TailwindCSS',
      'Python',
      'PostgreSQL',
      'TypeScript',
      'MobX',
      'Git',
    ],
    icon: '2SIMPLE.png',
    duties: [
      'Developing tools and pipelines for processing and transforming digital documents and scans',
      'Building dedicated applications and solutions for clients in the medical sector',
    ],
  },
  {
    company: 'BUSINESS SERVICE GALOP',
    position: 'Front-End Developer',
    date: 'MAY 2024 - AUG 2025',
    resumeDate: 'May 2024 - Aug 2025',
    resumeType: 'Hybrid',
    stack: [
      'PHP',
      'MySQL',
      'Laravel',
      'React Native',
      'Vanilla JS',
      'TypeScript',
      'Next.js',
      'TailwindCSS',
      'Git',
    ],
    icon: 'BSG.png',
    duties: [
      'Updated and expanded the internal event management system with new functionalities, system optimizations, and bug fixes; designed a new participant zone integrated into the event websites; created a dedicated system instance tailored to the needs of a major client, supporting diverse medical courses and events',
      'Developed a management system for the Endoscopy Section and a VoD platform for purchasing and accessing recorded conference content, dedicated front-end solutions for medical events (customized registration forms and websites, participant zones, API integrations) and responsive mailings compatible across all major email services',
      'Developed a mobile application for Zebra data collectors and a web application for attendance tracking during event sessions, supporting both self-scanning kiosks and Zebra scanners',
      'Built a customizable live voting application with an administrative panel and real-time results; developed virtual exhibitor booths with documentation for partner companies',
      'Provided onsite IT support during events across Poland, ensuring smooth operation of software systems and hardware reliability; assisted event participants when needed, including at international conferences; represented the IT department during international meetings and occasionally served as a company driver',
    ],
  },
  {
    company: 'ANFATA GAMES',
    position: 'Junior Web3 Frontend Developer',
    date: 'SEP 2022 - AUG 2023',
    resumeDate: 'Sep 2022 - Aug 2023',
    resumeType: 'Hybrid',
    stack: [
      'Next.js',
      'TypeScript',
      'GSAP',
      'Sanity CMS',
      'Moralis',
      'Firebase',
      'Web3',
      'TailwindCSS',
      'Git',
    ],
    icon: 'ANFATA.png',
    duties: [
      'Developed a decentralized application integrated with Smart Contracts and ImmutableX collections, including building a marketplace, bridging NFTs between L1 and L2, enabling transfers between accounts, and implementing a live auction system.',
      'Worked with Moralis and Firebase databases and cloud functions, using TypeScript, Next.js, GSAP, and version control systems like GitLab and Bitbucket.',
      'Implemented a new homepage, integrated a Sanity CMS blog system, and built custom event-oriented websites and features across company platforms.',
      'Performed manual testing of Pirates of the Arrland, including the 3D MOBA game and 2D strategic map components within the decentralized app.',
      'Collaborated closely with cross-functional and international team to deliver integrated Web3 experiences.',
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: 0,
    pic: '/projects/polonez_autodrive.jpg',
    title: 'POLONEZ AUTODRIVE',
    technos: 'JavaScript • Three.js • 3D Studio Max',
    description:
      'An 80s/synthwave-style 3D coloring-book animation with dynamic color customization of the scene and displayed elements via a built-in GUI. Scene models were created in 3D Studio Max. Includes a beta arcade mini-game based on overtaking other vehicles.',
    live: 'https://www.polonez-autodrive.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    resumeTechnologies: 'JavaScript • Three.js • 3D Studio Max',
    resumeDescription:
      'An 80s/synthwave-style 3D coloring-book animation with dynamic color customization of the scene and displayed elements via a built-in GUI. Scene models were created in 3D Studio Max. Includes a beta arcade mini-game based on overtaking other vehicles.',
  },
  {
    id: 1,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'Chrome extension that shows prices excluding VAT when you hover over them on any website. Automatically detects prices and displays the net amount in a tooltip on hover. Supports 120+ countries with preconfigured currencies and VAT rates, and allows custom VAT rate and currency. Features a built-in VAT calculator (GROSS/NET). Available on the Chrome Web Store.',
    live: 'https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl',
    git: 'https://github.com/SkorczanFFF/VAT-OFF',
    liveLabel: 'Chrome Web Store',
    resumeTechnologies: 'JavaScript • Chrome Extension API • CSS',
    resumeDescription:
      'Chrome extension that shows prices excluding VAT when you hover over them on any website. Automatically detects prices and displays the net amount in a tooltip on hover. Supports 120+ countries with preconfigured currencies and VAT rates, and allows custom VAT rate and currency. Features a built-in VAT calculator (GROSS/NET). Available on the Chrome Web Store.',
  },
  {
    id: 2,
    pic: '/projects/tba.jpg',
    title: 'Chandrastic',
    technos: 'React • TypeScript • Python • FastAPI • Chandra OCR LLM',
    description:
      'A fullstack React wrapper for the Chandra OCR LLM model, running entirely locally. Sets up the backend and a polished frontend for communicating with the model. Accepts images and PDF files, extracts text, tables, and images, and renders output as Markdown, HTML, or JSON. A showcase of integrating and taming local AI models in a web environment.',
    live: '',
    git: '',
  },
  {
    id: 3,
    pic: '/projects/portfolio.jpg',
    title: 'SKOFTware - my portfolio',
    technos: 'Next.js • TypeScript • TailwindCSS • React Three Fiber • GSAP • i18n',
    description:
      'My portfolio website — a playground for web experiments and testing solutions. Features a 3D scene built in React Three Fiber, transitions and animations in GSAP, and i18n for multilingual support. Also includes a built-in web version of my resume in Polish and English. A project in constant evolution, probably forever "WIP".',
    live: process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/mskorus-remaster',
    resumeTechnologies:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • GSAP • i18n',
    resumeDescription:
      'My portfolio website — a playground for web experiments and testing solutions. Features a 3D scene built in React Three Fiber, transitions and animations in GSAP, and i18n for multilingual support. Also includes a built-in web version of my resume in Polish and English. A project in constant evolution, probably never leaving "WIP" status.',
  },
  {
    id: 4,
    pic: '/projects/YAWA.jpg',
    title: 'Yet Another Weather App',
    technos: 'React • JavaScript • Sass • Vanta.js • Open-Meteo API',
    description:
      '"Yet Another Weather App" — but different. The interactive interface features real-time weather simulation based on Open-Meteo data. Weather information displayed for a selected city or via map/geolocation. Currently undergoing a major rebuild, but feel free to check the weather.',
    live: 'https://www.yet-another-weather-app.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    resumeDescription:
      '"Yet Another Weather App" — but different. The interactive interface features real-time weather simulation based on Open-Meteo data. Weather information displayed for a selected city or via map/geolocation. Currently undergoing a major rebuild, but feel free to check the weather.',
  },
];

export const nonWebProjects: NonWebProject[] = [
  {
    title: 'Tibia Key Presser',
    tech: 'Python, Tkinter, pywinauto',
    description:
      'A lightweight Python-based automation tool for Tibia (MMORPG), developed for personal use to assist with magic skill training on Open Tibia Servers. It supports up to eight key-delay pairs with customizable delays from 0 to 10 seconds, along with individual reset and delete options. The tool automatically detects the Tibia game window, provides dynamic UI feedback, and offers simple Start/Stop controls. Designed for efficiency and minimal resource usage, it runs perfectly in the background, without interrupting other activities and games.',
    links: [
      {
        href: 'https://github.com/SkorczanFFF/tibia-key-presser',
        label: 'repo',
      },
    ],
  },
  {
    title: 'Package Delivery SA:MP Server',
    tech: 'PawnC, SA:MP',
    description:
      'A package delivery system for a San Andreas Multiplayer server, created for fun and educational purposes with a friend. The system includes features for picking up and delivering packages, a map divided into package delivery regions, and dedicated loading/unloading hubs in each city.\nTo enhance realism and immersion, the system also includes additional scripts such as random tire punctures and a post-shift vehicle condition report. Future plans include expanding the system with housing, personal vehicles, and more in-game functionalities.',
    links: [],
  },
];
