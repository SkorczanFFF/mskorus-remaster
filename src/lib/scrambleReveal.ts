import { gsap } from '@/lib/gsap';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%';

export function randomizeText(text: string) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result +=
      text[i] === ' '
        ? ' '
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  }
  return result;
}

export function scrambleReveal(
  el: HTMLElement,
  text: string,
  duration: number,
) {
  const len = text.length;
  el.textContent = randomizeText(text);
  const proxy = { progress: 0 };
  return gsap.to(proxy, {
    progress: 1,
    duration,
    ease: 'power1.in',
    onUpdate() {
      const locked = Math.floor(proxy.progress * len);
      let result = text.substring(0, locked);
      for (let i = locked; i < len; i++) {
        result +=
          text[i] === ' '
            ? ' '
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = result;
    },
    onComplete() {
      el.textContent = text;
    },
  });
}
