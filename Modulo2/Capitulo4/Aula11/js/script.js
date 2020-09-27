window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();
});

function doMap() {
  const nameEmailArray = people.results.map((person) => {
    return {
      name: person.name,
      email: person.email,
    };
  });

  return nameEmailArray;
}

function doFilter() {
  const olderThan50 = people.results.filter((person) => {
    return person.dob.age > 50;
  });
}

function doForEach() {
  const mappedPeople = doMap();

  mappedPeople.forEach((person) => {
    person.nameSize =
      person.name.title.length +
      person.name.first.length +
      person.name.last.length;
  });
}

function doReduce() {
  const totalAges = person.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);
  console.log(totalAges);

  /*let sumAges = 0;
  for (let i = 0; i < people.results.length; i++) {
    var current = people.results[i];
    sumAges += current.dob.age;
  }
  console.log(sumAges);*/
}

function doFind() {
  const found = people.results.find((person) => {
    //Returns the first element that matches the filter
    return person.location.state === 'Minas Gerais';
  });
  console.log(found);
}

function doSome() {
  const found = people.results.some((person) => {
    return person.location.state === 'Amazonas';
  });
  console.log(found);
}

function doEvery() {
  const every = people.results.every((person) => {
    //Returns true if everything attends the rule
    return person.nat === 'BR';
  });
  console.log(every);
}

function doSort() {
  const mappedNames = people.results
    .map((person) => {
      return {
        name: person.name.first,
      };
    })
    .filter((person) => {
      return person.startsWith('A');
    })
    .sort((a, b) => {
      //return a.name.localeCompare(b.name);
      //return a.name.length - b.name.length;
      return b.name.length - a.name.length;
    });
  console.log(mappedNames);
}
