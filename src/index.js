// main box where i want to display data
const containerBox = document.getElementById('container-box')

// set switch statement to start on login page
let state = {page: "login" }

// code for login page
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

// code for register page
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
// code for user profile
let profilePage = `
  <br>
  <h1> Testing </h1>
  <br>
  <div class="form-group text-left">
  <input id="logout" type="submit" name="logout" class="btn btn-info btn-md" value="Log Out">
  </div>
`

// switches page conetent
function render(){
  switch (state.page){
    case 'login':
      containerBox.innerHTML = loginPage
    break; 
    case 'register':
      containerBox.innerHTML = registerPage
    break;
    case 'profile':
      containerBox.innerHTML = profilePage
    break;
  }
}

// checks if someone is logged in
if (!!parseInt(sessionStorage.currentUserId)){
  state.page = "profile"
  render()
}


// initial buttons for login and to see register form
const buttons = document.getElementsByClassName("btn btn-info btn-md")
const registerMenu = buttons.register
const loginButton = buttons.login




// handles logging in
loginButton.addEventListener("click", (e) => loginFormHandler(e))
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
      sessionStorage.currentUserId = json.id
      console.log(json)
      state.page = "profile"
      render()
      let logoutButton = document.getElementById('logout')
      return logoutButton.addEventListener("click", function (){
        sessionStorage.currentUserId = 0
        state.page = "login" 
        render()
      })
    }
  })
}

// creating new users
//listens for register button to be clicked to render register form
registerMenu.addEventListener("click", (e) => registerFormAdder(e))
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
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData)})
    .then(response => response.json())
    .then(json => {
    sessionStorage.currentUserId = json.id
    state.page = "profile"
    render()
    let logoutButton = document.getElementById('logout')
    return logoutButton.addEventListener("click", () => sessionStorage.currentUserId = 0)
  })
}



