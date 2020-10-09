import { promises as fs } from 'fs';
import readline from 'readline';

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
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let numero = null;

  console.log('******Menu de operações: *********');
  console.log('1 - Informação sobre estado ');
  console.log('2 - Rank dos 5 estados com maior população');
  console.log('3 - Rank dos 5 estados menos populosos');
  console.log('4 - Imprimir a cidade com maior nome de cada estado');
  console.log('5 - Imprimir a cidade com menor nome de cada estado');
  console.log('6 - Imprimir a cidade com maior nome de todos os estados');
  console.log('7 - Imprimir a cidade com menor nome de todos os estado');
  rl.question('Digite um número: ', async (numero) => {
    switch (parseInt(numero)) {
      case 1:
        rl.question(
          'Entre com o nome do estado desejado: ',
          (estadoEscolhido) => informacaoEstado(estadoEscolhido)
        );
        break;

      case 2:
        rankMaiorPopulacaoCidades(1);
        break;

      case 3:
        rankMaiorPopulacaoCidades(2);
        break;

      case 4:
        let maioresCidades = await findCidadeEstados(1);
        console.log(maioresCidades);
        break;

      case 5:
        let menoresCidades = await findCidadeEstados(2);
        console.log(menoresCidades);
        break;

      case 6:
        let maiorCidade = await findCidadeEstados(1);
        maiorCidade.sort((a, b) => {
          return a.cidade < b.cidade ? -1 : a.cidade > b.cidade ? 1 : 0;
        });
        var longestCity = maiorCidade.sort(function (a, b) {
          return b.cidade.length - a.cidade.length;
        })[0];
        console.log(longestCity);
        break;

      case 7:
        let menorCidade = await findCidadeEstados(2);
        menorCidade.sort((a, b) => {
          return a.cidade < b.cidade ? -1 : a.cidade > b.cidade ? 1 : 0;
        });
        var shortestCity = menorCidade.sort(function (a, b) {
          return a.cidade.length - b.cidade.length;
        })[0];
        console.log(shortestCity);
        break;

      default:
        console.log('Finalizando consulta!');
        break;
    }
  });

  /*while (numero > '0' && numero < '8') {
  }*/
}

async function findCidadeEstados(opcao) {
  let cidadesRank = [];
  let state;

  //prettier-ignore
  let estadosBrasil = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
                      'DistritoFederal', 'EspíritoSanto', 'Goiás', 'Maranhão',
                      'MatoGrosso', 'MatoGrossodoSul', 'MinasGerais', 'Pará',
                      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'RiodeJaneiro',
                      'RioGrandedoNorte', 'RioGrandedoSul', 'Rondônia', 'Roraima',
                      'SantaCatarina', 'SãoPaulo', 'Sergipe', 'Tocantins'];

  switch (opcao) {
    case 1:
      for (const estadoAtual of estadosBrasil) {
        state = JSON.parse(await fs.readFile('./' + estadoAtual + '.json'));
        state.sort(function (a, b) {
          if (a.Nome < b.Nome) {
            return -1;
          }
          if (a.Nome > b.Nome) {
            return 1;
          }
          return 0;
        });
        var longest = state.sort(function (a, b) {
          return b.Nome.length - a.Nome.length;
        })[0];
        cidadesRank.push({
          estado: estadoAtual,
          cidade: longest.Nome,
        });
      }
      break;

    case 2:
      for (const estadoAtual of estadosBrasil) {
        state = JSON.parse(await fs.readFile('./' + estadoAtual + '.json'));
        // console.log(state);
        var shortest = state.sort(function (a, b) {
          return a.Nome.length - b.Nome.length;
        })[0];
        cidadesRank.push({
          estado: estadoAtual,
          cidade: shortest.Nome,
        });
      }
      break;

    default:
      break;
  }

  await Promise.all(cidadesRank);
  //console.log(cidadesRank);

  return cidadesRank;
}

async function rankMaiorPopulacaoCidades(opcao) {
  let cidadesRank = [];
  let state;

  //prettier-ignore
  let estadosBrasil = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
                      'DistritoFederal', 'EspíritoSanto', 'Goiás', 'Maranhão',
                      'MatoGrosso', 'MatoGrossodoSul', 'MinasGerais', 'Pará',
                      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'RiodeJaneiro',
                      'RioGrandedoNorte', 'RioGrandedoSul', 'Rondônia', 'Roraima',
                      'SantaCatarina', 'SãoPaulo', 'Sergipe', 'Tocantins'];
  console.log(estadosBrasil.length);

  for (const estadoAtual of estadosBrasil) {
    state = JSON.parse(await fs.readFile('./' + estadoAtual + '.json'));
    cidadesRank.push({ estado: estadoAtual, cidades: parseInt(state.length) });
  }

  await Promise.all(cidadesRank);

  console.log(cidadesRank);
  console.log(cidadesRank.length);

  if (opcao == 1) {
    cidadesRank.sort((a, b) => {
      var x = a.cidades;
      var y = b.cidades;
      return y - x;
    });
  } else if (opcao == 2) {
    cidadesRank.sort((a, b) => {
      var x = a.cidades;
      var y = b.cidades;
      return x - y;
    });
  }

  console.log(cidadesRank);
}

async function informacaoEstado(estadoEscolhido) {
  let state;
  state = JSON.parse(await fs.readFile('./' + estadoEscolhido + '.json'));
  console.log('Este estado tem ' + state.length + ' cidades.');
  /*let countLength = [];
  state.forEach((cit) => {
    countLength.push(cit.Nome.length);
  });
  console.log(countLength);
  var cotn = countLength.sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });
  console.log(cotn);*/
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
