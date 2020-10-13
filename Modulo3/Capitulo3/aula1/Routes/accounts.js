import express from 'express';
import { promises as fs } from 'fs';
import { parse } from 'path';

const { readFile, writeFile } = fs;

global.filename = 'accounts.json';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.filename));

    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.filename, JSON.stringify(data, null, 2));

    res.send(account);
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    const account = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.filename));
    data.accounts = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send('Deletado com sucesso!');
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  //Atualizações integrais
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    data.accounts[index] = account;
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.patch('/updateBalance', async (req, res) => {
  //Atualizações parciais

  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.filename));
    const index = data.accounts.findIndex((a) => a.id === account.id);

    data.accounts[index].balance = account.balance;
    await writeFile(global.filename, JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
export default router;
