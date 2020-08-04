// main box where i want to display data
const containerBox = document.getElementById('container-box')
const usersUrl = "http://localhost:3000/api/v1/users/"
const loginUrl = "http://localhost:3000/api/v1/login"
let userDataEdit = {}

// set switch statement to start on login page
let state = {page: "login", user: null }

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
  fetch(`http://localhost:3000/api/v1/users/${sessionStorage.currentUserId}`)
  .then(response => response.json())
  .then(json => {
    state.user = json
  })

  displayCard = document.getElementById("display-card")
  displayCard.innerHTML +=`
  <div class="profile-card" id="profile-card">
    <br>
    <h1> Your Profile </h1>
    <img class="card-img-top" src="${state.user.img}">
    <div class="card-body">
      <h5 class="card-title">Pup's Name: ${capitalize(state.user.pet_name)}</h5>
      <p class="card-text">${state.user.about}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item rounded">Breed: ${capitalize(state.user.breed)}</li>
      <li class="list-group-item rounded">Age: ${state.user.age}</li>
      <li class="list-group-item rounded">Size: ${capitalize(state.user.size)}</li>
      <li class="list-group-item rounded">Gender: ${capitalize(state.user.sex)}</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link" id="edit-link">Edit Profile</a>
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
      likeButton = document.getElementById('likes-button')
      //edit button
      editButton = document.getElementById("edit-link")
      //event listeners for menu buttons
      searchButton.addEventListener("click", function(e){
        e.preventDefault()
        state.page = "search"
        render()
      })
      profileButton.addEventListener("click", function(e){
        e.preventDefault()
        state.page = "profile"
        render()
      })
      editButton.addEventListener("click", function(e){
        e.preventDefault()
        state.page = 'edit'
        render()
      })
      likeButton.addEventListener("click", function(e){
        e.preventDefault()
        state.page = 'liked-me'
        render()
      })
      
      // logout button and event listener for the button
      logoutButton = document.getElementById('logout')
      logoutButton.addEventListener("click", function (){
        sessionStorage.clear()
        state.page = "login" 
        state.user = null
        render()
      })
    break;
    // search page
    case 'search':
      fetchRandomUser()
    break;
    case 'edit':
      editpage()
      const saveButton = document.getElementById("saveEdit")
      saveButton.addEventListener("click", (e) => editFormHandler(e))
      const imgUploadButton = document.getElementById("imgUploadButton")
      imgUploadButton.addEventListener("click", function(e){ 
        imgUploadHandler(e)
      })
      
    break;
    case 'liked-me':
      fetchLikedMe()
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
    state.user = json 
    render()
  });
  } else{
    state.page = "login"
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
  fetch(loginUrl, {
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
      state.user = json 
      render()
      logoutButton = document.getElementById('logout')
      logoutButton.addEventListener("click", function (){
        sessionStorage.clear()
        state.page = "login" 
        state.user = null
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
  const imgInput = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  registerFetch(emailInput, pwInput, ownerInput, petNameInput, ageInput, aboutInput, breedInput, sizeInput, sexInput, imgInput)
}
// sends new user to backend
function registerFetch(email, password, owner, petName, age, about, breed, size, sex, img){
  const userData = {user: {
    owner: owner,
    email: email,
    password: password,
    pet_name: petName,
    about: about,
    breed: breed,
    size: size,
    sex: sex,
    age: age,
    img: img
    }
  }
  // create user in backend
  fetch(usersUrl, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData)})
  .then(response => response.json())
  .then(json => {
      sessionStorage.currentUserId = json.id
      state.page = "profile"
      state.user = json
      render()
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
      <div id="name-and-image">
        <h1> ${capitalize(randomUser.owner)} </h1>
        <img class="card-img-top" src="${randomUser.img}">
      </div>
      <br>
      <div id="thumbs-up-thumbs-down" class="row">
        <div id="thumbs-down" class="col-sm text-center">
          <h1>👎</h1>
        </div>
        <div id="thumbs-up" class="col-sm text-center">
          <h1>👍</h1>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">Pup's Name: ${capitalize(randomUser.pet_name)}</h5>
        <p class="card-text">${randomUser.about}</p>
      </>
      <ul class="list-group list-group-flush">
        <li class="list-group-item rounded">Breed: ${capitalize(randomUser.breed)}</li>
        <li class="list-group-item rounded">Age: ${randomUser.age}</li>
        <li class="list-group-item rounded">Size: ${capitalize(randomUser.size)}</li>
        <li class="list-group-item rounded">Gender: ${capitalize(randomUser.sex)}</li>
      </ul>
    `
    document.getElementById("thumbs-down").addEventListener("click", fetchRandomUser)
    document.getElementById("thumbs-up").addEventListener("click", function(){
      const bodyData = {user: {
        currentUserId: state.user.id,
        likedUser: randomUser.email
        }
      }
      fetch("http://localhost:3000/api/v1/like-user", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(bodyData)
      })
      fetchRandomUser()
    })
  })
}
//top menu bar
function menuBar(){
  containerBox.innerHTML = `
  <br>
  <div id="menu-bar" class="menu-bar" >
    <ul class="nav nav-fill">
      <li class="nav-item btn btn-outline-info" id = "profile-button">
        <a class="profile"  href="#">Profile</a>
      </li>
      <li class="nav-item btn btn-outline-info" id="search-button">
        <a class="search-profile"  href="#">Search</a>
      </li>
      <li class="nav-item btn btn-outline-info" id="likes-button">
        <a class="likes"  href="#">Liked Me</a>
      </li>
    </ul>
    <br>
  </div>
  <div class="display-card" id="display-card">
  </div>
  `
}
// edit page
function editpage(){
  menu = document.getElementById("menu-bar")
  menu.parentElement.removeChild(menu)
  displayCard.innerHTML=`
  <br>
  <h3 class="text-center text-info">Edit</h3>
  <br>
  <img id="current-image" class="card-img-top" src="${state.user.img}">
  <br><br>
  <form id="edit-form" class="form" action="">
  <label for="img">Select image:</label>
  <input type="file" id="img" name="img" accept="image/*" >
  <br><br>
  <input type="submit" id="imgUploadButton" class="btn btn-info btn-md" value="Save Image">
  </form>
  <br><br>
  <form id="edit-form" class="form" action="" method="PUT">
    <div class="form-group">
      <label for="owner" class="text-info">Owner Name:</label><br>
      <input type="text" name="owner" id="owner" class="form-control" value="${state.user.owner}" >
    </div>
    <div class="form-group">
      <label for="pet_name" class="text-info">Pet Name:</label><br>
      <input type="text" name="pet_name" id="pet_name" class="form-control" value="${state.user.pet_name}">
    </div>
    <div class="form-group">
      <label for="age" class="text-info">Pet Age:</label><br>
      <input type="number" name="age" id="age" class="form-control" min="0" max="30" value="${state.user.age}">
    </div>
    <div class="form-group">
      <label for="abour" class="text-info">About Me/ Pet:</label><br>
      <textarea name="about" class="form-control" id="about" rows="3">${state.user.about}</textarea>
    </div>
    <div class="form-group">
      <label for="breed" class="text-info">Breed:</label><br>
      <input type="text" name="breed" id="breed" class="form-control" value="${state.user.breed}">
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
      <input id="saveEdit" type="submit" name="edit" class="btn btn-info btn-md" value="Save">
    </div>
  </form>
  `
  searchButton2 = searchButton
  searchButton2.addEventListener("click", function(e){
    e.preventDefault
    state.page = 'search'
    render()
  })

  
}
// edit form hangler
function editFormHandler(e){
  e.preventDefault()
  const ownerInputEdit = document.querySelector("#owner").value
  const petNameInputEdit = document.querySelector("#pet_name").value
  const ageInputEdit = document.querySelector("#age").value
  const aboutInputEdit = document.querySelector("#about").value
  const breedInputEdit = document.querySelector("#breed").value
  const sizeInputEdit = document.querySelector("#size").value
  const sexInputEdit = document.querySelector("#sex").value
  editFetch(ownerInputEdit, petNameInputEdit, ageInputEdit, aboutInputEdit, breedInputEdit, sizeInputEdit, sexInputEdit)
}
// edits user info
function editFetch(owner, petName, age, about, breed, size, sex){
  userDataEdit= {
    id: state.user.id,
    owner: owner,
    pet_name: petName,
    about: about,
    breed: breed,
    size: size,
    sex: sex,
    age: age,
    img: state.user.img
  }

  fetch(("http://localhost:3000/api/v1/users/" + state.user.id),{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(userDataEdit)
  })
  .then(resp => resp.json())
  .then(json => {
    state.user = userDataEdit
    state.page = "profile"
    render();
  })
}
// edits users photo
function imgUploadHandler(e){
  e.preventDefault()
  const body = new FormData()
  const newImg = document.querySelector("#img").files[0]
  body.append('file', newImg)
  body.append('user_id', state.user.id)
  fetch("http://localhost:3000/api/v1/img-upload",{
    method: "PUT",
    body
  })
  .then(resp => resp.json())
  .then(json => {
    document.getElementById("current-image").src = json.img
    state.user = json
    state.page = 'profile'
    render()
  })
}
// gets the users that liked you
function fetchLikedMe(){
  const bodyData = {user: {
    id: state.user.id
    }
  }
  fetch("http://localhost:3000/api/v1/liked-me", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(json => {
    state.page = 'liked-me'
    profileCard = document.getElementById("profile-card")
    profileCard.innerHTML =`
    <ul class="list-group" id="liked-me-list">
    </ul>
    `
    likedMeList = document.getElementById("liked-me-list")
    likedMelUsers = json.user.data
    likedMelUsers.forEach(function(user){
      follower = document.createElement("li")
      follower.className = "list-group-item"
      follower.id = `follower_${user.id}`
      follower.innerHTML=`
        <div class="row">
          <div class="fit">
            <img src=${user.attributes.img} width="120" height="120">
            <p class="text-center"><strong>${capitalize(user.attributes.owner)}</strong></p>
          </div>
          <div class="col-sm">
            <p> 
              Pup Name: ${capitalize(user.attributes.pet_name)}<br>
              Pup Gender: ${capitalize(user.attributes.sex)}<br>
              Pup Age: ${user.attributes.age}<br>
              Pup Size: ${capitalize(user.attributes.size)}<br>
              Pup Breed: ${capitalize(user.attributes.breed)}<br>
              Contact ${capitalize(user.attributes.owner)} to make a puppy playdate: <strong>${user.attributes.email}</strong>
            </p>
          </div>
        </div>
      `
      likedMeList.appendChild(follower)
    })
  })
}
