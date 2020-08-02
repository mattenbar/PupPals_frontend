// main box where i want to display data
const containerBox = document.getElementById('container-box')
const usersUrl = "http://localhost:3000/api/v1/users/"


// set switch statement to start on login page
let state = {page: "login" }

// html for login page
let loginPage = `
  <br>
  <div id="loginDiv">
    <form id="login-form" class="form" action="" method="post">
      <h3 class="text-center text-info">Login</h3>
      <div class="form-group">
        <label for="email" class="text-info">Email:</label><br>
        <input type="text" name="email" id="email" class="form-control">
      </div>
      <div class="form-group">
        <label for="password" class="text-info">Password:</label><br>
        <input type="password" name="password" id="password" class="form-control">
      </div>
      <div class="form-group text-left">
        <input type="submit" name="login" class="btn btn-info btn-md" value="Login">
        <input type="submit" name="register" class="btn btn-info btn-md" value="Register">
      </div>
    </form>
  </div>
`
// initial call to render page
render()

// html for register page
let registerPage =`
  <br>
  <form id="register-form" class="form" action="" method="post">
    <h3 class="text-center text-info">Register</h3>
    <div class="form-group">
      <label for="email" class="text-info">Email:</label><br>
      <input type="email" name="email" id="email" class="form-control">
    </div>
    <div class="form-group">
      <label for="password" class="text-info">Password:</label><br>
      <input type="password" name="password" id="password" class="form-control">
    </div>
    <div class="form-group">
      <label for="owner" class="text-info">Owner Name:</label><br>
      <input type="text" name="owner" id="owner" class="form-control">
    </div>
    <div class="form-group">
      <label for="pet_name" class="text-info">Pet Name:</label><br>
      <input type="text" name="pet_name" id="pet_name" class="form-control">
    </div>
    <div class="form-group">
      <label for="age" class="text-info">Pet Age:</label><br>
      <input type="number" name="age" id="age" class="form-control" min="0" max="30">
    </div>
    <div class="form-group">
      <label for="abour" class="text-info">About Me/ Pet:</label><br>
      <textarea name="about" class="form-control" id="about" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="breed" class="text-info">Breed:</label><br>
      <input type="text" name="breed" id="breed" class="form-control">
    </div>
    <div class="form-group">
      <label for="size">Select Size</label>
      <select class="form-control" id="size">
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>
    </div>
    <div class="form-group">
      <label for="sex">Select Gender</label>
      <select class="form-control" id="sex">
        <option>Female</option>
        <option>Male</option>
      </select>
    </div>
    <div class="form-group text-left">
      <input id="register2" type="submit" name="register2" class="btn btn-info btn-md" value="Register">
    </div>
    <div class="form-group text-left">
      <input id="login" type="submit" name="login" class="btn btn-info btn-md" value="Back to Login">
    </div>
  </form>
`
// html for user profile
function profilePage(){
  displayCard = document.getElementById("display-card")

  displayCard.innerHTML +=`
  <div class="profile-card" id="profile-card">
    <br>
    <h1> ${capitalize(user.owner)}'s Profile </h1>
    <img class="card-img-top" src="https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/116266925_152033579835041_6801224975812712869_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=8su9FYI7zr8AX-EjwNO&oh=245a0859f445c893326b39d2be1480bf&oe=5F4BFCEA">
    <div class="card-body">
      <h5 class="card-title">Pup's Name: ${capitalize(user.pet_name)}</h5>
      <p class="card-text">${user.about}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item rounded">Breed: ${capitalize(user.breed)}</li>
      <li class="list-group-item rounded">Age: ${user.age}</li>
      <li class="list-group-item rounded">Size: ${capitalize(user.size)}</li>
      <li class="list-group-item rounded">Gender: ${capitalize(user.sex)}</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Edit Profile</a>
    </div>
  </div>
  <br>
  <div class="form-group text-left">
  <input id="logout" type="submit" name="logout" class="btn btn-info btn-md" value="Log Out">
  </div>
`
}


//capitalize function
function capitalize(string){
  let firstLetter = string[0].toUpperCase()
  let restOfWord = string.slice(1)
  return capitalizeWord = firstLetter + restOfWord
}

// switches page conetent
function render(){
  switch (state.page){
    // first page people see to log in
    case 'login':
      containerBox.innerHTML = loginPage
      // buttons for login and register page
      const buttons = document.getElementsByClassName("btn btn-info btn-md")
      const registerMenu = buttons.register
      const loginButton = buttons.login
      // event listeners for those buttons
      loginButton.addEventListener("click", (e) => loginFormHandler(e))
      registerMenu.addEventListener("click", (e) => registerFormAdder(e))
    break; 
    case 'register':
      // sets html to registration page
      containerBox.innerHTML = registerPage
    break;
    case 'profile':
      // calls profile page function to set profile html
      // does this so we can get the user object
      menuBar()
      profilePage()
      // menu buttons
      profileButton = document.getElementById('profile-button')
      searchButton = document.getElementById('search-button')
      matchButton = document.getElementById('match-button')
      //event listeners for menu buttons
      searchButton.addEventListener("click", function(){
        state.page = "search"
        render()
      })
      profileButton.addEventListener("click", function(){
        state.page = "profile"
        render()
      })

      
      // logout button and event listener for the button
      logoutButton = document.getElementById('logout')
      logoutButton.addEventListener("click", function (){
        sessionStorage.clear()
        state.page = "login" 
        render()
      })
    break;
    // search page
    case 'search':
      fetchRandomUser()
    break;
  }
}

