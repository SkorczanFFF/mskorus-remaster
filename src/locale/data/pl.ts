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
    tagline: 'Twoje cyfrowe drzwi wejściowe.',
    description:
      'Landing pages, strony firmowe i wizytówkowe. Szybkie, responsywne, zoptymalizowane pod SEO — zaprojektowane, by przyciągać nowych klientów.',
  },
  {
    icon: 'React',
    title: 'Aplikacje webowe',
    tagline: 'Software, który napędza Twój biznes.',
    description:
      'Dashboardy, panele administracyjne, SaaS, narzędzia wewnętrzne i rozszerzenia. Skalowalne rozwiązania w React, Next.js i TypeScript.',
  },
  {
    icon: 'Sparkles',
    title: 'Integracja AI',
    tagline: 'Inteligencja, lokalnie Twoja.',
    description:
      'Modele AI zintegrowane z produktem — lokalnie na Twoim sprzęcie lub w chmurze. Dopracowane interfejsy gotowe dla użytkowników.',
  },
  {
    icon: 'Cube',
    title: '3D i WebGL',
    tagline: 'Web w trzech wymiarach.',
    description:
      'Interaktywne sceny, wizualizacje produktów i kreatywne doświadczenia 3D. Three.js, React Three Fiber, Blender — od modelu do przeglądarki.',
  },
  {
    icon: 'Phone',
    title: 'Aplikacje mobilne',
    tagline: 'Twoja aplikacja, wszędzie.',
    description:
      'Wieloplatformowe aplikacje iOS i Android w React Native. Od skanerów kodów i kiosków eventowych po dopracowane produkty konsumenckie.',
  },
  {
    icon: 'Wrench',
    title: 'Utrzymanie i rozwój',
    tagline: 'Rozwijaj, nie przepisuj.',
    description:
      'Optymalizacja wydajności, rozbudowa funkcji, modernizacja stacku i bieżące wsparcie techniczne. Twój codebase, wiecznie w rozwoju.',
  },
];

