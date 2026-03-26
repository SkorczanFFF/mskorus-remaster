import type { ExperienceEntry, NonWebProject, ProjectEntry, ServiceEntry } from '@/locale/types';

export const services: ServiceEntry[] = [
  {
    icon: 'Globe',
    title: 'Websites',
    description:
      'Landing pages, company websites, business cards. Responsive, fast, SEO-optimized. Built with modern frameworks for the best user experience.',
  },
  {
    icon: 'React',
    title: 'Web applications',
    description:
      'Dashboards, admin panels, SaaS platforms, internal tools. React, Next.js, TypeScript — scalable solutions tailored to your business needs.',
  },
  {
    icon: 'Extension',
    title: 'Browser extensions',
    description:
      'Chrome extensions, productivity tools, browser integrations. From concept to Chrome Web Store publication.',
  },
  {
    icon: 'Maintenance',
    title: 'Maintenance & growth',
    description:
      'Expanding existing projects with new features, performance optimization, bug fixing, and ongoing technical support.',
  },
];

export const experiences: ExperienceEntry[] = [
  {
    company: 'BUSINESS SERVICE GALOP',
    position: 'Front-End Developer',
    date: 'MAY 2024 - AUG 2025',
    resumeDate: 'May 2024 - Aug 2025',
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
      'Developed a mobile application for Zebra data collectors (QR code scanning with local data storage) and a web application for attendance tracking during event sessions, supporting both self-scanning kiosks and Zebra scanners',
      'Built a customizable live voting application with an administrative panel and real-time results; developed virtual exhibitor booths with documentation for partner companies',
      'Provided onsite IT support during events across Poland, ensuring smooth operation of software systems and hardware reliability; assisted event participants when needed, including at international conferences; represented the IT department during international meetings and occasionally served as a company driver',
    ],
  },
  {
    company: 'ANFATA GAMES',
    position: 'Junior Web3 Frontend Developer',
    date: 'SEP 2022 - AUG 2023',
    resumeDate: 'Sep 2022 - Aug 2023',
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
      'A synthwave-style 3D coloring-book like animation with real-time model and color customization of the scene via a built-in GUI. Built with creativity and models from 3D Studio Max. Now includes a beta overtaking mini-game.',
    live: 'https://polonez-autodrive.vercel.app/',
    git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    resumeTechnologies: 'JavaScript • Three.js • 3D Studio Max 2019',
    resumeDescription:
      'A synthwave style 3D coloring-book like animation with real-time model and color customization of the scene via a built-in GUI. Built with creativity and models from 3D Studio Max. Now includes a beta overtaking mini-game. Play some music and have fun!',
  },
  {
    id: 1,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'Chrome extension that shows prices excluding VAT when you hover over them on any website. It detects prices on the page and displays the net amount in a tooltip and in the extension popup. Supports 120+ countries with preconfigured currencies and VAT rates, and allows custom VAT rate and currency. Features a built-in VAT calculator (GROSS/NET) in the popup. Available on the Chrome Web Store.',
    live: 'https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl',
    git: 'https://github.com/SkorczanFFF/VAT-OFF',
    liveLabel: 'Chrome Web Store',
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
    title: 'MSKORUS - my portfolio',
    technos:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber • Blender',
    description:
      'Single page portfolio website with 3D scene and built-in web (HTML & CSS) version of resume. Hero scene is made in Blender and converted to React Three Fiber JSX components for easier interactivity. Pure web experiments and React Three Fiber battleground.',
    live: 'https://mskorus.vercel.app/',
    git: 'https://github.com/SkorczanFFF/mskorus-remaster',
    resumeTechnologies:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • Blender',
    resumeDescription:
      'Single page portfolio website with 3D scene and built-in web (HTML & CSS) version of resume. Hero scene is made in Blender and converted to React Three Fiber JSX components for easier interactivity. Pure web experiments and React Three Fiber battleground.',
  },
  {
    id: 4,
    pic: '/projects/YAWA.jpg',
    title: 'Yet Another Weather App',
    technos: 'React • JavaScript • Sass • Vanta.js • Open-Meteo API',
    description:
      'Another `weather application` — but with a twist. Weather data is displayed for a selected city or via user geolocation, with an interface enriched by interactive elements tied to the current weather conditions and background. Recently, the backend switched from OpenWeather to Open-Meteo. It was into liquid glass style before it became cool. Still desktop-only for now.',
    live: 'https://yet-another-weather-app.vercel.app/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    resumeDescription:
      'Another `weather application` — but with a twist. Weather data is displayed for a selected city or via user geolocation, with an interface enriched by interactive elements tied to the current weather conditions and background. Recently, the backend switched from OpenWeather to Open-Meteo. It was into liquid glass style before it became cool. Still desktop-only for now.',
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
