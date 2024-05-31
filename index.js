let user = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
  },
];

let cart = [];

// Local Storage Upgradation
localStorage.setItem('us', JSON.stringify(user));
localStorage.setItem('ci', JSON.stringify(cart));

//HTML Page Setup
let container = document.querySelector(".container");

// Clear Container
function cleanContainer() {
  container.innerHTML = '';
}

function createUser() {
  cleanContainer();
  user.forEach((u) => {
    let userCont = document.createElement("div");
    userCont.setAttribute("id", u.id);
    userCont.setAttribute("class", "userCont");

    // User Data
    let name = document.createElement("div");
    name.innerHTML = `<b>Name:</b> ${u.name}`;
    let username = document.createElement("div");
    username.innerHTML = `<b>Username:</b> ${u.username}`;
    let email = document.createElement("div");
    email.innerHTML = `<b>Email:</b> ${u.email}`;
    let cartBtn = document.createElement('button');
    cartBtn.innerHTML = `<b>Add to cart</b>`;
    cartBtn.setAttribute('onclick', `addToCart(${u.id})`);

    userCont.appendChild(name);
    userCont.appendChild(username);
    userCont.appendChild(email);
    userCont.appendChild(cartBtn);

    container.appendChild(userCont);
  });
  
}

// User Input Functionality
let global_id = 11;
let submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", function () {
  let inpName = document.querySelector("#name").value;
  let inpUsername = document.querySelector("#username").value;
  let inpEmail = document.querySelector("#email").value;
  let userObj = {
    id: global_id++,
    name: inpName,
    username: inpUsername,
    email: inpEmail,
  };

  if (inpName && inpUsername && inpEmail) {
    user.push(userObj);
    createUser();
  } else {
    alert(`Fields can't be empty!`);
  }
  
});

// Sorting
let sortType = document.querySelector('#select-bar').value

// Sort Functions - 
function sortByName(arr, sortType) {
  if (sortType=="name-asc") {
    return arr.slice().sort((a,b) => a.name.localeCompare(b.name))
  } else if (sortType=="name-dec") {
    return arr.slice().sort((a,b) => b.name.localeCompare(a.name))
  }
  
};

function sortByUsername(arr, sortType) {
  if (sortType=="username-asc") {
    return arr.slice().sort((a,b) => a.username.localeCompare(b.username))
  } else if (sortType=="username-dec") {
    return arr.slice().sort((a,b) => b.username.localeCompare(a.username))
  }
  
};

function sortByEmail(arr, sortType) {
  if (sortType=="email-asc") {
    return arr.slice().sort((a,b) => a.email.localeCompare(b.email))
  } else if (sortType=="email-dec") {
    return arr.slice().sort((a,b) => b.email.localeCompare(a.email))
  }
  
};
// Sort Functions ^^
let selectBar = document.querySelector('#select-bar');

selectBar.addEventListener('change', function () {
  sortType = selectBar.value;

  if (sortType) {
    if (sortType=="name-asc" || sortType=="name-dec") {
      let sortedUserByName = sortByName(user, sortType);
      user = sortedUserByName;
      // Updating Cards in Container
      createUser()
    } else if (sortType=="username-asc" || sortType=="username-dec") {
      let sortedUserByUsername= sortByUsername(user, sortType);
      user = sortedUserByUsername;
      // Updating Cards in Container
      createUser()
    } else if (sortType=="email-asc" || sortType=="email-dec") {
      let sortedUserByEmail = sortByEmail(user, sortType);
      user = sortedUserByEmail;
      // Updating Cards in Container
      createUser()
    }
  } else {
    alert (`Select a valid sort option!`)
  }
})

// Cart Setup
function addToCart(id) {
  let index = user.findIndex((obj) => obj.id === id);
  let thatUser = user[index];
  // Adding user object to cart array
  cart.push(thatUser);
  localStorage.setItem('ci', JSON.stringify(cart));

  // Removing from user array and updating array
  user.splice(index, 1);
  localStorage.setItem('us', JSON.stringify(user));

  // Udpating HTML Page
  createUser();
}

// Initial Call
createUser();

// When user gets updated (deleteFromCart gets called in cart.js)
window.addEventListener('storage', function(event) {
  if (event.key === 'us') {
      user = JSON.parse(event.newValue);
      createUser();
  }
});