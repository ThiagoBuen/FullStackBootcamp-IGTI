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
export default router;
