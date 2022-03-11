import express from 'express';
import { router } from './routes';

const app = express();

app.use(router);

app.listen(3000, () => console.log(`App is listening at http://localhost:3000!`));