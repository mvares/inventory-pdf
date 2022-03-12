import { Router } from 'express';
import { createWriteStream } from 'fs';
import multer from 'multer';

import { generateReportPdf } from './generate-report';
import { readBuffer } from './utils/read-buffer';

const multerConfig = multer();

const router = Router();

router.post(
  '/products', 
  multerConfig.single('file'), 
  async (req, res) => {
    const { buffer } = req.file;
    
    const body = await readBuffer(buffer);

    const totalProducts = body
      .map(product => Number.parseInt(product[3], 10))
      .reduce((acc, cur) => acc + cur);

    const pdfReport = generateReportPdf(body, totalProducts);

    pdfReport.pipe(createWriteStream('document.pdf'));
    pdfReport.end();

    res.send();
  }
)

export { router };
