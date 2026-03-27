export type Locale = 'en' | 'pl';

export type ExperienceEntry = {
  company: string;
  position: string;
  date: string;
  resumeDate: string;
  stack: string[];
  icon: string;
  duties: string[];
};

export type ProjectEntry = {
  id: number;
  pic: string;
  title: string;
  technos: string;
  description: string;
  live: string;
  git: string;
  /** Overrides `portfolioLiveDemo` for the live link label (e.g. Chrome Web Store). */
  liveLabel?: string;
  /** Resume-specific overrides — only set for projects shown in the CV. */
  resumeTechnologies?: string;
  resumeDescription?: string;
};

export type ServiceEntry = {
  icon: string;
  title: string;
  description: string;
};

export type NonWebProject = {
  title: string;
  tech: string;
  description: string;
  links: Array<{ href: string; label: string }>;
};

export type Dictionary = {
  seoTitle: string;
  seoSiteName: string;
  seoDescription: string;

  notFoundTitle: string;
  notFoundBack: string;

  navHome: string;
  navExperience: string;
  navTechnologies: string;
  navPortfolio: string;
  navContact: string;
  navResume: string;
  toggleMenu: string;

  heroGreeting: string;
  heroName: string;
  heroHeadline: string;
  heroErrorFallback: string;

  footerCopyright: string;
  footerResume: string;
  footerResumeOnline: string;
  footerResumeDownload: string;
  footerHeading: string;
  footerNarrative: string;
  footerDirectLabel: string;
  footerNetworkLabel: string;

  navServices: string;
  servicesSectionTitle: string;
  services: ServiceEntry[];

  experienceSectionTitle: string;
  experiences: ExperienceEntry[];

  techStackTitle: string;
  techCategoryFrontend: string;
  techCategoryBackend: string;
  techCategoryDatabase: string;
  techCategoryDesign: string;
  techCategoryTools: string;

  portfolioTitle: string;
  portfolioNonWeb: string;
  portfolioRelated: string;
  portfolioCorner: string;
  portfolioRepo: string;
  portfolioLiveDemo: string;
  projects: ProjectEntry[];
  nonWebProjects: NonWebProject[];

  contactPhone: string;
  contactEmail: string;
  contactResponseTime: string;
  contactCompanyName: string;
  contactCompanyInfo: string;
  contactNip: string;
  contactLocation: string;
  contactInvoiceInfo: string;

  resumeHeaderAbout: string;
  resumeHeaderContact: string;
  resumeHeaderLanguagesTitle: string;
  resumeLanguageEnglish: string;
  resumeLanguageRussian: string;
  resumeLanguagePolish: string;
  resumeHeaderLinks: string;
  resumeHeaderHobbies: string;
  resumeHeaderExperience: string;
  resumeHeaderEducation: string;
  resumeHeaderSelectedProjects: string;
  resumeHeaderSkills: string;
  resumeHeaderDownload: string;
  resumeAboutMe: string;
  resumeEducation: {
    university: string;
    field: string;
    degree: string;
    dates: string;
  };
  resumeRodo: string;
  resumeRepo: string;
  resumeDemo: string;

  cookieTitle: string;
  cookieDescription: string;
  cookieAcceptAll: string;
  cookieRejectAll: string;
  cookieManagePreferences: string;
  cookiePreferencesTitle: string;
  cookieSavePreferences: string;
  cookieClose: string;
  cookieNecessaryTitle: string;
  cookieNecessaryDescription: string;
  cookieAnalyticsTitle: string;
  cookieAnalyticsDescription: string;
  cookieSettings: string;

  cookiePolicyTitle: string;
  cookiePolicyIntro: string;
  cookiePolicyWhatAreCookiesTitle: string;
  cookiePolicyWhatAreCookies: string;
  cookiePolicyControllerTitle: string;
  cookiePolicyController: string;
  cookiePolicyCookiesWeUseTitle: string;
  cookiePolicyCookiesWeUseIntro: string;
  cookiePolicyTableName: string;
  cookiePolicyTableProvider: string;
  cookiePolicyTablePurpose: string;
  cookiePolicyTableCategory: string;
  cookiePolicyTableType: string;
  cookiePolicyTableDuration: string;
  cookiePolicyCookieCC: string;
  cookiePolicyCookieCCPurpose: string;
  cookiePolicyCookieLocale: string;
  cookiePolicyCookieLocalePurpose: string;
  cookiePolicyCookieVercelAnalytics: string;
  cookiePolicyCookieVercelAnalyticsPurpose: string;
  cookiePolicyCookieVercelSpeed: string;
  cookiePolicyCookieVercelSpeedPurpose: string;
  cookiePolicyLegalBasisTitle: string;
  cookiePolicyLegalBasis: string;
  cookiePolicyManageTitle: string;
  cookiePolicyManage: string;
  cookiePolicyManageBrowser: string;
  cookiePolicyResetButton: string;
  cookiePolicyThirdPartyTitle: string;
  cookiePolicyThirdParty: string;
  cookiePolicyRightsTitle: string;
  cookiePolicyRightsIntro: string;
  cookiePolicyRightAccess: string;
  cookiePolicyRightRectification: string;
  cookiePolicyRightErasure: string;
  cookiePolicyRightRestriction: string;
  cookiePolicyRightPortability: string;
  cookiePolicyRightObject: string;
  cookiePolicyRightWithdraw: string;
  cookiePolicyRightComplaint: string;
  cookiePolicyRightsOutro: string;
  cookiePolicyTransfersTitle: string;
  cookiePolicyTransfers: string;
  cookiePolicyChangesTitle: string;
  cookiePolicyChanges: string;
  cookiePolicyLastUpdated: string;
  cookiePolicyBackHome: string;
};
