import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import gradeModel from '../models/gradesModel.js';

let Grade = new gradeModel();

const create = async (req, res) => {
  console.log(req.body);
  const { name, subject, type, value } = req.body;
  const grade = new gradeModel({ name, subject, type, value });

  console.log(grade);
  try {
    const saveGrade = await Grade.save(grade);
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const allGrades = await gradeModel.find(condition);
    logger.info(`GET /grade`);
    res.status(200).json(allGrades);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const grade = await gradeModel.findById(id);
    res.status(200).json(grade);

    logger.info(`GET /grade - ${id}`);

    console.log(grade);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    await gradeModel.findByIdAndUpdate({ _id: id }, req.body);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    res.status(200).json({ message: 'Grade atualizada!' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  await gradeModel.deleteOne({ _id: id });
  res.status(200).json({ message: 'Grade deletada com sucesso' });
  try {
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    gradeModel.deleteMany({});
    logger.info(`DELETE /grade`);
    res.status(200).json({ message: 'Todas grades deletadas com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
