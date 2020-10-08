import { promises as fs } from 'fs';
const estadosDir = './jsons/Estados.json';
const cidadesDir = './jsons/Cidades.json';

let estados = [];
let cidades = [];

writeReadJson();

async function writeReadJson() {
  estados = JSON.parse(await fs.readFile('./jsons/Estados.json'));
  cidades = JSON.parse(await fs.readFile('./jsons/Cidades.json'));
  createStatesJson();
  //console.log(estados.length);
  //console.log(cidades);
  MGcities = JSON.parse(await fs.readFile('./MinasGerais.json'));
  console.log(MGcities);
}

function createStatesJson() {
  estados.forEach((estado) => {
    // console.log(typeof cidades.Estado);
    // console.log(typeof estado.ID);
    let filteredCidade;
    filteredCidade = cidades.filter((cidade) => {
      //console.log(typeof parseInt(cidade.Estado));
      //console.log(typeof parseInt(estado.ID));
      return parseInt(cidade.Estado) === parseInt(estado.ID);
    });

    filteredCidade = filteredCidade.filter((filtro) => {
      return filtro.Nome;
    });
    //console.log(filteredCidade);

    filteredCidade = JSON.stringify(filteredCidade);

    fs.writeFile(
      estado.Nome.split(' ').join('') + '.json',
      filteredCidade,
      'utf-8'
    );
  });
  //
  // console.log('****');
}
