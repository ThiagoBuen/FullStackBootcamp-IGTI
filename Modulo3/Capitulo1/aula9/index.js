import http from 'http';

http
  .createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/teste') {
      res.write('Get/teste executado com sucesso');
    } else if (req.method === 'GET' && req.url === '/teste2') {
      res.write('Get/teste2 executado com sucesso');
    } else {
      res.write('Hello There Stranger!');
    }
    res.statusCode = 200;
    res.end();
  })
  .listen(8080);
