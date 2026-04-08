export type Locale = 'en' | 'pl';

export type ExperienceEntry = {
  company: string;
  position: string;
  date: string;
  resumeDate: string;
  resumeType?: string;
  stack: string[];
  icon: string;
  duties: string[];
};

export type ProjectEntry = {
  id: number;
  pic: string;
  /** Optional second image shown on hover (desktop). */
  pic2?: string;
  title: string;
  technos: string;
  description: string;
  live: string;
  git: string;
  /** Overrides `portfolioLiveDemo` for the live link label (e.g. Chrome Web Store). */
  liveLabel?: string;
  /** Whether to display this project in the resume. */
  inResume?: boolean;
};

export type ServiceEntry = {
  icon: string;
  title: string;
  tagline: string;
  description: string;
};

export type Dictionary = {
  seoTitle: string;
  seoSiteName: string;
  seoDescription: string;

  notFoundTitle: string;
  notFoundBack: string;

  navHome: string;
  navExperience: string;
  navSkills: string;
  navPortfolio: string;
  navContact: string;
  navResume: string;
  toggleMenu: string;
  navMenuLabel: string;

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

  techCategoryFrontend: string;
  techCategoryBackend: string;
  techCategoryDatabase: string;
  techCategoryDesign: string;
  techCategoryTools: string;

  portfolioTitle: string;
  portfolioRepo: string;
  portfolioLiveDemo: string;
  projects: ProjectEntry[];

  contactPhone: string;
  contactEmail: string;
  contactCompanyInfo: string;
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
  resumePageTitle: string;
  resumeAltPhoto: string;
  resumeRodo: string;
  resumeRepo: string;
  resumeDemo: string;
  resumeHobbies: string[];

  cookieTitle: string;
  cookieDescription: string;
  cookieAcceptAll: string;
  cookieRejectAll: string;
  cookieSavePreferences: string;
  cookieSettings: string;
  cookieNecessaryTitle: string;
  cookieNecessaryDescription: string;
  cookieAnalyticsTitle: string;
  cookieAnalyticsDescription: string;
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
