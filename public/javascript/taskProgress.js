document.addEventListener("DOMContentLoaded", function () {

    // declaring elements in the DOM
    const taskProgressList = document.getElementById("taskProgressList");
    const singleTaskProgressList = document.getElementById("singleTaskProgressList");
    const taskProgressIdForm = document.getElementById("taskProgressIdForm");
    const taskProgressForm = document.getElementById("taskProgressForm");
    const deleteTaskProgress = document.getElementById("deleteTaskProgress");

    //////////////////////////////////////////////////////
    // GET SINGLE TASK PROGRESS
    //////////////////////////////////////////////////////
    if (taskProgressIdForm) {
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        // the form would be called using the addEventListener method
        taskProgressIdForm.addEventListener("submit", async function (event) {
            // prevents the default behaviour of the form
            event.preventDefault();

            // gets the task_progress_id from the form input
            const task_progress_id = document.getElementById("task_progress_id").value;

            const callback = (responseStatus, responseData) => {
                // this shows the response status and data in the console when inspecting
                console.log(`Response status: ${responseStatus}`);
                console.log(`Response data: ${JSON.stringify(responseData)}`);

                // creating a new element to append to singleTaskProgressList
                const displayItem = document.createElement("div");

                if (responseStatus == 404) {
                    alert(`Task Progress ID: ${task_progress_id} not found`)
                    window.location.reload();
                } else if (responseStatus == 200) {
                    displayItem.innerHTML = `
                        <div class="container">
                            <h3 class="card-title">${responseData.notes}</h5>
                            <p class="card-text"> 
                                <strong>Progress ID:</strong> ${responseData.progress_id}<br />
                                <strong>User ID:</strong> ${responseData.user_id}<br />
                                <strong>Task ID:</strong> ${responseData.task_id}<br /> 
                                <strong>Completion Date:</strong> ${responseData.completion_date}<br />
                            </p>
                        </div>
                    `;
                }

                // used to check if the element exists before appending
                if (singleTaskProgressList) {
                    // clears any existing content in singleTaskProgressList
                    singleTaskProgressList.innerHTML = "";
                    // appends the created element to singleTaskProgressList
                    singleTaskProgressList.appendChild(displayItem);
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // the api has to be the url of the endpoint being used for callback
            fetchMethod(`${currentUrl}/api/task_progress/${task_progress_id}`, callback);
        });
    }

    //////////////////////////////////////////////////////
    // GET ALL TASK PROGRESS
    //////////////////////////////////////////////////////
    if(taskProgressList) {
        const callback = (responseStatus, responseData) => {

            // this shows the response status and data in the console when inspecting
            console.log(`Response status: ${responseStatus}`);
            console.log(`Response data: ${responseData}`);

            responseData.forEach((task_progress) => {
                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                <div class="card fixed-card2">
                    <div class="card-body">
                        <h5 class="card-title">${task_progress.notes}</h5>
                            <p class="card-text"> 
                                <strong>Progress ID:</strong> ${task_progress.progress_id}<br />
                            </p>
                    </div>
                </div>
            `; // note that the href is has to be changed to the correct path
            taskProgressList.appendChild(displayItem);
            });
        };

        // the api has to be the url of the endpoint being used for callback
        fetchMethod(currentUrl + "/api/task_progress", callback);
    }

    //////////////////////////////////////////////////////
    // POST A TASK
    //////////////////////////////////////////////////////
    if (taskProgressForm) {

        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        // this sets up an event listener for the submit button that provides the callback function 
        taskProgressForm.addEventListener("submit", function (event) {

            // this prevents the default for submission behaviour which would cause the page to reload 
            event.preventDefault();

            const user_id = document.getElementById("user_id").value;
            const task_id = document.getElementById("task_id").value;
            const completion_date = document.getElementById("completion_date").value;
            const notes = document.getElementById("notes").value;

            const data = {
                user_id: user_id,
                task_id: task_id,
                completion_date: completion_date,
                notes: notes
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus == 201) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);

                    // stores information in the local storage
                    localStorage.setItem('user_id', user_id);
                    localStorage.setItem('task_id', task_id);
                    localStorage.setItem('completion_date', completion_date);
                    localStorage.setItem('notes', notes);
                    window.location.href = "taskProgress.html";
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            }
            // performs sign up request for the endpoint of /message 
            fetchMethod(currentUrl + "/api/task_progress", callback, "POST", data);

            // resets the form after submission
            taskProgressForm.reset();
        });
    }

    //////////////////////////////////////////////////////
    // DELETE A TASK
    //////////////////////////////////////////////////////
    if (deleteTaskProgress) {

        // listens for click event on button
        deleteTaskProgress.addEventListener("click", function () {
            let deletedTaskProgressId = prompt("Please enter the Task Progress ID to be deleted: ");

            // performs delete request for the endpoint of /message 
            const callback = (responseStatus, responseData) => {
                console.log("Delete responseStatus:", responseStatus);
                console.log("Delete responseData:", responseData);

                window.location.reload(); // reloads the page after successful deletion
            };

            // checks for confirmation
            if (deletedTaskProgressId !== null) {
                alert(`Task Progress ID: ${deletedTaskProgressId} has been deleted`);
                window.location.reload(); // reloads the page after successful deletion

                // performs delete request for the endpoint of /message 
                fetchMethod(currentUrl + `/api/task_progress/${deletedTaskProgressId}`, callback, "DELETE");
            } else {
                alert(`The prompt was cancelled.`);
            }
        });

    }
});
