window.addEventListener('load', function () {
    doFetch();
    doFetchAsync();
  executeDivisionPromise();
  executeDivisionPromiseAsyncAwait();
});

function doFetch(){
    fetch('https://api.github.com/users/rrgomide')
    .then((res) => {
      res.json().then((data) => {
        showData(data);
      });
    })
    .catch((error) => {
      console.log('Erro na requisicao');
    });
}

async function doFetchAsync(){
    const res = await fetch('https://api.github.com/users/rrgomide')
    const json = await res.json();
    console.log(json)

}
function showData(data) {
  const user = document.querySelector('#user');
  user.textContent = data.login + ' ' + data.name;
}

function divisionPromise(a, b) {
  return new Promise((resolve, reject) => {
    if (b == 0) {
      reject('Nao é possível dividir por 0');
    } else {
      resolve(a / b);
    }
  });
}

function executeDivisionPromiseAsyncAwait() {
    const division = await divisionPromise(12, 2);
    console.log(division);
}
