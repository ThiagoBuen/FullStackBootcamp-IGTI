'use strict'; //O JS acusa mais erros

//var x let -- >  Var tem escopo abrangente e let tem escopo reduzido

function withVar() {
  for (var i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  i = 20;
  console.log(i);
}

function withLet() {
  for (let i = 0; i < 10; i++) {
    console.log('var' + i);
  }

  //i = 20;
  // console.log(i);
}

withVar();
withLet();

// Const - Não há reatribuição para a variável, mas n garante a imutabilidade total
const c = 10;
//c = 20;
const d = [];
d.push(1);

function sum(a, b) {
  return a + b;
}
const sum2 = function (a, b) {
  //Função anônima
  return a + b;
};

const sum3 = (a, b) => {
  return a + b;
};

const sum4 = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sum2(2, 3));
console.log(sum3(2, 3));
console.log(sum4(2, 3));

// Tempalte literals

const name = 'AB';
const surname = 'BC';

const text1 = 'Meu nome é ' + name + ' ' + surname;

const text2 = `Meu nome é ${name} ${surname}`;

console.log(text1);
console.log(text2);

const sum5 = (a = 0, b = 0) => a + b;
console.log(sum5(2));
