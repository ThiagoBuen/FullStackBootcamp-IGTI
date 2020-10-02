let tabFilteredUsers = null;
let filteredUserMessage = null;

let allUsers = [];
let filteredUsers = [];
let totalMales = 0;
let totalFemale = 0;
let totalAge = 0;
let averageAve = 0;

window.addEventListener('load', () => {
  filteredUserMessage = document.querySelector('#userCountMessage');
  tabFilteredUsers = document.querySelector('#tabFoundUsers');
  totalMales = document.querySelector('#totalMaleCount');
  totalFemales = document.querySelector('#totalFemaleCount');
  totalAge = document.querySelector('#totalAge');
  ageAverage = document.querySelector('#ageAverage');
  inputNameSearch = document.querySelector('#inputNameSearch');
  submitFilter = document.querySelector('#submitFilter');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  console.log(json);
  //prettier-ignore
  allUsers = json.results.map((user) => {
    
    return {
      name: user.name.first + ' ' + user.name.last,
      gender: user.gender,
      picture: user.picture.medium,
      age: user.dob.age
    }
  });
  console.log(allUsers);
  inputNameSearch.addEventListener('keyup', enableSubmit);
  submitFilter.addEventListener('click', filterUsers);
}

function enableSubmit(event) {
  if (event.target.value === '') {
    submitFilter.disabled = true;
  } else {
    submitFilter.disabled = false;
    if (event.key === 'Enter') {
      //console.log('Foi enter!');
      filterUsers();
    }
  }
  console.log(event);
}

function filterUsers() {
  let inputName = inputNameSearch.value;
  //console.log(inputName);
  //console.log(allUsers.forEach((user) => console.log(user.name)));
  filteredUsers = allUsers.filter((user) => user.name.includes(inputName));
  console.log(filteredUsers);
  render();
}

function render() {
  filterRender();
  updateFilteredUsersNumberField();
  updateStatisticsNumberFields();
}

function filterRender() {
  let filterUsersHTML = '<div>';
  filteredUsers.forEach((user) => {
    const { name, gender, picture, age } = user;
    const filterUserHTML = `
      <div class='user'>
        <div>
          <img src="${picture}" >
        </div>
        <div>
          ${name} , ${age} anos
        </div>
    `;
    filterUsersHTML += filterUserHTML;
  });
  filterUsersHTML += '</div>';
  tabFilteredUsers.innerHTML = filterUsersHTML;
}

function updateFilteredUsersNumberField() {
  let numFilterUsers = filteredUsers.length;

  if (numFilterUsers > 0) {
    filteredUserMessage.textContent =
      numFilterUsers + ' usuário(s) filtrado(s)';
  } else {
    filteredUserMessage.textContent = 'Nenhum usuário filtrado';
  }
}

function updateStatisticsNumberFields() {
  let totalFoundMales = 0;
  filteredUsers.forEach((user) => {
    if (user.gender === 'male') {
      totalFoundMales += 1;
    }
  });

  let totalFoundFemales = 0;
  filteredUsers.forEach((user) => {
    if (user.gender === 'female') {
      totalFoundFemales += 1;
    }
  });

  const totalSumAge = filteredUsers.reduce((accumulator, current) => {
    return (accumulator += current.age);
  }, 0);

  averageAve = totalSumAge / filteredUsers.length;

  totalMales.textContent = totalFoundMales;
  totalFemales.textContent = totalFoundFemales;
  totalAge.textContent = totalSumAge;
  ageAverage.textContent = averageAve;

  console.log('Total Found Males ' + totalFoundMales);
  console.log('Total Found Females ' + totalFoundFemales);
  console.log('TOtal aGE: ' + totalSumAge);
  console.log('Average aGE: ' + averageAve);
  /*let totalMales = 0;
let totalFemale = 0;
let totalAge = 0;
let averageAve = 0;*/
}
