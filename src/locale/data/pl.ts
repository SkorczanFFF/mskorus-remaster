import type {
  ExperienceEntry,
  NonWebProject,
  ProjectEntry,
  ServiceEntry,
} from '@/locale/types';

export const services: ServiceEntry[] = [
  {
    icon: 'Globe',
    title: 'Strony internetowe',
    description:
      'Landing pages, strony firmowe, wizytówkowe. Responsywne, szybkie, zoptymalizowane pod SEO. Budowane w nowoczesnych frameworkach.',
  },
  {
    icon: 'React',
    title: 'Aplikacje webowe',
    description:
      'Dashboardy, panele administracyjne, platformy SaaS, narzędzia wewnętrzne. React, Next.js, TypeScript — skalowalne rozwiązania dopasowane do potrzeb biznesu.',
  },
  {
    icon: 'Extension',
    title: 'Rozszerzenia przeglądarkowe',
    description:
      'Rozszerzenia Chrome, narzędzia produktywności, integracje z przeglądarką. Od koncepcji po publikację w Chrome Web Store.',
  },
  {
    icon: 'Maintenance',
    title: 'Utrzymanie i rozwój',
    description:
      'Rozbudowa istniejących projektów o nowe funkcje, optymalizacja wydajności, naprawa błędów i bieżące wsparcie techniczne.',
  },
];

export const experiences: ExperienceEntry[] = [
  {
    company: 'BUSINESS SERVICE GALOP',
    position: 'Front-End Developer',
    date: 'MAJ 2024 - SIERPIEŃ 2025',
    resumeDate: 'Maj 2024 - Sierpień 2025',
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
      'Zaktualizowanie i rozbudowa wewnętrznego systemu zarządzania wydarzeniami o nowe funkcjonalności, optymalizacje oraz poprawki błędów; zaprojektowanie nowej strefy uczestnika zintegrowanej ze stronami wydarzeń; stworzenie dedykowanej instancji systemu dostosowanej do potrzeb kluczowego klienta, obsługującej różnorodne kursy i wydarzenia medyczne',
      'Stworzenie dedykowanych rozwiązań front-endowych dla wydarzeń medycznych (dostosowane formularze rejestracyjne i strony internetowe, strefy uczestnika, integracje z API), platformy VOD oraz responsywnych mailingów kompatybilnych ze wszystkimi głównymi usługami pocztowymi',
      'Opracowanie aplikacji mobilnej dla kolektorów danych Zebra (skanowanie kodów QR z lokalnym zapisem danych) oraz aplikacji webowej do rejestracji obecności na sesjach wydarzeń, obsługujących zarówno kioski do samodzielnego skanowania, jak i skanery Zebra',
      'Stworzenie konfigurowalnej aplikacji do głosowania na żywo z panelem administracyjnym i wynikami w czasie rzeczywistym; opracowanie wirtualnych stoisk wystawców z dokumentacją dla firm partnerskich',
      'Zapewnienie wsparcia IT na miejscu podczas wydarzeń w całej Polsce, dbając o płynne działanie systemów i niezawodność sprzętu; pomoc uczestnikom wydarzeń w razie potrzeby, również podczas konferencji międzynarodowych; reprezentowanie działu IT podczas międzynarodowych spotkań oraz okazjonalne pełnienie funkcji kierowcy firmowego',
    ],
  },
  {
    company: 'ANFATA GAMES',
    position: 'Junior Web3 Frontend Developer',
    date: 'WRZESIEŃ 2022 - SIERPIEŃ 2023',
    resumeDate: 'Wrzesień 2022 - Sierpień 2023',
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
      'Tworzenie zdecentralizowanej aplikacji zintegrowanej ze Smart Contracts i kolekcjami ImmutableX, w tym budowa marketplace\u2019u, mostkowanie NFT między L1 i L2, umożliwienie transferów między kontami oraz wdrożenie systemu aukcji na żywo',
      'Praca z bazami danych Moralis i Firebase oraz funkcjami w chmurze, z wykorzystaniem TypeScript, Next.js, GSAP i systemów kontroli wersji takich jak GitLab i Bitbucket',
      'Wdrożenie nowej strony głównej, integracja bloga opartego na Sanity CMS oraz tworzenie dedykowanych stron i funkcjonalności związanych z wydarzeniami w ramach platform firmy',
      'Manualne testowanie gry Pirates of the Arrland, w tym komponentów 3D MOBA oraz 2D mapy strategicznej w ramach zdecentralizowanej aplikacji',
      'Ścisła współpraca w międzynarodowym i interdyscyplinarnym zespole',
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
      'Animacja 3D w stylu synthwave, przypominająca kolorowankę, z możliwością personalizacji modeli i kolorów sceny w czasie rzeczywistym przez wbudowane GUI. Stworzona z kreatywnością i modelami z 3D Studio Max. Zawiera betę mini-gry wyprzedzania.',
    live: 'https://polonez-autodrive.vercel.app/',
    git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    resumeTechnologies: 'HTML • JavaScript • Three.js • 3D Studio Max 2019',
    resumeDescription:
      'Prosta trójwymiarowa animacja wykonana przy pomocy 3D Studio Max 2019 oraz Three.js. Wyeksportowane modele wraz z animacjami w formacie .fbx zostały połączone w scenę klimacie Synthwave/lat 80 tworząc interaktywną kolorowankę. Wbudowane GUI umożliwia łatwą manipulację elementami sceny i jej kolorami.',
  },
  {
    id: 1,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'Rozszerzenie do Chrome, które pokazuje ceny bez VAT po najechaniu na nie na dowolnej stronie. Wykrywa ceny na stronie i wyświetla kwotę netto w dymku oraz w okienku rozszerzenia. Obsługuje ponad 120 krajów z wstępnie skonfigurowanymi walutami i stawkami VAT, umożliwia ustawienie własnej stawki i waluty. Zawiera wbudowany kalkulator VAT (brutto/netto). Dostępne w Chrome Web Store.',
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
      'Fullstackowy wrapper React na model Chandra OCR LLM, działający w pełni lokalnie. Konfiguruje backend i dopracowany frontend do komunikacji z modelem. Akceptuje obrazy i pliki PDF, wyodrębnia tekst, tabele i obrazy, renderując wyniki jako Markdown, HTML lub JSON. Demonstracja integracji i okiełznania lokalnych modeli AI w środowisku webowym.',
    live: '',
    git: '',
  },
  {
    id: 3,
    pic: '/projects/portfolio.jpg',
    title: 'MSKORUS - moje portfolio',
    technos: 'Next.js • TypeScript • TailwindCSS • React Three Fiber • Blender',
    description:
      'Jednostronicowe portfolio ze sceną 3D i wbudowaną webową wersją CV. Scena jest modelowana w Blenderze i konwertowana do komponentów React Three Fiber JSX dla łatwiejszej interaktywności. Czyste eksperymenty webowe i poligon React Three Fiber.',
    live: 'https://mskorus.vercel.app/',
    git: 'https://github.com/SkorczanFFF/mskorus-remaster',
    resumeTechnologies:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • Blender',
    resumeDescription:
      'Przebudowana od podstaw przestarzała wersja mojego portfolio. Aktualnie bazuje na Next.js, TypeScript oraz TailwindCSS. Elementy sceny WebGL są modelami wykonanymi w Blender, następnie zostały skonwertowane do komponentów JSX biblioteki React Three Fiber dla prostrzego operowania elementami sceny. Zawiera wbudowaną wersję webową CV w języku polskim i angielskim.',
  },
  {
    id: 4,
    pic: '/projects/YAWA.jpg',
    title: 'Yet Another Weather App',
    technos: 'React • JavaScript • Sass • Vanta.js • Open-Meteo API',
    description:
      '"Kolejna Aplikacja Pogodowa" — ale z twistem. Informacje pogodowe wyświetlane dla wybranego miasta lub za pomocą geolokacji użytkownika. Interfejs wzbogacony o interaktywne elementy powiązane z aktualnymi warunkami pogodowymi i tłem. Backend przeszedł z OpenWeather na Open-Meteo. Był w stylu liquid glass, zanim stało się to modne. Na razie tylko wersja desktop.',
    live: 'https://yet-another-weather-app.vercel.app/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    resumeDescription:
      "'Kolejna Aplikacja Pogodowa', ale z powiewem świeżości. Informacje pogodowe są wyświetlane dla wybranego miasta lub za pomocą geolokacji użytkownika. Interfejs aplikacji został wzbogacony o dodatkowe możliwości interakcji z danymi pogodowymi oraz tłem.",
  },
];

