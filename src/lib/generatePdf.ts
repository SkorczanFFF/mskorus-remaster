export async function generatePdf(
  element: HTMLElement,
  locale: string,
): Promise<void> {
  const { toCanvas } = await import('html-to-image');
  const { jsPDF } = await import('jspdf');
  const langSuffix = locale === 'pl' ? 'PL' : 'ENG';

  const pxToMm = (px: number) => (px * 25.4) / 96;

  await document.fonts.ready;

  // html-to-image uses SVG foreignObject — browser-native CSS rendering
  const canvas = await toCanvas(element, {
    pixelRatio: 2,
    cacheBust: true,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.92);

  const wMm = pxToMm(element.offsetWidth);
  const hMm = pxToMm(element.offsetHeight);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [wMm, hMm],
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, wMm, hMm);
  pdf.save(`Maciej Skorus - CV [${langSuffix}].pdf`);
}
