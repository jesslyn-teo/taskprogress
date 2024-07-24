document.addEventListener("DOMContentLoaded", function () {

    // declaring elements in the DOM
    const profileUserList = document.getElementById("profileUserList");
    const profileTaskProgressList = document.getElementById('profileTaskProgressList');
    const profileUserUpdateForm = document.getElementById("profileUserUpdateForm");
    const profileDeleteUser = document.getElementById("profileDeleteUser");

    //////////////////////////////////////////////////////
    // GET USER BY ID 
    //////////////////////////////////////////////////////
    if (profileUserList) {
        const displayUserCard = (responseData) => {
            const userCard = document.createElement('div');
            userCard.className = 'card user-card';

            userCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${responseData.username}</h5>
                    <p class="card-text">
                        <strong>User ID:</strong> ${responseData.user_id}<br />
                        <strong>Email:</strong> ${responseData.email}<br />
                        <strong>Total Points:</strong> ${responseData.total_points}
                    </p>
                </div>
            `;

            localStorage.setItem("user_id", responseData.user_id);

            profileUserList.appendChild(userCard);
        };

        // displays an error message if user data is not found
        const displayError = () => {
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'User not found. Please try logging in again or re-register. Thank you!';
            profileUserList.appendChild(errorMessage);
        };

        const callback = (responseStatus, responseData) => {
            if (responseStatus === 404) {
                displayError();
            } else if (typeof responseData === 'object') {
                displayUserCard(responseData);
            } else {
                console.error("Unexpected responseData format:", responseData);
            }
        };

        // fetch user data by ID
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('JWT token not found.');
        }
        const decodedToken = jwt_decode(token);
        const user_id = decodedToken.user_id;
        fetchMethod(currentUrl + `/api/users/${user_id}`, callback);
    }

    //////////////////////////////////////////////////////
    // GET TASK PROGRESS BY USER ID 
    //////////////////////////////////////////////////////
    if (profileTaskProgressList) {
        const displayTaskProgressCards = (responseData) => {
            responseData.forEach((taskProgressData) => {
                // creates a new HTML element for each task progress
                const taskProgressCard = document.createElement('div');
                taskProgressCard.className = 'card task-progress-card';
    
                // sets the HTML content for the task progress card
                taskProgressCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${taskProgressData.notes}</h5>
                        <p class="card-text">
                            <strong>Progress ID:</strong> ${taskProgressData.progress_id}<br />
                            <strong>User ID:</strong> ${taskProgressData.user_id}<br />
                            <strong>Task ID:</strong> ${taskProgressData.task_id}<br />
                            <strong>Completion Date:</strong> ${taskProgressData.completion_date}
                        </p>
                    </div>
                `;
                
                // appends the created task progress card to the parent element
                profileTaskProgressList.appendChild(taskProgressCard);
            });
        };
    
        // displays an error message if task progress data is not found
        const displayTaskProgressError = () => {
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Task progress not found.';
            profileTaskProgressList.appendChild(errorMessage);
        };
    
        const taskProgressCallback = (responseStatus, responseData) => {
            console.log("Response Data:", responseData);
    
            if (responseStatus === 404) {
                displayTaskProgressError();
            } else if (Array.isArray(responseData) && responseData.length > 0) { // display task progress cards if data is found
                displayTaskProgressCards(responseData);
            } else {
                console.error("Unexpected responseData format:", responseData);
            }
        };
    
        // fetch task progress data by user ID
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('JWT token not found.');
        }
        const decodedToken = jwt_decode(token);
        const user_id = decodedToken.user_id;
        fetchMethod(currentUrl + `/api/task_progress/user/${user_id}`, taskProgressCallback);
    }
    
    //////////////////////////////////////////////////////
    // PUT USER BY ID 
    //////////////////////////////////////////////////////
    if (profileUserUpdateForm) {
        profileUserUpdateForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found.');
            }
            const decodedToken = jwt_decode(token);
            const user_id = decodedToken.user_id;

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const data = {
                user_id: user_id,
                username: username,
                email: email,
                password: password
            };

            const callback = (responseStatus, responseData) => {
                console.log("Update responseStatus:", responseStatus);
                console.log("Update responseData:", responseData);

                if (responseStatus === 200) {
                    alert(`User ID: ${user_id} has been updated`);
                    window.location.reload(); // reloads the page after successful update
                } else {
                    const warningCard = document.getElementById("warningCard");
                    const warningText = document.getElementById("warningText");

                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // send a PUT request to update user details
            fetchMethod(currentUrl + `/api/users/${user_id}`, callback, "PUT", data);
        });
    }

    //////////////////////////////////////////////////////
    // DELETE USER BY ID 
    //////////////////////////////////////////////////////
    function deleteUser(user_id) {
        if (confirm("Are you sure you want to delete this user?")) {
            fetch(currentUrl + `/api/users/${user_id}`, {
                method: "DELETE",
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error deleting user: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(() => {
                    console.log('User deleted successfully');
                    window.location.reload(); // reloads the page after successful deletion
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    if (profileDeleteUser) {
        profileDeleteUser.addEventListener("click", function (event) {
            event.preventDefault();

            const token = localStorage.getItem('token');
            if (!token) {
                console.error('JWT token not found.');
            }
            const decodedToken = jwt_decode(token);
            const user_id = decodedToken.user_id;

            const callback = (responseStatus, responseData) => {
                console.log("Delete responseStatus:", responseStatus);
                console.log("Delete responseData:", responseData);

                if (responseStatus === 200) {
                    alert(`User ID: ${user_id} has been deleted`);
                    window.location.reload(); // reloads the page after successful deletion
                } else {
                    console.error(`Error deleting user: ${responseData.message}`);
                }
            };

            deleteUser(user_id);
            window.location.reload(); // reloads the page after successful deletion
        });
    }
});