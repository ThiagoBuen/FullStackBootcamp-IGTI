import express from 'express';
import mongoose from 'mongoose';
import { accountRouter } from './routes/accountsRouter.js';

const PORT = 8080;

//require('dotenv').config;
const url =
  'mongodb+srv://{$USERDB}:<{$PWDDB}>@cluster0.i0ege.mongodb.net/<db>?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(accountRouter);

app.listen(PORT, () => console.log('API iniciada'));

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
