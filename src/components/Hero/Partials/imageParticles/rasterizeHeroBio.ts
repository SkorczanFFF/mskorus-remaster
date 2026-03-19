export const HERO_BIO_COPY = `Hey, I'm Maciej.

Versatile and open-minded developer focused on building engaging, user-centered frontend solutions, with solid hands-on experience in backend work. Skilled in Web3 development for the gaming industry and in crafting custom platforms and tools for the medical events sector, backed by a strong foundation in IT support. Personally passionate about WebGL, modding, and building useful and entertaining code, not only frontend centered.`;

export type RasterizeHeroBioOptions = {
  /** Logical width in CSS pixels (canvas pixel width) */
  maxWidthPx?: number;
  paddingPx?: number;
  fontPx?: number;
  lineHeight?: number;
  /**
   * Base (non-bold) paragraph color.
   * Note: hero background is dark, so this defaults to a light text color (readable).
   */
  fillStyle?: string;
  fontFamily?: string;
};

type MeasureContext = Pick<CanvasRenderingContext2D, 'measureText'>;

/**
 * Word-wraps `HERO_BIO_COPY` using the given measure context (testable without canvas draw).
 */
export function computeWrappedHeroBioLines(
  ctx: MeasureContext,
  options?: Pick<RasterizeHeroBioOptions, 'maxWidthPx' | 'paddingPx'>,
): string[] {
  const maxWidthPx = options?.maxWidthPx ?? 480;
  const paddingPx = options?.paddingPx ?? 20;
  const maxInner = maxWidthPx - paddingPx * 2;

  const lines: string[] = [];
  const paragraphs = HERO_BIO_COPY.split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width <= maxInner) {
        line = test;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    lines.push('');
  }
  while (lines.length && lines[lines.length - 1] === '') {
    lines.pop();
  }
  return lines;
}

/**
 * Stylized “About” bio text rasterized to a canvas.
 * - “Hey, I'm Maciej.” is drawn as a gradient pill (raspberry -> oranger) with light text.
 * - The paragraph has raspberry bold spans for the same phrases as in `src/components/About/About.tsx`.
 */
