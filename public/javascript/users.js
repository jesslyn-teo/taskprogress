document.addEventListener("DOMContentLoaded", function () {

    // declaring elements in the DOM
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const deleteUser = document.getElementById("deleteUser");

    //////////////////////////////////////////////////////
    // GET ALL USERS
    //////////////////////////////////////////////////////
    if (userList) {
        const callback = (responseStatus, responseData) => {

            // this shows the response status and data in the console when inspecting
            console.log(`Response status: ${responseStatus}`);
            console.log(`Response data: ${responseData}`);

            responseData.forEach((user, index) => {
                const displayItem = document.createElement("div");

                // adding the carousel items dynamically otherwise it would be an empty string
                displayItem.className = `carousel-item ${index === 0 ? 'active' : ''} text-center`;
                displayItem.innerHTML = `
                    <img src="./image/profile.png" class="img-fluid"
                        style="width: 200px; height: 200px; border-radius: 100%; border: 3px solid #ffff; padding: 5px;">
                    <h2>${user.username}</h2>
                    <p>
                        <strong>Email</strong>: ${user.email}<br />
                    </p>
                `;
                document.getElementById("userList").appendChild(displayItem);

                // adding the carousel indicators dynamically
                const indicator = document.createElement("li");
                indicator.setAttribute("data-target", "#userListCarousel");
                indicator.setAttribute("data-slide-to", index.toString());
                // if index = 0 it would be active otherwise it would be empty string
                 indicator.className = index === 0 ? 'active' : '';
                document.querySelector("#userListCarousel ol").appendChild(indicator);
            });

            // initialise the bootstrap carousel after adding items dynamically
            $('#userListCarousel').carousel();
        };

        // the api url should be updated to the correct path
        fetchMethod(currentUrl + "/api/users", callback);
    }

    //////////////////////////////////////////////////////
    // POST A USER
    //////////////////////////////////////////////////////
    if (userForm) {

        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        // this sets up an event listener for the submit button that provides the callback function 
        userForm.addEventListener("submit", function (event) {

            // this prevents the default for submission behaviour which would cause the page to reload 
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const data = {
                username: username,
                email: email,
                password: password
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus == 201) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);

                    // stores information in the local storage
                    localStorage.setItem('username', username);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    window.location.href = "user.html";
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            }
            // performs sign up request for the endpoint of /message 
            fetchMethod(currentUrl + "/api/users", callback, "POST", data);

            // resets the form after submission
            userForm.reset();
        });
    }

    //////////////////////////////////////////////////////
    // DELETE A USER
    //////////////////////////////////////////////////////
    if (deleteUser) {

        // listens for click event on button
        deleteUser.addEventListener("click", function () {
            let deletedUserId = prompt("Please enter the User ID to be deleted: ");

            // performs delete request for the endpoint of /message 
            const callback = (responseStatus, responseData) => {
                console.log("Delete responseStatus:", responseStatus);
                console.log("Delete responseData:", responseData);

                window.location.reload(); // reloads the page after successful deletion
            };

            // checks for confirmation
            if (deletedUserId !== null) {
                alert(`User ID: ${deletedUserId} has been deleted`);
                window.location.href = "user.html";

                // performs delete request for the endpoint of /message 
                fetchMethod(currentUrl + `/api/users/${deletedUserId}`, callback, "DELETE");
            } else {
                alert(`The prompt was cancelled.`);
            }
        });

    }
});