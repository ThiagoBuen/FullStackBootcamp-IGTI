function sum(a, b) {
  return a + b;
}

function compareNumber(a, b) {
  //return a > b ? 1 : a < b ? -1 : 0;
  return a - b;
}

function somatorio(from, upTo) {
  var sum = 0;

  for (var i = from; i <= upTo; i++) {
    sum += i;
  }

  return sum;
}

console.log(sum(1, 2));
console.log(compareNumber(1, 2));
console.log(compareNumber(1, 1));
console.log(compareNumber(1, 0));
console.log(somatorio(20, 100));