// checks if someone is logged in
// use parseInt bc it returns as string
if (!!parseInt(sessionStorage.currentUserId)){
  fetch(usersUrl + sessionStorage.currentUserId)
  .then(response => response.json())
  .then(json => {
    state.page = "profile"
    user = json 
    render()
  });
  } else{
    tate.page = "login"
    render()
  }


// gets values of login form
function loginFormHandler(e) {
    e.preventDefault()
  const emailInput = document.querySelector("#email").value
  const pwInput = document.querySelector("#password").value
  loginFetch(emailInput, pwInput)
}
// logs in via back end
function loginFetch(email, password){
  const bodyData = {user: {
        email: email,
        password: password
      }
  }
  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(json => {
    if (json.id){
      //similar to a session ID
      sessionStorage.currentUserId = json.id
      console.log(json)
      state.page = "profile"
      user = json 
      render()
      logoutButton = document.getElementById('logout')
      logoutButton.addEventListener("click", function (){
        sessionStorage.clear()
        state.page = "login" 
        render()
      })
    }
  })
}

// creating new users
//listens for register button to be clicked to render register form

function registerFormAdder(e) {
    e.preventDefault()
  state.page = 'register'
  render()
  const registerButton = document.getElementById("register2")
  return registerButton.addEventListener("click", (e) => registerFormHandler(e))
}
// gets values of the register forms
function registerFormHandler(e){
  e.preventDefault()
  const emailInput = document.querySelector("#email").value
  const pwInput = document.querySelector("#password").value
  const ownerInput = document.querySelector("#owner").value
  const petNameInput = document.querySelector("#pet_name").value
  const ageInput = document.querySelector("#age").value
  const aboutInput = document.querySelector("#about").value
  const breedInput = document.querySelector("#breed").value
  const sizeInput = document.querySelector("#size").value
  const sexInput = document.querySelector("#sex").value
  registerFetch(emailInput, pwInput, ownerInput, petNameInput, ageInput, aboutInput, breedInput, sizeInput, sexInput)
}
// sends new user to backend
function registerFetch(email, password, owner, petName, age, about, breed, size, sex){
  const userData = {user: {
    owner: owner,
    email: email,
    password: password,
    pet_name: petName,
    about: about,
    breed: breed,
    size: size,
    sex: sex,
    age: age
    }
  }
  // create user in backend
  fetch(usersUrl, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData)})
  .then(response => response.json())
  .then(json => {
    if (json.id){
      sessionStorage.currentUserId = json.id
      state.page = "profile"
      render()
      logoutButton = document.getElementById('logout')
      logoutButton.addEventListener("click", function (){
        sessionStorage.clear()
        state.page = "login" 
        render()
      })
      return user = json 
    }
  })
}
// returns random item form array
function random_item(items){ return items[Math.floor(Math.random()*items.length)];}
// returns random item from Object
function randomProperty(obj){
  let keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};
// get all users from database
function fetchRandomUser(){
  fetch(usersUrl)
  .then(response => response.json())
  .then(json =>{
    allUsers = json.user.data
    randomUser = randomProperty(allUsers).attributes
    state.page = "search"
    profileCard = document.getElementById("profile-card")
    profileCard.innerHTML =`
      <br>
      <h1> ${capitalize(randomUser.owner)} </h1>
      <img class="card-img-top" src="https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/116266925_152033579835041_6801224975812712869_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=8su9FYI7zr8AX-EjwNO&oh=245a0859f445c893326b39d2be1480bf&oe=5F4BFCEA">
      <div class="card-body">
        <h5 class="card-title">Pup's Name: ${capitalize(randomUser.pet_name)}</h5>
        <p class="card-text">${randomUser.about}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item rounded">Breed: ${capitalize(randomUser.breed)}</li>
        <li class="list-group-item rounded">Age: ${randomUser.age}</li>
        <li class="list-group-item rounded">Size: ${capitalize(randomUser.size)}</li>
        <li class="list-group-item rounded">Gender: ${capitalize(randomUser.sex)}</li>
      </ul>
    `
  })
}

function menuBar(){
  containerBox.innerHTML = `
  <br>
  <div class="menu bar" >
    <ul class="nav nav-fill">
      <li class="nav-item btn btn-outline-info" id = "profile-button">
        <a class="profile"  href="#">Profile</a>
      </li>
      <li class="nav-item btn btn-outline-info" id="search-button">
        <a class="search-profile"  href="#">Search</a>
      </li>
      <li class="nav-item btn btn-outline-info" id="matches-button">
        <a class="matches"  href="#">Matches</a>
      </li>
    </ul>
    <br>
  </div>
  <div class="display-card" id="display-card">
  </div>
  `
}
