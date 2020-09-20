//Somatorio - while

var numeroAtual = 1;
var somatorio = 0;

while (numeroAtual <= 10) {
  somatorio += numeroAtual;
  numeroAtual++;
}

console.log('Soma é : ' + somatorio);

numeroAtual = 1;
somatorio = 0;

do {
  somatorio += numeroAtual;
  numeroAtual++;
} while (numeroAtual <= 10);

console.log('Soma é : ' + somatorio);

numeroAtual = 1;
somatorio = 0;

for (numeroAtual = 1; numeroAtual <= 10; numeroAtual++) {
  somatorio += numeroAtual;
}

console.log('Soma é : ' + somatorio);
