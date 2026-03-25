import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { en } from '@/locale/en';
import { pl } from '@/locale/pl';
import type { Dictionary, Locale } from '@/locale/types';

const dictionaries: Record<Locale, Dictionary> = { en, pl };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: en,
});

function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('locale');
  if (stored === 'en' || stored === 'pl') return stored;
  const browserLang = navigator.language?.slice(0, 2);
  return browserLang === 'pl' ? 'pl' : 'en';
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    setLocaleState(getStoredLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem('locale', locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
