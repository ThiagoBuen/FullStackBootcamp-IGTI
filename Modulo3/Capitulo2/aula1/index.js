import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';
import express from 'express';
import { callbackify } from 'util';

const app = express();
app.use(express.json());

//prettier-ignore
app.get("/", (req, res) => {
  res.send('Teste agora');
});

//Teste all
app.all('/testAll', (_req, res) => {
  res.send(req.method);
});
//Caracteres especiais
app.get('/buzz?', (_req, res) => {
  res.send('/teste');
});

app.get('/try+', (_req, res) => {
  res.send('/teste');
});

app.get('/page*', (_req, res) => {
  res.send('/teste');
});

app.get('/test(ing)?', (_req, res) => {
  res.send('/teste');
});

app.get(/.*Red$/, (_req, res) => {
  res.send('/.*Red$/');
});

// parametros na rota
app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + ' ' + req.params.a);
});

app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const resultado = a + b;
  res.send('Resultado: ' + resultado);
});

//parametros via query
app.get('/testQuery', (req, res) => {
  res.send(req.query);
});

//next
app.get(
  '/testNext',
  (req, res, next) => {
    console.log('Callback 1');
    next();
  },
  (req, res) => {
    console.log('Callback 2');
    res.end();
  }
);

//next Array
const callback1 = (req, res, next) => {
  console.log('Callback 1');
  next();
};

function callback2(req, res, next) {
  console.log('Callback 2');
  next();
}

function callback3(req, res) {
  console.log('Callback 3');
  res.end();
}

app.get('/testNextArray', [callback1, callback2, callback3]);

//Route
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('/testRoute get');
  })
  .post((req, res) => {
    res.send('/testRoute post');
  })
  .delete((req, res) => {
    res.send('/testRoute delete');
  });

app.listen(3000, () => {
  console.log('API start com sucesso!');
});
