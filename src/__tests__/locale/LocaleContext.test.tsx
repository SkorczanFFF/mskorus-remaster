import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocaleProvider, useLocale } from '@/locale/LocaleContext';

function TestConsumer() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div>
      <span data-testid='locale'>{locale}</span>
      <span data-testid='title'>{t.seoTitle}</span>
      <button onClick={() => setLocale('pl')}>Switch to PL</button>
      <button onClick={() => setLocale('en')}>Switch to EN</button>
    </div>
  );
}

describe('LocaleContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  it('defaults to "en" locale', () => {
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('provides English translations by default', () => {
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );
    expect(screen.getByTestId('title').textContent).toBeTruthy();
  });

  it('switches to Polish when setLocale("pl") is called', async () => {
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );

    await userEvent.click(screen.getByText('Switch to PL'));
    expect(screen.getByTestId('locale')).toHaveTextContent('pl');
  });

  it('persists locale to localStorage', async () => {
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );

    await userEvent.click(screen.getByText('Switch to PL'));
    expect(localStorage.getItem('locale')).toBe('pl');
  });

  it('reads stored locale from localStorage on mount', () => {
    localStorage.setItem('locale', 'pl');
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );
    // After useEffect runs, locale should be 'pl'
    act(() => {}); // flush effects
    expect(screen.getByTestId('locale')).toHaveTextContent('pl');
  });

  it('sets document.documentElement.lang', async () => {
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );

    await userEvent.click(screen.getByText('Switch to PL'));
    expect(document.documentElement.lang).toBe('pl');
  });

  it('ignores invalid stored locale', () => {
    localStorage.setItem('locale', 'de');
    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );
    // Should fall back to browser detection or 'en'
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
  });

  it('handles localStorage errors gracefully', () => {
    const spy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation(() => {
        throw new Error('Quota exceeded');
      });

    render(
      <LocaleProvider>
        <TestConsumer />
      </LocaleProvider>,
    );
    // Should not crash, falls back to 'en'
    expect(screen.getByTestId('locale')).toHaveTextContent('en');
    spy.mockRestore();
  });
});
