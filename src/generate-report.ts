import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions, StyleDictionary } from 'pdfmake/interfaces';

export const generateReportPdf =  (tableContent: string[][], totalProducts: number) => {
  const fonts = { 
    Helvetica: {
      normal: 'Helvetica',
      bold: 'Helvetica-Bold',
      italics: 'Helvetica-Oblique',
      bolditalics: 'Helvetica-BoldOblique',
    }
  };

  const printer = new PdfPrinter(fonts);

  const stylesDocument: StyleDictionary = {
    header: {
      fontSize: 18,
      bold: true
    },
    columnsTitle: {
      fillColor: '#7159c1',
      color: '#FFF',
      alignment: 'center',
    },
  };

  const documentDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: 'Helvetica' },
    styles: { ...stylesDocument },
    content: [
      { text: 'Relatório de produtos\n\n', style: 'header' },
      {
        table: {
          body: [
            [
              { text: 'Id', style: 'columnsTitle' }, 
              { text: 'Produto', style: 'columnsTitle' }, 
              { text: 'Valor', style: 'columnsTitle' }, 
              { text: 'Quantidade', style: 'columnsTitle' }, 
            ],
            ...tableContent,
          ],
        }
      },
      { text: `\nTotal de produtos em estoque: ${totalProducts}`, style: 'header', }
    ],
  };

  const pdfDocument = printer.createPdfKitDocument(documentDefinitions);

  return pdfDocument;
}