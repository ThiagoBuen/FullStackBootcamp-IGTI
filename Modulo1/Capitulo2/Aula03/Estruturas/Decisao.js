var a = 5;
var b = 6;

//Famoso If-Else
if (a > b) {
  console.log(a + 'é maior que ' + b);
} else {
  if (a < b) {
    console.log(a + 'é menor que ' + b);
  } else {
    console.log(a + 'é igual a  ' + b);
  }
}

if (a > b) console.log(a + 'é maior que ' + b);
else if (a < b) console.log(a + 'é menor que ' + b);
else console.log(a + 'é igual a ' + b);

//Switch case
var dia = 1;

switch (dia) {
  case 1:
    console.log('Segunda');
    break;

  case 2:
    console.log('Terça');
    break;

  case 3:
    console.log('Quarta');
    break;

  case 4:
    console.log('Quinta');
    break;

  case 5:
    console.log('Sexta');
    break;

  case 6:
    console.log('Sabado');
    break;

  case 7:
    console.log('Domingo');
    break;

  default:
    console.log('Inválido');
    break;
}

//Operador Ternário

a = 6;
b = 7;

var resposta = a > b ? 'maior' : a < b ? 'menor' : 'igual';
