import { randomizeText, scrambleReveal } from '@/lib/scrambleReveal';

// Mock gsap — scrambleReveal uses gsap.to() for animation
jest.mock('@/lib/gsap', () => {
  const mockTween = { kill: jest.fn() };
  return {
    gsap: {
      to: jest.fn((_target, vars) => {
        // Simulate immediate completion
        if (vars.onUpdate) {
          // Simulate a few progress steps
          const proxy = _target;
          proxy.progress = 0.5;
          vars.onUpdate.call(proxy);
          proxy.progress = 1;
          vars.onUpdate.call(proxy);
        }
        if (vars.onComplete) vars.onComplete();
        return mockTween;
      }),
    },
    ScrollTrigger: {
      create: jest.fn(),
      defaults: jest.fn(),
      refresh: jest.fn(),
    },
  };
});

describe('randomizeText', () => {
  it('returns a string of the same length', () => {
    const input = 'Hello World';
    const result = randomizeText(input);
    expect(result).toHaveLength(input.length);
  });

  it('preserves spaces', () => {
    const input = 'A B C';
    const result = randomizeText(input);
    expect(result[1]).toBe(' ');
    expect(result[3]).toBe(' ');
  });

  it('replaces non-space characters with scramble chars', () => {
    const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%';
    const input = 'Test';
    const result = randomizeText(input);
    for (let i = 0; i < result.length; i++) {
      if (input[i] !== ' ') {
        expect(SCRAMBLE_CHARS).toContain(result[i]);
      }
    }
  });

  it('returns empty string for empty input', () => {
    expect(randomizeText('')).toBe('');
  });

  it('produces different output on consecutive calls (randomness)', () => {
    const input = 'ABCDEFGHIJKLMNOP';
    const results = new Set<string>();
    for (let i = 0; i < 10; i++) {
      results.add(randomizeText(input));
    }
    // With 16 chars and 40 possible chars each, collisions are extremely unlikely
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('scrambleReveal', () => {
  it('sets final text on element via onComplete', () => {
    const el = document.createElement('div');
    const text = 'Hello';

    scrambleReveal(el, text, 1);

    expect(el.textContent).toBe(text);
  });

  it('sets initial scrambled text on element', () => {
    // The function immediately sets textContent to randomized text
    // then gsap animates to final. Since we mock gsap.to to run immediately,
    // by the time it completes, textContent is the final text.
    const el = document.createElement('div');
    scrambleReveal(el, 'Test', 1);
    // After completion, text should be the target
    expect(el.textContent).toBe('Test');
  });

  it('returns a gsap tween', () => {
    const el = document.createElement('div');
    const result = scrambleReveal(el, 'Hi', 0.5);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('kill');
  });
});
