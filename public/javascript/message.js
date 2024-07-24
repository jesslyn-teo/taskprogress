document.addEventListener("DOMContentLoaded", function () {

    // declaring elements in the DOM
    const messagesList = document.getElementById("messagesList");
    const deleteMessage = document.getElementById("deleteMessage");
    const messageForm = document.getElementById("messageForm");
    const editMessage = document.getElementById("editMessage");

    //////////////////////////////////////////////////////
    // GET ALL MESSAGES
    //////////////////////////////////////////////////////
    if (messagesList) {
        const callback = (responseStatus, responseData) => {

            // this shows the response status and data in the console when inspecting
            console.log(`Response status: ${responseStatus}`);
            console.log(`Response data: ${responseData}`);

            responseData.forEach((messages) => {
                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${messages.id}</h5>
                            <p class="card-text">
                                ${messages.message_text}<br />
                                Made by: ${messages.user_id}<br />
                                Created on: ${messages.created_at}<br />
                            </p>          
                    </div>
                </div>
            `; // note that the href is has to be changed to the correct path
                messagesList.appendChild(displayItem);
            });
        };

        // the api has to be the url of the endpoint being used for callback
        fetchMethod(currentUrl + "/api/message", callback);

    }

    //////////////////////////////////////////////////////
    // DELETE A MESSAGE
    //////////////////////////////////////////////////////
    if (deleteMessage) {

        // listens for click event on button
        deleteMessage.addEventListener("click", function () {
            let deletedMessageId = prompt("Please enter the Message ID to be deleted: ");

            // performs delete request for the endpoint of /message 
            const callback = (responseStatus, responseData) => {
                console.log("Delete responseStatus:", responseStatus);
                console.log("Delete responseData:", responseData);

                window.location.reload(); // reloads the page after successful deletion
            };

            // checks for confirmation
            if (deletedMessageId !== null) {
                alert(`The chosen deleted ID was ${deletedMessageId}`);
                window.location.href = "index.html";

                // performs delete request for the endpoint of /message 
                fetchMethod(currentUrl + `/api/message/${deletedMessageId}`, callback, "DELETE");
            } else {
                alert(`The prompt was cancelled.`);
            }
        });

    }

    //////////////////////////////////////////////////////
    // POST A MESSAGE
    //////////////////////////////////////////////////////
    if (messageForm) {

        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        // this sets up an event listener for the submit button that provides the callback function 
        messageForm.addEventListener("submit", function (event) {

            // this prevents the default for submission behaviour which would cause the page to reload 
            event.preventDefault();

            const user_id = document.getElementById("user_id").value;
            const message_text = document.getElementById("message_text").value;

            const data = {
                user_id: user_id,
                message_text: message_text
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus == 201) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);

                    // stores information in the local storage
                    localStorage.setItem('user_id', user_id);
                    localStorage.setItem('message_text', message_text);
                    window.location.href = "message.html";

                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            }
            // performs sign up request for the endpoint of /message 
            fetchMethod(currentUrl + "/api/message", callback, "POST", data);

            // resets the form after submission
            messageForm.reset();
        });
    }

    //////////////////////////////////////////////////////
    // EDIT A MESSAGE
    //////////////////////////////////////////////////////
    if (editMessage) {

        // listens for click event on button
        editMessage.addEventListener("click", function () {
            let editMessageInput = prompt(`Please enter the Message ID & New Message in this format \n(e.g., 1|New message): `);

            if (editMessageInput !== null) {
                // splits the input into two parts
                const [editMessageId, newMessage] = editMessageInput.split('|');

                const data = {
                    message_text: newMessage,
                    user_id: localStorage.getItem('user_id')
                };

                if (editMessageId && newMessage) {
                    alert(`You chose to edit Message ID: ${editMessageId} with the new message: ${newMessage}`);
                    // performs edit request for the endpoint of /message
                    const callback = (responseStatus, responseData) => {
                        console.log("Edit responseStatus:", responseStatus);
                        console.log("Edit responseData:", responseData);

                        window.location.reload(); // reloads the page after successful deletion
                    };

                    fetchMethod(currentUrl + `/api/message/${editMessageId}`, callback, "PUT", data);
                } else {
                    alert(`Invalid input format. Please enter both Message ID and New Message separated by a comma.`);
                }
            } else {
                alert(`The prompt was cancelled.`);
            }
        });

    }
});