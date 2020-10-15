import express from 'express';
import gradesRouter from './Routes/routes.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  console.log('API has started');
});
