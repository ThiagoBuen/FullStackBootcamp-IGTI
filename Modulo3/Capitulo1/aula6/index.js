import { promises as fs } from 'fs';

writeReadJson();

async function writeReadJson() {
  try {
    const arrayCarros = ['Gol', 'Palio', 'Uno'];
    const obj = {
      carros: arrayCarros,
    };
    await fs.writeFile('teste.json', JSON.stringify(obj));
    const data = JSON.parse(await fs.readFile('teste.json'));
    data.carros.push('Sandero');
    console.log(data);
    await fs.writeFile('teste.json', JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

//File service with promises and async await

init();
async function init() {
  try {
    await fs.writeFile('teste3.txt', 'teste 3 com promises');
    await fs.appendFile('teste3.txt', '\n teste append file');
    const data = await fs.readFile('teste3.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

//Utilizando callbacks
/*
//import fs from 'fs';
fs.writeFile('teste.txt', '...', function (err) {
  if (err) {
    console.log(err);
  } else {
    fs.appendFile('teste.txt', ' teste concat', function (err) {
      if (err) {
        console.log(err);
      } else {
        fs.readFile('teste.txt', 'utf-8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
});
*/
//Utilizando manipulação Síncrona - Não recomendado
/*
try {
  console.log('1');
  fs.writeFileSync('teste2.txt', 'teste 2');
  console.log('2');
  const data = fs.readFileSync('teste2.txt', 'utf-8');
  console.log(data);
  console.log('3');
} catch (err) {
  console.log(err);
}
*/
