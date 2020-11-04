import express from 'express';
import mongoose from 'mongoose';
import { studentRouter } from './router/studentRouter';

const url =
  'mongodb+srv://<db>:<password>@cluster0.i0ege.mongodb.net/grades?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => console.log('API iniciada'));

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao Mongo DB Atlas');
  } catch (err) {
    console.log('Erro ao conectar no Mongo ' + err);
  }
};

connect();

mongoose.model('student', studentSchema, 'student');
