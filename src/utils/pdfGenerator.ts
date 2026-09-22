import html2pdf from 'html2pdf.js';

export function sanitizeFileName(name: string): string {
  if (!name || name.trim() === '') {
    return 'Aluno';
  }
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .replace(/\s+/g, '_');
}

export async function generateAnamnesePdf(
  element: HTMLElement,
  studentName: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  const safeName = sanitizeFileName(studentName);
  const filename = `Anamnese_${safeName}.pdf`;

  const opt = {
    margin: [10, 10, 12, 10] as [number, number, number, number],
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    enableLinks: true,
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait' as const,
      compress: true,
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['.avoid-page-break', '.pdf-section', 'table', 'tr'],
    },
  };

  try {
    if (onProgress) onProgress(20);
    const worker = html2pdf().set(opt).from(element);
    if (onProgress) onProgress(60);
    await worker.save();
    if (onProgress) onProgress(100);
  } catch (error) {
    console.error('Erro ao gerar PDF via html2pdf:', error);
    throw error;
  }
}
