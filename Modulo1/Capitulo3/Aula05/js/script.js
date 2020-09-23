window.addEventListener('load', start);

var globalNames = [];
var globalInputName = null;
var isEditing = false;
var currentIndex = null;

function start() {
  preventFormSubmit();
  globalInputName = document.querySelector('#inputName');
  activateInput();
  render();
}

function activateInput() {
  function insertedName(newName) {
    globalNames.push(newName);
  }
  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }
  function handleTyping(event) {
    hasText = !!event.target.value && event.target.value.trim() != '';
    if (!hasText) {
      clearInput();
      return;
    }
    if (event.key == 'Enter' && event.target.value.trim() != '') {
      if (isEditing == false) {
        insertedName(event.target.value);
        //event.target.value = '';
      } else {
        updateName(event.target.value);
      }
      isEditing = false;
      render();
      clearInput();
    }
  }
  globalInputName.focus();
  globalInputName.addEventListener('keyup', handleTyping);
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

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(spanName, index) {
    function editItem() {
      inputName.value = spanName;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = spanName;
    span.addEventListener('click', editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  var ul = document.createElement('ul');

  divNames.innerHTML = '';

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');

    var button = createDeleteButton(i);

    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
    isEditing = false;
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
