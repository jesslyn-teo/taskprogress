document.addEventListener("DOMContentLoaded", function () {

    // declaring elements in the DOM
    const taskList = document.getElementById("taskList");
    const taskForm = document.getElementById("taskForm");
    const taskUpdateForm = document.getElementById("taskUpdateForm");
    const deleteTask = document.getElementById("deleteTask");

    //////////////////////////////////////////////////////
    // GET ALL TASKS
    //////////////////////////////////////////////////////
    if (taskList) {
        const callback = (responseStatus, responseData) => {

            // this shows the response status and data in the console when inspecting
            console.log(`Response status: ${responseStatus}`);
            console.log(`Response data: ${responseData}`);

            responseData.forEach((task) => {
                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                    <div class="card fixed-card1">
                        <div class="card-body">
                            <h5 class="card-title">${task.title}</h5>
                                <p class="card-text"> 
                                    <strong>Task ID:</strong> ${task.task_id}<br />
                                    <strong>Description:</strong> ${task.description}<br />
                                    <strong>Points Awarded:</strong> ${task.points}<br />
                                </p>
                        </div>
                    </div>
            `; // note that the href is has to be changed to the correct path
                taskList.appendChild(displayItem);
            });
        };

        // the api has to be the url of the endpoint being used for callback
        fetchMethod(currentUrl + "/api/tasks", callback);
    }

    //////////////////////////////////////////////////////
    // POST A TASK
    //////////////////////////////////////////////////////
    if (taskForm) {

        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        // this sets up an event listener for the submit button that provides the callback function 
        taskForm.addEventListener("submit", function (event) {

            // this prevents the default for submission behaviour which would cause the page to reload 
            event.preventDefault();

            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const points = document.getElementById("points").value;

            const data = {
                title: title,
                description: description,
                points: points
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus == 201) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);

                    // stores information in the local storage
                    localStorage.setItem('title', title);
                    localStorage.setItem('description', description);
                    localStorage.setItem('points', points);
                    window.location.href = "task.html";
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            }
            // performs sign up request for the endpoint of /message 
            fetchMethod(currentUrl + "/api/tasks", callback, "POST", data);

            // resets the form after submission
            taskForm.reset();
        });
    }

    //////////////////////////////////////////////////////
    // DELETE A TASK
    //////////////////////////////////////////////////////
    if (deleteTask) {

        // listens for click event on button
        deleteTask.addEventListener("click", function () {
            let deletedTaskId = prompt("Please enter the Task ID to be deleted: ");

            // performs delete request for the endpoint of /message 
            const callback = (responseStatus, responseData) => {
                console.log("Delete responseStatus:", responseStatus);
                console.log("Delete responseData:", responseData);

                window.location.reload(); // reloads the page after successful deletion
            };

            // checks for confirmation
            if (deletedTaskId !== null) {
                alert(`Task ID: ${deletedTaskId} has been deleted`);
                window.location.href = "task.html";

                // performs delete request for the endpoint of /message 
                fetchMethod(currentUrl + `/api/tasks/${deletedTaskId}`, callback, "DELETE");
            } else {
                alert(`The prompt was cancelled.`);
            }
        });

    }

    //////////////////////////////////////////////////////
    // UPDATE A TASK    
    //////////////////////////////////////////////////////
    if (taskUpdateForm) {

        taskUpdateForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const updatedTaskId = document.getElementById("task_id").value;
            const updatedTitle = document.getElementById("title").value;
            const updatedDescription = document.getElementById("description").value;
            const updatedPoints = document.getElementById("points").value;

            const data = {
                task_id: updatedTaskId,
                title: updatedTitle,
                description: updatedDescription,
                points: updatedPoints
            };

            const callback = (responseStatus, responseData) => {
                console.log("Update responseStatus:", responseStatus);
                console.log("Update responseData:", responseData);

                if (responseStatus === 204) {
                    alert(`Task ID: ${updatedTaskId} has been updated`);
                    window.location.reload(); // reloads the page after successful update
                } else {
                    const warningCard = document.getElementById("warningCard");
                    const warningText = document.getElementById("warningText");

                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // send a PUT request to update task details
            fetchMethod(currentUrl + `/api/tasks/${updatedTaskId}`, callback, "PUT", data);
        });
    }
});