export function rasterizeHeroBioToCanvas(options?: RasterizeHeroBioOptions): HTMLCanvasElement {
  const maxWidthPx = options?.maxWidthPx ?? 480;
  const paddingPx = options?.paddingPx ?? 20;
  const fontPx = options?.fontPx ?? 15;
  const lineHeight = options?.lineHeight ?? 1.35;
  const fillStyle = options?.fillStyle ?? 'rgba(220, 235, 245, 0.95)';
  const fontFamily = options?.fontFamily ?? 'Montserrat, system-ui, sans-serif';

  // About palette (see tailwind.config.ts)
  const raspberry = '#801834';
  const oranger = '#972b1a';
  const headingTextColor = '#e4e4e4';

  const headingText = HERO_BIO_COPY.split(/\n\n+/)[0]?.trim() ?? "Hey, I'm Maciej.";
  const paragraphText = HERO_BIO_COPY.split(/\n\n+/)[1]?.trim() ?? '';

  type RichSpan = { text: string; color: string; weight: number };

  const boldPhrases = [
    'Versatile and open-minded',
    'Web3 development for the gaming industry',
    'crafting custom platforms and tools for the medical events sector',
    'IT support',
    'WebGL, modding, and building',
  ];

  const paragraphSpans: RichSpan[] = (() => {
    if (!paragraphText) return [{ text: '', color: fillStyle, weight: 400 }];

    let cursor = 0;
    const spans: RichSpan[] = [];

    // Build spans by finding bold phrases in order of appearance.
    for (const phrase of boldPhrases) {
      const idx = paragraphText.indexOf(phrase, cursor);
      if (idx === -1) continue;

      if (idx > cursor) {
        spans.push({ text: paragraphText.slice(cursor, idx), color: fillStyle, weight: 400 });
      }
      spans.push({ text: phrase, color: raspberry, weight: 600 });
      cursor = idx + phrase.length;
    }

    if (cursor < paragraphText.length) {
      spans.push({
        text: paragraphText.slice(cursor),
        color: fillStyle,
        weight: 400,
      });
    }

    // If none of the bold phrases were found, fall back to a single normal span.
    const hasAnyBold = spans.some((s) => s.color === raspberry);
    return hasAnyBold ? spans : [{ text: paragraphText, color: fillStyle, weight: 400 }];
  })();

  type RichChunk = {
    text: string;
    color: string;
    weight: number;
    isSpace: boolean;
    width: number;
  };

  const canvas = document.createElement('canvas');
  canvas.width = maxWidthPx;
  canvas.height = 10; // placeholder; we set correct height after measuring.

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // --- Measure + wrap paragraph into lines (rich, color-aware) ---
  const maxInner = maxWidthPx - paddingPx * 2;

  const chunkify = (span: RichSpan): Omit<RichChunk, 'width'>[] => {
    // Preserve whitespace chunks so the wrapping works naturally.
    const parts = span.text.split(/(\s+)/);
    return parts
      .map((p) => p ?? '')
      .filter((p) => p.length > 0)
      .map((p) => ({
        text: p,
        color: span.color,
        weight: span.weight,
        isSpace: /^\s+$/.test(p),
      }));
  };

  const allChunksBase = paragraphSpans.flatMap(chunkify);

  const measureChunk = (chunk: Omit<RichChunk, 'width'>): number => {
    ctx.font = `${chunk.weight} ${fontPx}px ${fontFamily}`;
    return ctx.measureText(chunk.text).width;
  };

  // Wrap using width accumulation; line breaks only when adding a chunk would overflow.
  const lines: RichChunk[][] = [];
  let currentLine: RichChunk[] = [];
  let currentWidth = 0;

  for (const baseChunk of allChunksBase) {
    const w = measureChunk(baseChunk);
    const chunk: RichChunk = { ...baseChunk, width: w };

    if (chunk.isSpace) {
      // Skip leading spaces.
      if (currentWidth === 0) continue;

      if (currentWidth + chunk.width > maxInner) {
        if (currentLine.length) lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
        continue;
      }

      currentLine.push(chunk);
      currentWidth += chunk.width;
      continue;
    }

    if (currentLine.length > 0 && currentWidth + chunk.width > maxInner) {
      lines.push(currentLine);
      currentLine = [];
      currentWidth = 0;
    }

    currentLine.push(chunk);
    currentWidth += chunk.width;
  }
  if (currentLine.length) lines.push(currentLine);

  const lineHeightPx = fontPx * lineHeight;

  // --- Measure heading pill ---
  const headingFontPx = Math.round(fontPx * 1.18);
  const headingPaddingX = Math.round(fontPx * 0.95);
  const headingPaddingY = Math.round(fontPx * 0.50);
  const headingRadius = Math.round(fontPx * 0.55);

  ctx.font = `600 ${headingFontPx}px ${fontFamily}`;
  const headingTextWidth = ctx.measureText(headingText).width;

  const pillW = headingTextWidth + headingPaddingX * 2;
  const pillH = headingFontPx + headingPaddingY * 2;
  const pillX = (maxWidthPx - pillW) / 2;
  const pillY = paddingPx;

  const paragraphTop = pillY + pillH + Math.round(paddingPx * 0.55);
  const textHeight = Math.max(1, lines.length) * lineHeightPx;
  const canvasHeight = Math.ceil(paragraphTop + textHeight + paddingPx);

  // Resize to final height before drawing.
  canvas.height = canvasHeight;

  const ctx2 = canvas.getContext('2d');
  if (!ctx2) return canvas;

  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.textBaseline = 'top';

  // --- Draw heading pill with gradient ---
  const gradient = ctx2.createLinearGradient(pillX, 0, pillX + pillW, 0);
  gradient.addColorStop(0, raspberry);
  gradient.addColorStop(1, oranger);
  ctx2.fillStyle = gradient;

  const roundedRect = (x: number, y: number, w: number, h: number, r: number) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx2.beginPath();
    ctx2.moveTo(x + rr, y);
    ctx2.arcTo(x + w, y, x + w, y + h, rr);
    ctx2.arcTo(x + w, y + h, x, y + h, rr);
    ctx2.arcTo(x, y + h, x, y, rr);
    ctx2.arcTo(x, y, x + w, y, rr);
    ctx2.closePath();
    ctx2.fill();
  };

  roundedRect(pillX, pillY, pillW, pillH, headingRadius);

  ctx2.fillStyle = headingTextColor;
  ctx2.font = `600 ${headingFontPx}px ${fontFamily}`;
  ctx2.textBaseline = 'middle';
  ctx2.fillText(headingText, pillX + (pillW - headingTextWidth) / 2, pillY + pillH / 2);

  // --- Draw paragraph lines ---
  ctx2.textBaseline = 'top';
  let y = paragraphTop;
  for (const line of lines) {
    let x = paddingPx;
    for (const chunk of line) {
      ctx2.fillStyle = chunk.color;
      ctx2.font = `${chunk.weight} ${fontPx}px ${fontFamily}`;
      ctx2.fillText(chunk.text, x, y);
      x += chunk.width;
    }
    y += lineHeightPx;
  }

  return canvas;
}
