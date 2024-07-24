document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

    // this sets up an event listener for the submit button that provides the callback function 
    signupForm.addEventListener("submit", function (event) {

        // this prevents the default for submission behaviour which would cause the page to reload 
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // to check the password entered matches
        if (password === confirmPassword) {
            console.log("Signup successful");
            console.log("Username:", username);
            console.log("Email:", email);
            console.log("Password:", password);
            warningCard.classList.add("d-none");

            const data = {
                username: username,
                email: email,
                password: password,
            };

            // defines a callback function that will be executed after making a fetch request that recieves the request and data
            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                // decode the token after setting it in the localStorage
                const decodedToken = jwt_decode(responseData.token);
                console.log("Decoded Token:", decodedToken);
                
                if (responseStatus === 200) {
                    if (responseData.token) {
                        localStorage.setItem("token", responseData.token);
                        console.log(JSON.stringify(responseData.token));

                        // check if user_id is present in the decoded token
                        if (decodedToken || decodedToken.user_id) {
                            // gets the user to log in
                            alert(`Successlfully signed up! Please log in.`);
                        } else {
                            // handle the error or redirect to an error page
                            console.error('User ID not found in decoded token.');
                        }
                    }
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // performs sign up request for the endpoint of /register 
            fetchMethod(currentUrl + "/api/register", callback, "POST", data);

            // resets the form after submission
            signupForm.reset();
        } else {

            // what happens if the passwords does not match
            warningCard.classList.remove("d-none");
            warningText.innerText = "Passwords do not match";
        }
    });
});