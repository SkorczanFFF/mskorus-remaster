export async function generatePdf(
  element: HTMLElement,
  locale: string,
): Promise<void> {
  const html2canvas = (await import('html2canvas-pro')).default;
  const { jsPDF } = await import('jspdf');
  const langSuffix = locale === 'pl' ? 'PL' : 'ENG';

  const pxToMm = (px: number) => (px * 25.4) / 96;

  element.style.overflow = 'visible';
  const fullHeight = element.scrollHeight;
  const canvas = await html2canvas(element, {
    scale: 1,
    useCORS: true,
    height: fullHeight,
    windowHeight: fullHeight,
  });
  element.style.overflow = '';
  const imgData = canvas.toDataURL('image/jpeg', 0.92);

  const wMm = pxToMm(canvas.width);
  const hMm = pxToMm(canvas.height);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [wMm, hMm],
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, wMm, hMm);
  pdf.save(`Maciej Skorus - CV [${langSuffix}].pdf`);
}
