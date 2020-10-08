// 3 textos
// 3 inputs do tipo range
// 3 inputs de text desabilitados

// Monitorar o on change dos input range, refletir nos inputs de texto e trocar a cor do div
// Delimitar no html os limites min e max do range no html
// Background color, função RGB do CSS para aceitar os 3 valores
// Passar uma string via JS para o CSS
window.addEventListener('load', start);
var inputRed = document.querySelector('#inputRed');
var inputValueRed = document.querySelector('#inputValueRed');
var inputGreen = document.querySelector('#inputGreen');
var inputValueGreen = document.querySelector('#inputValueGreen');
var inputBlue = document.querySelector('#inputBlue');
var inputValueBlue = document.querySelector('#inputValueBlue');
var changeColor = document.querySelector('#changeColor');

function start() {
  updateFields();
  inputRed.addEventListener('change', updateFields);
  inputGreen.addEventListener('change', updateFields);
  inputBlue.addEventListener('change', updateFields);
}

function updateFields() {
  console.log('change');
  inputValueRed.value = inputRed.value;
  inputValueGreen.value = inputGreen.value;
  inputValueBlue.value = inputBlue.value;
  changeColor.style.background =
    'rgb(' +
    inputRed.value +
    ',' +
    inputGreen.value +
    ',' +
    inputBlue.value +
    ')';
}
