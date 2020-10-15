import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.jsonFile = './json/grades.json';

const router = express.Router();

//Criar new entry
router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;
    if (
      grade.student == null ||
      grade.subject == null ||
      grade.type == null ||
      !grade.value
    ) {
      throw new Error('Confira os campos obrigatórios!');
    }
    const data = JSON.parse(await readFile(global.jsonFile));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };
    data.grades.push(grade);

    await writeFile(global.jsonFile, JSON.stringify(data, null, 2));

    res.send(grade);
    res.end();
  } catch (err) {
    next(err);
  }
});

//Atualizar um ID
router.put('/', async (req, res, next) => {
  //Atualizações integrais
  try {
    let grade = req.body;
    const data = JSON.parse(await readFile(global.jsonFile));
    const index = data.grades.findIndex((a) => a.id === grade.id);
    if (index === -1) {
      throw new Error('Registro não encontrado');
    }
    if (
      grade.student == null ||
      grade.subject == null ||
      grade.type == null ||
      !grade.value
    ) {
      throw new Error('Confira os campos obrigatórios!');
    }
    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile(global.jsonFile, JSON.stringify(data, null, 2));
    res.send(grade);
  } catch (err) {
    next(err);
  }
});

//Delete an entry
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.jsonFile));
    data.grades = data.grades.filter(
      (grade) => grade.id !== parseInt(req.params.id)
    );
    await writeFile(global.jsonFile, JSON.stringify(data, null, 2));
    res.send('Deletado com sucesso!');
    res.end();
  } catch (err) {
    next(err);
  }
});

//Consulta entry
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.jsonFile));
    const grade = data.grades.find(
      (grade) => grade.id === parseInt(req.params.id)
    );
    if (grade != null) {
      res.send(grade);
    } else {
      res.send('Não foi encontrado este ID');
    }
  } catch (err) {
    next(err);
  }
});

//Consulta nota do estudante
router.get('/consultaNota/:student/:subject', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.jsonFile));

    let valueTotal = 0;

    console.log(req.params.student + '\n' + req.params.subject);

    data.grades.forEach((grade) => {
      if (
        grade.student === req.params.student &&
        grade.subject === req.params.subject
      ) {
        valueTotal += grade.value;
        console.log('Achei: ' + grade.value);
      }
    });

    if (valueTotal != 0) {
      res.send('A nota total de ' + req.params.student + 'é: ' + valueTotal);
    } else {
      res.send('Esse aluno não possui nota');
    }
  } catch (err) {
    next(err);
  }
});

//Consulta média
router.get('/mediaNota/:subject/:type', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.jsonFile));

    let mediaSubject = 0;
    let numEntry = 0;

    data.grades.forEach((grade) => {
      if (
        grade.subject === req.params.subject &&
        grade.type === req.params.type
      ) {
        mediaSubject += grade.value;
        numEntry += 1;
        console.log('Achei: ' + grade.value);
      }
    });

    if (numEntry != 0) {
      mediaSubject = mediaSubject / numEntry;
      res.send(
        'A média do ' +
          req.params.subject +
          ' e ' +
          req.params.type +
          ' é: ' +
          mediaSubject
      );
    } else {
      res.send('Subject ou type não possui nota');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/top3/:subject/:type', async (req, res, next) => {
  try {
    console.log('Top 3!');
    const data = JSON.parse(await readFile(global.jsonFile));

    data.grades = data.grades.filter(
      (grade) => grade.subject === req.params.subject
    );

    data.grades = data.grades.filter((grade) => grade.type === req.params.type);

    data.grades.sort((a, b) => {
      return b.value - a.value;
    }); //Pass the attribute to be sorted on

    console.log(data);

    if (data.grades != null) {
      let top = [];
      top.push(data.grades[0]);
      top.push(data.grades[1]);
      top.push(data.grades[2]);

      res.send(
        'O top 3 de ' +
          req.params.subject +
          ' e ' +
          req.params.type +
          ' é: 1 - ' +
          top[0].student +
          ' , nota: ' +
          top[0].value +
          ' , id: ' +
          top[0].id +
          ',  2 - ' +
          top[1].student +
          ' , nota: ' +
          top[1].value +
          ' , id: ' +
          top[1].id +
          ',  3 - ' +
          top[2].student +
          ' , nota: ' +
          top[2].value +
          ' , id: ' +
          top[2].id
      );
    } else {
      res.send('Subject ou type não possui nota');
    }
  } catch (err) {
    next(err);
  }
});

export default router;
