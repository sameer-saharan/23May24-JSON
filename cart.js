// Retrieving user and cart array from index.js
let cart = JSON.parse(localStorage.getItem('ci'));
let user = JSON.parse(localStorage.getItem('us'));

// Cart Container
let container = document.querySelector('.cart');

// Clean Container
function cleanContainer() {
    container.innerHTML = '';
}

// Main Function
function displayUser() {
    cleanContainer();
    cart.forEach((u) => {
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
        let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<b>Delete</b>`;
        deleteBtn.setAttribute('onclick', `deleteFromCart(${u.id})`);

        userCont.appendChild(name);
        userCont.appendChild(username);
        userCont.appendChild(email);
        userCont.appendChild(deleteBtn);

        container.appendChild(userCont);
    });
}

// Deleteing User From cart and adding to user array
function deleteFromCart(id) {
    let index = cart.findIndex((obj) => obj.id == id);
    let thatUser = cart[index];

    // Removing from cart array
    cart.splice(index, 1);
    localStorage.setItem('ci', JSON.stringify(cart));

    // Adding to user array
    user.push(thatUser);
    localStorage.setItem('us', JSON.stringify(user));

    // Displaying Cart Users
    displayUser();

}

// Initial Call
displayUser();