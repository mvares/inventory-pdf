import { Router } from 'express';
import multer from 'multer';
import { createWriteStream } from 'fs';
import { randomUUID } from 'crypto';

import { generateReportPdf } from './generate-report';
import { readBuffer } from './util/read-buffer';

const multerConfig = multer();

const router = Router();

router.post(
  '/products', 
  multerConfig.single('file'), 
  async (req, res) => {
    const { buffer } = req.file;
    
    const readDocument = readBuffer(buffer);

    const body = [];
    
    for await (const line of readDocument) {
      const splitLine = line.split(',');
      const rows = [];

      rows.push(randomUUID(), splitLine[0], `R$ ${splitLine[1]}`, splitLine[2]);

      body.push(rows);
    }

    const totalProducts = body.map(product => Number.parseInt(product[3], 10)).reduce((acc, cur) => acc + cur);

    const pdfReport = generateReportPdf(body, totalProducts);

    pdfReport.pipe(createWriteStream('document.pdf'));
    pdfReport.end();

    res.send();
  }
)

export { router };
