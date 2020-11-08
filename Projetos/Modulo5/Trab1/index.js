import express from 'express';
import mongoose from 'mongoose';
import { accountRouter } from './routes/accountsRouter.js';

require('dotenv').config;
const url =
  'mongodb+srv://{$process.env.USERDB}:<{$process.env.PWDDB}>@cluster0.i0ege.mongodb.net/<db>?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT, () => console.log('API iniciada'));

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado ao Mongo DB Atlas');
  } catch (err) {
    console.log('Erro ao conectar no Mongo ' + err);
  }
};

connect();
