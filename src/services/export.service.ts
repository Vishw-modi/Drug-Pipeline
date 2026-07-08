import html2canvas from 'html2canvas';
import pptxgen from 'pptxgenjs';

export async function generatePreview(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element with id ${elementId} not found`);

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#F8FAFC",
    useCORS: true,
    logging: false
  });

  return canvas.toDataURL('image/png');
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadPowerPoint(dataUrl: string, filename: string) {
  const pptx = new pptxgen();
  const slide = pptx.addSlide();
  
  // Add the screenshot to fill most of the slide
  slide.addImage({ 
    data: dataUrl,
    x: 0,
    y: 0,
    w: '100%',
    h: '100%',
    sizing: { type: 'contain', w: '100%', h: '100%' }
  });

  // Ensure it has .pptx extension
  const finalFilename = filename.endsWith('.pptx') ? filename : `${filename}.pptx`;
  
  pptx.writeFile({ fileName: finalFilename });
}

export function getExportFilename(extension: string) {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  
  return `KMK_Pipeline_Intelligence_${yyyy}-${mm}-${dd}_${hh}-${min}${extension}`;
}