export const nonWebProjects: NonWebProject[] = [
  {
    title: 'Tibia Key Presser',
    tech: 'Python, Tkinter, pywinauto',
    description:
      'Lekkie narzędzie automatyzacji w Pythonie do gry Tibia (MMORPG), stworzone do użytku osobistego w celu wspomagania treningu umiejętności magicznych na serwerach Open Tibia. Obsługuje do ośmiu par klawisz-opóźnienie z konfigurowalnymi opóźnieniami od 0 do 10 sekund, wraz z indywidualnym resetem i usuwaniem. Narzędzie automatycznie wykrywa okno gry Tibia, zapewnia dynamiczne informacje w interfejsie oraz proste sterowanie Start/Stop. Zaprojektowane z myślą o wydajności i minimalnym zużyciu zasobów, działa w tle bez zakłócania innych aktywności i gier.',
    links: [
      {
        href: 'https://github.com/SkorczanFFF/tibia-key-presser',
        label: 'repozytorium',
      },
    ],
  },
  {
    title: 'Package Delivery SA:MP Server',
    tech: 'PawnC, SA:MP',
    description:
      'System dostawczy dla serwera San Andreas Multiplayer, stworzony dla zabawy i celów edukacyjnych z przyjacielem. System obejmuje funkcje odbioru i dostawy paczek, mapę podzieloną na regiony dostaw oraz dedykowane huby załadunku/rozładunku w każdym mieście.\nAby zwiększyć realizm i immersję, system zawiera również dodatkowe skrypty, takie jak losowe przebicia opon i raport stanu pojazdu po zmianie. Plany na przyszłość obejmują rozszerzenie systemu o mieszkania, pojazdy osobiste i więcej funkcjonalności w grze.',
    links: [],
  },
];
