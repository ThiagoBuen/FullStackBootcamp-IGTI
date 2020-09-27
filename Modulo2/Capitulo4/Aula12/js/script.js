window.addEventListener('load', () => {
  doSpread();
  doRest();
  doDestructuring();
});

function doSpread() {
  const marriedMen = people.results.filter(
    (person) => person.name.title === 'Mr'
  );
  const marriedWomen = people.results.filter(
    (person) => person.name.title === 'Ms'
  );

  const marriedPeople = [...marriedMen, ...marriedWomen, { msg: 'Oi' }];
  console.log(marriedPeople);
}

function doRest() {
  console.log(infiniteSum(1, 2));
  console.log(infiniteSum(1, 2, 3, 4, 10, 25, 1000));
}

function infiniteSum(...numbers) {
  console.log(numbers);
  return numbers.reduce((acc, curr0) => acc + curr0, 0);
}

function doDestructuring() {
  const first = people.results[0];
  //Repetitivo
  /*const username = first.login.username;
  const password = first.login.password; */
  //Usando destructuring
  const { username, password } = first.login;

  console.log(username, password);
}
