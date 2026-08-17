import { toPng } from 'html-to-image';
import PptxGenJS from 'pptxgenjs';

export async function generatePreview(elementId: string): Promise<string> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element with id ${elementId} not found`);

  const mainEl = element.querySelector('main');
  const originalHeight = element.style.height;
  const originalOverflow = element.style.overflow;
  const originalFlex = element.style.flex;
  
  const originalMainHeight = mainEl ? (mainEl as HTMLElement).style.height : '';
  const originalMainOverflow = mainEl ? (mainEl as HTMLElement).style.overflow : '';
  const originalMainFlex = mainEl ? (mainEl as HTMLElement).style.flex : '';

  const originalPosition = element.style.position;
  const originalTop = element.style.top;
  const originalLeft = element.style.left;
  const originalWidth = element.style.width;
  const originalZIndex = element.style.zIndex;
  const originalMaxHeight = element.style.maxHeight;

  const originalMainMaxHeight = mainEl ? (mainEl as HTMLElement).style.maxHeight : '';

  try {
    const clientWidth = element.clientWidth;
    const scrollHeight = mainEl ? mainEl.scrollHeight : element.scrollHeight;
    const totalHeight = scrollHeight + 100; // Account for topbar height

    // Temporarily pop the element out of the flex layout and expand it fully
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = `${clientWidth}px`;
    element.style.height = `${totalHeight}px`;
    element.style.maxHeight = 'none';
    element.style.overflow = 'visible';
    element.style.flex = 'none';
    element.style.zIndex = '1';
    
    if (mainEl) {
      (mainEl as HTMLElement).style.height = `${scrollHeight}px`;
      (mainEl as HTMLElement).style.maxHeight = 'none';
      (mainEl as HTMLElement).style.overflow = 'visible';
      (mainEl as HTMLElement).style.flex = 'none';
    }

    // Small delay to allow browser to calculate new dimensions
    await new Promise(resolve => setTimeout(resolve, 150));

    // Use html-to-image to avoid unsupported modern CSS colors (like lab, oklch) crashing html2canvas
    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      backgroundColor: "#F8FAFC",
      width: clientWidth,
      height: totalHeight
    });
    
    return dataUrl;
  } finally {
    // Revert styles
    element.style.position = originalPosition;
    element.style.top = originalTop;
    element.style.left = originalLeft;
    element.style.width = originalWidth;
    element.style.height = originalHeight;
    element.style.maxHeight = originalMaxHeight;
    element.style.overflow = originalOverflow;
    element.style.flex = originalFlex;
    element.style.zIndex = originalZIndex;
    
    if (mainEl) {
      (mainEl as HTMLElement).style.height = originalMainHeight;
      (mainEl as HTMLElement).style.maxHeight = originalMainMaxHeight;
      (mainEl as HTMLElement).style.overflow = originalMainOverflow;
      (mainEl as HTMLElement).style.flex = originalMainFlex;
    }
  }
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
  const pptx = new PptxGenJS();
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
  
  return `Drugscape_${yyyy}-${mm}-${dd}_${hh}-${min}${extension}`;
}