export const experiences: ExperienceEntry[] = [
  {
    company: '2SIMPLE',
    position: 'Fullstack Developer',
    date: 'WRZESIEŃ 2025 - OBECNIE',
    resumeDate: 'Wrzesień 2025 - Obecnie',
    resumeType: 'Zdalnie',
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
      'Tworzenie narzędzi i pipeline\'ów do obróbki i przetwarzania dokumentów cyfrowych i skanów',
      'Tworzenie dedykowanych aplikacji i rozwiązań dla klientów z sektora medycznego',
    ],
  },
  {
    company: 'BUSINESS SERVICE GALOP',
    position: 'Front-End Developer',
    date: 'MAJ 2024 - SIERPIEŃ 2025',
    resumeDate: 'Maj 2024 - Sierpień 2025',
    resumeType: 'Hybrydowo',
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
      'Opracowanie aplikacji mobilnej dla kolektorów danych Zebra oraz aplikacji webowej do rejestracji obecności na sesjach wydarzeń, obsługujących zarówno kioski do samodzielnego skanowania, jak i skanery Zebra',
      'Stworzenie konfigurowalnej aplikacji do głosowania na żywo z panelem administracyjnym i wynikami w czasie rzeczywistym; opracowanie wirtualnych stoisk wystawców z dokumentacją dla firm partnerskich',
      'Zapewnienie wsparcia IT na miejscu podczas wydarzeń w całej Polsce, dbając o płynne działanie systemów i niezawodność sprzętu; pomoc uczestnikom wydarzeń w razie potrzeby, również podczas konferencji międzynarodowych; reprezentowanie działu IT podczas międzynarodowych spotkań oraz okazjonalne pełnienie funkcji kierowcy firmowego',
    ],
  },
  {
    company: 'ANFATA GAMES',
    position: 'Junior Web3 Frontend Developer',
    date: 'WRZESIEŃ 2022 - SIERPIEŃ 2023',
    resumeDate: 'Wrzesień 2022 - Sierpień 2023',
    resumeType: 'Hybrydowo',
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
      'Tworzenie zdecentralizowanej aplikacji zintegrowanej ze Smart Contracts i kolekcjami ImmutableX, w tym budowa marketplace\u2019u, mostkowanie NFT między L1 i L2, umożliwienie transferów między kontami oraz implementacja i wdrożenie systemu aukcji na żywo opartego o blockchain',
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
      'Animacja 3D w stylu lat 80/synthwave w formie kolorowanki, z możliwością dynamicznej zmiany kolorów sceny i wyświetlanych elementów przez wbudowane GUI. Modele sceny zostały stworzone w 3D Studio Max, zawiera wersję beta mini-gry zręcznościowej polegającej na wyprzedzaniu innych pojazdów.',
    live: 'https://polonez-autodrive.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/Polonez-Autodrive',
    resumeTechnologies: 'JavaScript • Three.js • 3D Studio Max',
    resumeDescription:
      'Animacja 3D w stylu lat 80/synthwave w formie kolorowanki, z możliwością dynamicznej zmiany kolorów sceny i wyświetlanych elementów przez wbudowane GUI. Modele sceny zostały stworzone w 3D Studio Max, zawiera wersję beta mini-gry zręcznościowej polegającej na wyprzedzaniu innych pojazdów.',
  },
  {
    id: 1,
    pic: '/projects/VAT-OFF.jpg',
    title: 'VAT-OFF',
    technos: 'JavaScript • Chrome Extension API • CSS',
    description:
      'Rozszerzenie do Chrome, które pokazuje ceny bez VAT po najechaniu na nie na dowolnej stronie. Wykrywa automatycznie ceny i wyświetla kwotę netto w dymku po najechaniu na nie. Obsługuje ponad 120 krajów z wstępnie skonfigurowanymi walutami i stawkami VAT, umożliwia ustawienie własnej stawki i waluty. Zawiera wbudowany kalkulator VAT (brutto/netto). Dostępne w Chrome Web Store.',
    live: 'https://chromewebstore.google.com/detail/vat-off/lplomppbbkgehcldiilhckbdalnblhdl',
    git: 'https://github.com/SkorczanFFF/VAT-OFF',
    liveLabel: 'Chrome Web Store',
    resumeTechnologies: 'JavaScript • Chrome Extension API • CSS',
    resumeDescription:
      'Rozszerzenie do Chrome, które pokazuje ceny bez VAT po najechaniu na nie na dowolnej stronie. Wykrywa automatycznie ceny i wyświetla kwotę netto w dymku po najechaniu na nie. Obsługuje ponad 120 krajów z wstępnie skonfigurowanymi walutami i stawkami VAT, umożliwia ustawienie własnej stawki i waluty. Zawiera wbudowany kalkulator VAT (brutto/netto). Dostępne w Chrome Web Store.',
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
    title: 'SKOFTware - moje portfolio',
    technos: 'Next.js • TypeScript • TailwindCSS • React Three Fiber • GSAP • i18n',
    description:
      'Moja strona portfolio, poligon do eksperymentów webowych i testów rozwiązań. Zawiera scenę 3D stworzoną w React Three Fiber, przejścia i animacje w GSAP oraz i18n do obsługi wielojęzyczności. Dodatkowo zawiera wbudowaną webową wersję CV w języku polskim i angielskim. Projekt nieustannie ewoluujący, prawdopodobnie na zawsze "WIP".',
    live: process.env.NEXT_PUBLIC_SITE_URL || 'https://skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/mskorus-remaster',
    resumeTechnologies:
      'Next.js • TypeScript • TailwindCSS • React Three Fiber/Three.js • GSAP • i18n',
    resumeDescription:
      'Moja strona portfolio, poligon do eksperymentów webowych i testów rozwiązań. Zawiera scenę 3D stworzoną w React Three Fiber, przejścia i animacje w GSAP oraz i18n do obsługi wielojęzyczności. Dodatkowo zawiera wbudowaną webową wersję CV w języku polskim i angielskim. Projekt nieustannie ewoluujący, prawdopodobnie nigdy nie wyjdzie z fazy "WIP".',
  },
  {
    id: 4,
    pic: '/projects/YAWA.jpg',
    title: 'Yet Another Weather App',
    technos: 'React • JavaScript • Sass • Vanta.js • Open-Meteo API',
    description:
      '"Kolejna Aplikacja Pogodowa" - ale inaczej. Interaktywny interfejs został wzbogacony o wyświetlanie symulacji pogody w czasie rzeczywistym bazującej na danych z Open-Meteo. Informacje pogodowe wyświetlane dla wybranego miasta lub za pomocą mapy bądź geolokacji. Aktualnie w gruntownej przebudowie, jednak można śmiało sprawdzać pogodę.',
    live: 'https://yet-another-weather-app.skoftware.pl/',
    git: 'https://github.com/SkorczanFFF/YetAnotherWeatherApp/',
    resumeDescription:
      '"Kolejna Aplikacja Pogodowa" - ale inaczej. Interaktywny interfejs został wzbogacony o wyświetlanie symulacji pogody w czasie rzeczywistym bazującej na danych z Open-Meteo. Informacje pogodowe wyświetlane dla wybranego miasta lub za pomocą mapy bądź geolokacji. Aktualnie w gruntownej przebudowie, jednak można śmiało sprawdzać pogodę.',
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
