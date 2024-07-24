// event listener is an even fired when the html is being loaded
document.addEventListener("DOMContentLoaded", function () {

  // this is a button retrieval that fetches references to html elements
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");

  // checks for the token in local storage and retrieves the value associated with the key 
  const token = localStorage.getItem("token");

  // this hides the logout button based on the token
  if (token) {
    // when the token exists
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    profileButton.classList.remove("d-none");
    logoutButton.classList.remove("d-none");
  } else {
    // when the token does not exist
    registerButton.classList.remove("d-none");
    profileButton.classList.add("d-none");
    logoutButton.classList.add("d-none");
  }

  // this is when the logout button is clicked and it removes the current token from the local storage
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });
});