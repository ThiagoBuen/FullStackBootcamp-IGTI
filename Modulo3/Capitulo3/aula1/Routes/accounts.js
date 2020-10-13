import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

global.filename = 'accounts.json';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    if (account.balance == null || !account.name) {
      throw new Error('Name e Balance são obrigatórios');
    }
    const data = JSON.parse(await readFile(global.filename));

    account = {
      id: data.nextId++,
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(account);
    logger.info(`POST /account - ${JSON.stringify(account)}`);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
    logger.info(`GET /account`);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
    logger.info(`GET /account/:id ${JSON.stringify(req.params.id)}`);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send('Deletado com sucesso!');
    logger.info(`DELETE /account/:id ${JSON.stringify(req.params.id)}`);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  //Atualizações integrais
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((a) => a.id === account.id);
    if (index === -1) {
      throw new Error('Registro não encontrado');
    }
    if (!account.id || account.balance == null || !account.name) {
      throw new Error('ID, Name e Balance são obrigatórios');
    }
    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send(account);
    logger.info(`PUT /account - ${JSON.stringify(account, null, 2)}`);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  //Atualizações parciais

  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    if (index === -1) {
      throw new Error('Registro não encontrado');
    }
    if (!account.id || account.balance == null) {
      throw new Error('Balance e ID são obrigatórios');
    }

    data.accounts[index].balance = account.balance;
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
    logger.info(
      `PATCH /account/updateBalance - ${JSON.stringify(account, null, 2)}`
    );
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(` ${req.method} ${req.baseUrl} -  ${err.message}`);
  res.status(400).send({ error: err.message });
});
export default router;
