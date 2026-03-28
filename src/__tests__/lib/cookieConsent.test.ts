import { COOKIE_DAYS, hasAnalyticsConsent } from '@/components/CookieConsent';

function clearCookies() {
  document.cookie.split(';').forEach((c) => {
    const name = c.trim().split('=')[0];
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
}

function setCookie(value: object) {
  document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(value))};path=/`;
}

describe('CookieConsent helpers', () => {
  beforeEach(clearCookies);

  describe('COOKIE_DAYS', () => {
    it('is 182', () => {
      expect(COOKIE_DAYS).toBe(182);
    });
  });

  describe('hasAnalyticsConsent', () => {
    it('returns false when no consent cookie exists', () => {
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns true when analytics is granted', () => {
      setCookie({ necessary: true, analytics: true });
      expect(hasAnalyticsConsent()).toBe(true);
    });

    it('returns false when analytics is denied', () => {
      setCookie({ necessary: true, analytics: false });
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns false for malformed cookie value', () => {
      document.cookie = 'cookie_consent=not-json;path=/';
      expect(hasAnalyticsConsent()).toBe(false);
    });

    it('returns false for empty cookie value', () => {
      document.cookie = 'cookie_consent=;path=/';
      expect(hasAnalyticsConsent()).toBe(false);
    });
  });
});
