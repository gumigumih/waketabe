import html2canvas from 'html2canvas-pro';

export function captureElementToImage(element: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    imageTimeout: 0,
  });
} 