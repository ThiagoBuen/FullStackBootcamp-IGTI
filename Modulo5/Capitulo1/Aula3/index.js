import mongoose from 'mongoose';

const url =
  'mongodb+srv://<db>:<password>@cluster0.i0ege.mongodb.net/grades?retryWrites=true&w=majority';

const studentSchema = mongoose.Schema({
  name: { type: String, require: true },
  subject: { type: String, require: true },
  type: { type: String, require: true },
  value: { type: Number, require: true },
  lastModified: { type: Date, default: Date.now() },
});

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

const student = mongoose.model('student');

new student({
  name: 'Jp',
  subject: 'Matematica',
  type: 'Trabalho Pratico',
  value: 22,
})
  .save()
  .then(() => console.log('Documento inserido'))
  .catch((err) => {
    console.log('Erro gerado: ' + err);
  });
