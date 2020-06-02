const loginForm = document.querySelector("form#login_form");

const getData = async (url = "http://localhost:3000/users") => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let usersArray = data.map((el) => el.name);
      console.log(usersArray);
      loginForm.addEventListener("submit", (e) => {
        const userNameInput = document.querySelector("input#user_name_login").value;
        e.preventDefault();
        if (usersArray.includes(userNameInput) === true) {
          let userObj = data.find((el) => el.name === userNameInput);
          console.log(">>>>", userObj.id);
          let id = userObj.id;
          return window.location.replace(`/home.html?user=${id}`);
        } else {
          return console.log("not logged in");
        }
      });
    });
};

getData("http://localhost:3000/users");
