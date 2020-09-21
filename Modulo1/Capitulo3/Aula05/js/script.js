window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Tres', 'Quatro'];
var globalInputName = null;

function start() {
  preventFormSubmit();
  globalInputName = document.querySelector('#inputName');
  activateInput();
}

function activateInput(event) {
  globalInputName.focus();
}
function preventFormSubmit() {
  function handleFormSubmit(event) {
    //Função local
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}
