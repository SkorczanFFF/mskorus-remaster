import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { CookieIcon } from '@/lib/shared/Icons';

import { useLocale } from '@/locale/LocaleContext';

/* ── Cookie helpers ── */

const COOKIE_NAME = 'cookie_consent';
const COOKIE_DAYS = 182;

type ConsentState = { necessary: true; analytics: boolean };

function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function setConsent(consent: ConsentState) {
  const expires = new Date(Date.now() + COOKIE_DAYS * 86400000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))};expires=${expires};path=/;SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('cc:onChange'));
}

/** Check if analytics is allowed. */
export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics ?? false;
}

/** Open the consent modal from anywhere. */
let openModalFn: (() => void) | null = null;
export function showCookiePreferences() {
  openModalFn?.();
}

/* ── Component ── */

export default function CookieConsentBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  // Show on first visit (no consent cookie yet), or when triggered externally
  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      setVisible(true);
    } else {
      setAnalytics(consent.analytics);
    }
  }, []);

  // Register the external open function
  const open = useCallback(() => {
    const consent = getConsent();
    setAnalytics(consent?.analytics ?? false);
    setVisible(true);
  }, []);

  useEffect(() => {
    openModalFn = open;
    return () => {
      openModalFn = null;
    };
  }, [open]);

  const save = useCallback((analyticsValue: boolean) => {
    setConsent({ necessary: true, analytics: analyticsValue });
    setAnalytics(analyticsValue);
    setVisible(false);
  }, []);

  const acceptAll = useCallback(() => save(true), [save]);
  const rejectAll = useCallback(() => save(false), [save]);
  const savePreferences = useCallback(() => save(analytics), [save, analytics]);

  if (!visible) return null;

  return (
    <div
      className='fixed inset-0 z-[9998] flex items-end justify-start p-4 md:p-6'
      style={{ backgroundColor: 'rgba(0, 26, 37, 0.7)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget && getConsent()) setVisible(false);
      }}
    >
      <div
        className='relative w-full max-w-[520px] overflow-hidden rounded-[3px] border-2 text-[#e4e4e4]'
        style={{
          backgroundColor: '#001a25',
          borderColor: 'rgba(128, 24, 52, 0.2)',
          fontFamily: 'var(--font-grotesk), sans-serif',
        }}
      >
        {/* Cookie watermark */}
        <div
          className='pointer-events-none absolute -top-2 -right-3 h-[300px] w-[300px] opacity-[0.25]'
          aria-hidden='true'
        >
          <CookieIcon className='h-full w-full text-[#7a7a7a]' />
        </div>

        {/* Content */}
        <div className='relative z-10 p-6'>
          {/* Header */}
          <div className='mb-3 flex items-center gap-3'>
            <CookieIcon className='flex-shrink-0 text-2xl text-[#801834]' />
            <h2 className='text-lg font-semibold tracking-wide'>
              {t.cookieTitle}
            </h2>
          </div>

          {/* Description */}
          <p className='mb-5 text-sm leading-relaxed text-[#e4e4e4]/70'>
            {t.cookieDescription}{' '}
            <Link
              href='/cookies'
              className='underline transition-colors hover:text-[#972b1a]'
              style={{ color: '#992210' }}
              onClick={() => setVisible(false)}
            >
              {t.cookiePolicyTitle}
            </Link>
            .
          </p>

          {/* Categories */}
          <div className='mb-5 space-y-3'>
            {/* Necessary — always on */}
            <div
              className='flex items-center justify-between rounded-[3px] px-4 py-3'
              style={{ backgroundColor: 'rgba(0, 26, 37, 0.8)' }}
            >
              <div>
                <p className='text-sm font-medium'>{t.cookieNecessaryTitle}</p>
                <p className='mt-0.5 text-xs text-[#e4e4e4]/50'>
                  {t.cookieNecessaryDescription}
                </p>
              </div>
              <Toggle checked disabled />
            </div>

            {/* Analytics — toggleable */}
            <div
              className='flex items-center justify-between rounded-[3px] px-4 py-3'
              style={{ backgroundColor: 'rgba(0, 26, 37, 0.8)' }}
            >
              <div>
                <p className='text-sm font-medium'>{t.cookieAnalyticsTitle}</p>
                <p className='mt-0.5 text-xs text-[#e4e4e4]/50'>
                  {t.cookieAnalyticsDescription}
                </p>
              </div>
              <Toggle
                checked={analytics}
                onChange={() => setAnalytics((v) => !v)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className='flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={acceptAll}
              className='flex-1 rounded-[3px] px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200'
              style={{ backgroundColor: '#801834' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = '#972b1a')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = '#801834')
              }
            >
              {t.cookieAcceptAll}
            </button>
            <button
              type='button'
              onClick={rejectAll}
              className='flex-1 rounded-[3px] border-2 bg-transparent px-4 py-2.5 text-sm font-medium text-[#e4e4e4] transition-colors duration-200'
              style={{ borderColor: '#801834' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  'rgba(128, 24, 52, 0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'transparent')
              }
            >
              {t.cookieRejectAll}
            </button>
            <button
              type='button'
              onClick={savePreferences}
              className='w-full rounded-[3px] border-2 bg-transparent px-4 py-2 text-xs font-medium text-[#e4e4e4]/60 transition-colors duration-200'
              style={{ borderColor: 'rgba(128, 24, 52, 0.2)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'rgba(128, 24, 52, 0.2)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'rgba(228,228,228,0.6)';
              }}
            >
              {t.cookieSavePreferences}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle switch ── */

function Toggle({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className='relative ml-4 flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200'
      style={{
        backgroundColor: checked
          ? disabled
            ? '#992210'
            : '#801834'
          : 'rgba(0, 26, 37, 0.5)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.8 : 1,
      }}
    >
      <span
        className='inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200'
        style={{
          transform: checked ? 'translateX(22px)' : 'translateX(4px)',
        }}
      />
    </button>
  );
}
