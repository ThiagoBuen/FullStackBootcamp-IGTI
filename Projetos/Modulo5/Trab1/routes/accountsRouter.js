import express from 'express';
import { accountsModel } from '../models/accountsModel.js';

const app = express();

app.get('/account', async (req, res) => {
  try {
    const account = await accountsModel.find({});
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/account/search/:agency/:account', async (req, res) => {
  try {
    const account = parseInt(req.params.account);
    const agency = parseInt(req.params.agency);
    const bankAccount = await accountsModel.findOne({
      agencia: agency,
      conta: account,
    });
    res.send(bankAccount);
  } catch (error) {
    res.status(500).send('Conta Informada Inválida: ' + error);
  }
});

app.patch('/account/deposit', async (req, res) => {
  try {
    const agencia = parseInt(req.body.agencia);
    const conta = parseInt(req.body.conta);
    const deposito = parseInt(req.body.balance);
    let account = await accountsModel.findOneAndUpdate(
      {
        agencia: agencia,
        conta: conta,
      },
      { $inc: { balance: deposito } }
    );

    account = await accountsModel.findOne({
      agencia: agencia,
      conta: conta,
    });

    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch('/account/withdraw', async (req, res) => {
  try {
    const agencia = parseInt(req.body.agencia);
    const conta = parseInt(req.body.conta);
    const withdraw = parseInt(req.body.balance) + 1;

    let account = await accountsModel.findOne({
      agencia: agencia,
      conta: conta,
    });
    console.log(account);

    if (account.balance > withdraw) {
      console.log('Saldo suficiente');

      account = await accountsModel.findOneAndUpdate(
        {
          agencia: agencia,
          conta: conta,
        },
        { $inc: { balance: -withdraw } }
      );
      account = await accountsModel.findOne({
        agencia: agencia,
        conta: conta,
      });

      res.send(account);
    } else {
      res.send('Saldo Insuficiente para sacar!');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/account/:agency/:account', async (req, res) => {
  try {
    const account = parseInt(req.params.account);
    const agency = parseInt(req.params.agency);
    await accountsModel.deleteOne({
      agencia: agency,
      conta: account,
    });
    const bankAccounts = await accountsModel.find({ agencia: agency });
    res.send('Contas atuais: ' + bankAccounts.length);
  } catch (error) {
    res.status(500).send('Conta inválida para deletar: ' + error);
  }
});

app.post('/account/transfer', async (req, res) => {
  try {
    const account1 = parseInt(req.body[0].conta);
    const transferir = parseInt(req.body[0].balance);
    const account2 = parseInt(req.body[1].conta);

    console.log(account1 + ' ' + transferir + ' ' + account2);

    let bankAccount1 = await accountsModel.findOne({
      conta: account1,
    });

    console.log(bankAccount1.agencia);

    let bankAccount2 = await accountsModel.findOne({
      conta: account2,
    });

    console.log(bankAccount2.agencia);

    if (bankAccount1.agencia === bankAccount2.agencia) {
      if (transferir > bankAccount1.balance) {
        await accountsModel.findOneAndUpdate(
          {
            agencia: bankAccount1.agencia,
            conta: bankAccount1.conta,
          },
          { $inc: { balance: -(transferir + 8) } }
        );

        await accountsModel.findOneAndUpdate(
          {
            agencia: bankAccount2.agencia,
            conta: bankAccount2.conta,
          },
          { $inc: { balance: transferir } }
        );
      }
    } else {
      await accountsModel.findOneAndUpdate(
        {
          agencia: bankAccount1.agencia,
          conta: bankAccount1.conta,
        },
        { $inc: { balance: -(transferir + 8) } }
      );

      await accountsModel.findOneAndUpdate(
        {
          agencia: bankAccount2.agencia,
          conta: bankAccount2.conta,
        },
        { $inc: { balance: transferir } }
      );

      bankAccount1 = await accountsModel.findOne({
        conta: account1,
      });
      res.send('Agencias diferentes: ' + bankAccount1);
    }
  } catch (error) {
    res.status(500).send('Deu ruim para transferir: ' + error);
  }
});

app.get('/account/average/:data', async (req, res) => {
  try {
    const agency = parseInt(req.params.data);

    let agencyAccounts = await accountsModel.find({
      agencia: agency,
    });

    let saldoTotal = agencyAccounts.reduce((acc, cur) => {
      return acc + cur.balance;
    }, 0);

    saldoTotal = saldoTotal / agencyAccounts.length;

    res.send('Saldo Total: ' + saldoTotal);
  } catch (error) {
    res.status(500).send('Deu ruim: ' + error);
  }
});

app.get('/account/list/:count', async (req, res) => {
  try {
    const countClients = parseInt(req.params.count);

    let Accounts = await accountsModel.find({});

    Accounts.sort((a, b) => {
      return a.balance - b.balance;
    });

    let topClients = [];

    for (let i = 0; i < countClients; i++) {
      topClients.push(Accounts[i]);
    }
    res.send(topClients);
  } catch (error) {
    res.status(500).send('Deu ruim listar: ' + error);
  }
});

app.get('/account/toplist/:count', async (req, res) => {
  try {
    const countClients = parseInt(req.params.count);

    let Accounts = await accountsModel.find({});

    Accounts.sort((a, b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();

      return a < b ? -1 : a > b ? 1 : 0;
    });

    let topClients = [];

    for (let i = 0; i < countClients; i++) {
      topClients.push(Accounts[i]);
    }
    res.send(topClients);
  } catch (error) {
    res.status(500).send('Deu ruim listar: ' + error);
  }
});

app.get('/account/topClients', async (req, res) => {
  try {
    let Accounts = await accountsModel.find({});

    let agencyNumber = [];

    Accounts.forEach((account) => {
      if (!(account.agencia in agencyNumber)) {
        agencyNumber.push(account.agencia);
      }
    });

    agencyNumber = agencyNumber.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    Accounts.sort((a, b) => {
      return b.balance - a.balance;
    });

    console.log(agencyNumber);

    for (let i = 0; i < agencyNumber.length; i++) {}

    res.send(Accounts);
  } catch (error) {
    res.status(500).send('Deu ruim listar: ' + error);
  }
});

export { app as accountRouter };
