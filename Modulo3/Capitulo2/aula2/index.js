import express from 'express';
import carrosRouter from './carrosRouter.js';
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.post('/', async (req, res, next) => {
  try {
    throw new Error('Error message async');
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res) => {
  throw new Error('Error message test');
});

app.use((err, req, res, next) => {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('Ocorreu um erro, tente mais tarde.');
});

app.use('/carros', carrosRouter);

app.get('/test', (req, res) => {
  res.end();
});

app.listen(3000, () => {
  console.log('API started');
});
