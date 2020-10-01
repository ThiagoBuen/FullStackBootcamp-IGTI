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
  tabFoundUsers = document.querySelector('#tabFoundUsers');
  totalMales = document.querySelector('#totalMaleCount');
  totalFemales = document.querySelector('#totalFemaleCount');
  totalAge = document.querySelector('#totalAge');
  ageAverage = document.querySelector('#ageAverage');

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  console.log(json);
  //prettier-ignore
  allUsers = json.map((user) => {
    return {
      name: user.name.first + ' ' + user.name.last,
      gender: user.gender,
      picture: user.picture.medium,
      age: user.dob.age,
    }
  });
  console.log(allUsers);
}
