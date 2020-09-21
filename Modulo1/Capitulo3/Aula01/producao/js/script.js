var title = document.querySelector('h1');
title.textContent = 'Modificado pelo JS';

var local = document.querySelector('#local');
local.textContent = 'Via Láctea';

var personalDataArray = Array.from(document.querySelectorAll('.data'));
for (var i = 0; i < personalDataArray.length; i++) {
  var currentElement = personalDataArray[i];
  currentElement.classList.add('emphasis');
}
