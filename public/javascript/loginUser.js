document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {

            // checks for successful login
            if (responseData.token) {

                // stores the token in local storage
                localStorage.setItem("token", responseData.token);

                // redirects or perform further actions for logged-in user
                window.location.href = "profile.html";
            }
        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
        }
    };

    const loginForm = document.getElementById("loginForm");

    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    // an event listener for the submit button that provides the callback function for the login form
    loginForm.addEventListener("submit", function (event) {
        console.log("loginForm.addEventListener");
        event.preventDefault();

        // variables fields that would be retrieved from the form
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const data = {
            username: username,
            password: password,
        };

        // performs login request and the api has to be the url of the endpoint being used for callback
        fetchMethod(currentUrl + "/api/login", callback, "POST", data);

        // resets the form fields
        loginForm.reset();
    });
});