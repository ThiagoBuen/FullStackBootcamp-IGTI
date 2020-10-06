const numero = parseInt(100);
//const numero = parseInt(process.argv[2])
const multiplos = [];

for (let i = 0; i < numero; i++) {
  if (i % 3 === 0 || i % 5 === 0) {
    multiplos.push(i);
  }
}

function example(n1, n2 = 20) {
  return n1 + n2 / 4;
}

function p4() {
  let interval = null;
  let i = 0;
  let array = [];
  interval = setInterval(() => {
    array.push(i++);
    if (i == 5) {
      clearInterval(interval);
      console.log(array);
    }
  }, 1000);
}

p4();
console.log(example(10));

console.log(multiplos);
