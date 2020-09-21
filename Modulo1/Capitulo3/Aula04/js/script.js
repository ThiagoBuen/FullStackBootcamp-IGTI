console.log('Aula 04');

window.addEventListener('load', start); //When page loads

function start() {
  console.log('Página totalmente carregada');

  var span = document.querySelector('#nameLength');

  var nameInput = document.querySelector('#nameInput');
  nameInput.addEventListener('keyup', countName);
  span.textContent = 'Contador de caracteres: ';

  var form = document.querySelector('form');
  form.addEventListener('submit', preventSubmit);
}

function preventSubmit(event) {
  event.preventDefault();

  var nameInput = document.querySelector('#nameInput');
  alert(nameInput.value + ' cadastro com sucesso!');
}

function countName(event) {
  console.log(event);
  var count = event.target.value;

  var span = document.querySelector('#nameLength');
  span.textContent = count.length;
}
