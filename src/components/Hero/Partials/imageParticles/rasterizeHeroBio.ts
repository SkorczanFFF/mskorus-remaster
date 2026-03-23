export const HERO_BIO_COPY = `Lorem Ipsum Dolor.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;

export type RasterizeHeroBioOptions = {
  maxWidthPx?: number;
  paddingPx?: number;
  fontPx?: number;
  lineHeight?: number;
  fillStyle?: string;
  fontFamily?: string;
};

type MeasureContext = Pick<CanvasRenderingContext2D, 'measureText'>;

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

export function rasterizeHeroBioToCanvas(
  options?: RasterizeHeroBioOptions,
): HTMLCanvasElement {
  const maxWidthPx = options?.maxWidthPx ?? 580;
  const paddingPx = options?.paddingPx ?? 20;
  const fontPx = options?.fontPx ?? 15;
  const lineHeight = options?.lineHeight ?? 1.35;
  const fillStyle = options?.fillStyle ?? 'rgba(220, 235, 245, 0.95)';
  const fontFamily = options?.fontFamily ?? 'Montserrat, system-ui, sans-serif';

  const raspberry = '#801834';
  const orangeDark = '#972b1a';
  const headingTextColor = '#e4e4e4';

  const headingText =
    HERO_BIO_COPY.split(/\n\n+/)[0]?.trim() ?? "Hey, I'm Maciej.";
  const paragraphText = HERO_BIO_COPY.split(/\n\n+/)[1]?.trim() ?? '';

  type RichSpan = { text: string; color: string; weight: number };

  const boldPhrases = [
    'omnis iste natus error',
    'totam rem aperiam',
    'inventore veritatis',
    'magni dolores',
    'voluptatem sequi nesciunt',
  ];

  const paragraphSpans: RichSpan[] = (() => {
    if (!paragraphText) return [{ text: '', color: fillStyle, weight: 400 }];

    let cursor = 0;
    const spans: RichSpan[] = [];

    for (const phrase of boldPhrases) {
      const idx = paragraphText.indexOf(phrase, cursor);
      if (idx === -1) continue;

      if (idx > cursor) {
        spans.push({
          text: paragraphText.slice(cursor, idx),
          color: fillStyle,
          weight: 400,
        });
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

    const hasAnyBold = spans.some((s) => s.color === raspberry);
    return hasAnyBold
      ? spans
      : [{ text: paragraphText, color: fillStyle, weight: 400 }];
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
  canvas.height = 10;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const maxInner = maxWidthPx - paddingPx * 2;

  const chunkify = (span: RichSpan): Omit<RichChunk, 'width'>[] => {
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

  const lines: RichChunk[][] = [];
  let currentLine: RichChunk[] = [];
  let currentWidth = 0;

  for (const baseChunk of allChunksBase) {
    const w = measureChunk(baseChunk);
    const chunk: RichChunk = { ...baseChunk, width: w };

    if (chunk.isSpace) {
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

  const headingFontPx = Math.round(fontPx * 1.18);
  const headingPaddingX = Math.round(fontPx * 0.95);
  const headingPaddingY = Math.round(fontPx * 0.5);
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

  canvas.height = canvasHeight;

  const ctx2 = canvas.getContext('2d');
  if (!ctx2) return canvas;

  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.textBaseline = 'top';

  const gradient = ctx2.createLinearGradient(pillX, 0, pillX + pillW, 0);
  gradient.addColorStop(0, raspberry);
  gradient.addColorStop(1, orangeDark);
  ctx2.fillStyle = gradient;

  const roundedRect = (
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
  ) => {
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
  ctx2.fillText(
    headingText,
    pillX + (pillW - headingTextWidth) / 2,
    pillY + pillH / 2,
  );

  ctx2.textBaseline = 'top';
  let y = paragraphTop;
  const isLastLine = (i: number) => i === lines.length - 1;

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    const contentWidth = line.reduce((sum, c) => sum + c.width, 0);
    const spaceChunks = line.filter((c) => c.isSpace);
    const gaps = spaceChunks.length;

    const justify =
      !isLastLine(li) && gaps > 0 && contentWidth > maxInner * 0.6;
    const extraPerGap = justify
      ? (maxInner - contentWidth + gaps * spaceChunks[0].width) / gaps
      : 0;

    let x = paddingPx;
    for (const chunk of line) {
      if (chunk.isSpace) {
        x += justify ? extraPerGap : chunk.width;
        continue;
      }
      ctx2.fillStyle = chunk.color;
      ctx2.font = `${chunk.weight} ${fontPx}px ${fontFamily}`;
      ctx2.fillText(chunk.text, x, y);
      x += chunk.width;
    }
    y += lineHeightPx;
  }

  const accentY = paragraphTop - Math.round(paddingPx * 0.2);
  const accentGrad = ctx2.createLinearGradient(
    paddingPx,
    0,
    maxWidthPx - paddingPx,
    0,
  );
  accentGrad.addColorStop(0, raspberry);
  accentGrad.addColorStop(0.5, orangeDark);
  accentGrad.addColorStop(1, 'transparent');
  ctx2.fillStyle = accentGrad;
  ctx2.fillRect(paddingPx, accentY, maxInner, 2);

  return canvas;
}
