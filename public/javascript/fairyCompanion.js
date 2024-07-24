document.addEventListener("DOMContentLoaded", function () {

    // declaring elements in the DOM 
    const fairyCompanionList = document.getElementById("fairyCompanionList");
    const singleFairyCompanionList = document.getElementById("singleFairyCompanionList");
    const updateFairyCompanionForm = document.getElementById("updateFairyCompanionForm");
    const deleteFairyCompanion = document.getElementById("deleteFairyCompanion");
    const fairyCompanionForm = document.getElementById("fairyCompanionForm");

    //////////////////////////////////////////////////////
    // GET SINGLE FAIRY COMPANION
    //////////////////////////////////////////////////////
    if (singleFairyCompanionList) {

        // creates a new url object and gets the search parameters from the url
        const url = new URL(document.URL);
        // gets the value of the search parameter
        const urlParams = url.searchParams;
        const fairy_companion_id = urlParams.get("fairy_companion_id");

        const callback = (responseStatus, responseData) => {
            // this shows the response status and data in the console when inspecting
            console.log(`Response status: ${responseStatus}`);
            console.log(`Response data: ${JSON.stringify(responseData)}`);

            // create a new element to append to singleTaskList
            const displayItem = document.createElement("div");

            if (responseStatus == 404) {
                displayItem.innerHTML = `${responseData.message}`;
            } else {
                const fairyCompanion = responseData[0];

                // accessing the data using chain operator because fairy companion data is an object inside an array 
                displayItem.innerHTML = `
                    <div class="container text-center">
                    <img src="./image/fairy.png" class="img-fluid"
                    style="width: 200px; height: 200px; border-radius: 100%; border: 3px solid #ffff; padding: 5px;"><br /><br />
                        <h3 class="card-title">${fairyCompanion?.fairy_companion_name}</h5>
                        <p class="card-text"> 
                            <strong>Fairy Companion ID:</strong> ${fairyCompanion?.fairy_companion_id}<br />
                            <strong>Hair Color:</strong>  ${fairyCompanion?.fairy_companion_hair_color}<br />
                            <strong>Eye Color:</strong> ${fairyCompanion?.fairy_companion_eye_color}<br />
                            <strong>Powers:</strong> ${fairyCompanion?.fairy_companion_powers}<br />
                        </p>
                    </div>
                `;
            }

            // append the created element to singleFairyCompanionList
            singleFairyCompanionList.appendChild(displayItem);
        };

        // the api has to be the url of the endpoint being used for callback
        fetchMethod(`${currentUrl}/api/fairy_companion/${fairy_companion_id}`, callback);
    }

    //////////////////////////////////////////////////////
    // GET ALL FAIRY COMPANIONS
    //////////////////////////////////////////////////////
    if (fairyCompanionList) {
        const callback = (responseStatus, responseData) => {

            // this shows the response status and data in the console when inspecting
            console.log(`Response status: ${responseStatus}`);
            console.log(`Response data: ${responseData}`);

            responseData.forEach((fairyCompanion) => {
                const displayItem = document.createElement("div");
                displayItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                displayItem.innerHTML = `
                    <div class="card fixed-card2">
                        <div class="card-body">
                            <h5 class="card-title">${fairyCompanion.fairy_companion_name}</h5>
                                <p class="card-text">
                                    <strong>Powers:</strong> ${fairyCompanion.fairy_companion_powers}<br />
                                </p>
                            <a href="singleFairyCompanionInfo.html?fairy_companion_id=${fairyCompanion.fairy_companion_id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
            `; // note that the href is has to be changed to the correct path
                fairyCompanionList.appendChild(displayItem);
            });
        };
        // the api has to be the url of the endpoint being used for callback
        fetchMethod(currentUrl + "/api/fairy_companion", callback);
    }

    //////////////////////////////////////////////////////
    // POST A FAIRY COMPANION
    //////////////////////////////////////////////////////
    if (fairyCompanionForm) {

        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");

        // this sets up an event listener for the submit button that provides the callback function 
        fairyCompanionForm.addEventListener("submit", function (event) {

            // this prevents the default for submission behaviour which would cause the page to reload 
            event.preventDefault();

            const fairy_companion_name = document.getElementById("fairy_companion_name").value;
            const fairy_companion_hair_color = document.getElementById("fairy_companion_hair_color").value;
            const fairy_companion_eye_color = document.getElementById("fairy_companion_eye_color").value;
            const fairy_companion_powers = document.getElementById("fairy_companion_powers").value;

            const data = {
                fairy_companion_name: fairy_companion_name,
                fairy_companion_hair_color: fairy_companion_hair_color,
                fairy_companion_eye_color: fairy_companion_eye_color,
                fairy_companion_powers: fairy_companion_powers
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                if (responseStatus == 201) {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);

                    // stores information in the local storage
                    localStorage.setItem('fairy_companion_name', fairy_companion_name);
                    localStorage.setItem('fairy_companion_hair_color', fairy_companion_hair_color);
                    localStorage.setItem('fairy_companion_eye_color', fairy_companion_eye_color);
                    localStorage.setItem('fairy_companion_powers', fairy_companion_powers);
                    window.location.href = "fairyCompanion.html";
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            }
            // performs sign up request for the endpoint of /fairy_companion
            fetchMethod(currentUrl + "/api/fairy_companion", callback, "POST", data);

            // resets the form after submission
            fairyCompanionForm.reset();
        });
    }

    //////////////////////////////////////////////////////
    // DELETE A FAIRY COMPANION
    //////////////////////////////////////////////////////
    if (deleteFairyCompanion) {
        // listens for click event on button
        deleteFairyCompanion.addEventListener("click", function () {
            let deletedFairyCompanionId = prompt("Please enter the Fairy Companion ID to be deleted: ");

            // performs delete request for the endpoint of /message 
            const callback = (responseStatus, responseData) => {
                console.log("Delete responseStatus:", responseStatus);
                console.log("Delete responseData:", responseData);

                window.location.reload(); // reloads the page after successful deletion
            };

            // checks for confirmation
            if (deletedFairyCompanionId !== null) {
                alert(`Fairy Companion ID: ${deletedFairyCompanionId} has been deleted`);
                window.location.href = "fairyCompanion.html";

                // performs delete request for the endpoint of /message 
                fetchMethod(currentUrl + `/api/fairy_companion/${deletedFairyCompanionId}`, callback, "DELETE");
            } else {
                alert(`The prompt was cancelled.`);
            }
        });
    }

    //////////////////////////////////////////////////////
    // PUT A FAIRY COMPANION
    //////////////////////////////////////////////////////
    if (updateFairyCompanionForm) {
        updateFairyCompanionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const updatedCompanionId = document.getElementById("fairy_companion_id").value;
            const updatedHairColor = document.getElementById("fairy_companion_hair_color").value;
            const updatedEyeColor = document.getElementById("fairy_companion_eye_color").value;

            const data = {
                fairy_companion_id: updatedCompanionId,
                fairy_companion_hair_color: updatedHairColor,
                fairy_companion_eye_color: updatedEyeColor
            };

            const callback = (responseStatus, responseData) => {
                console.log("Update responseStatus:", responseStatus);
                console.log("Update responseData:", responseData);

                if (responseStatus === 200) {
                    alert(`Fairy Companion ID: ${updatedCompanionId} has been updated`);
                    window.location.reload(); // reloads the page after successful update
                } else {
                    const warningCard = document.getElementById("warningCard");
                    const warningText = document.getElementById("warningText");

                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };

            // send a PUT request to update fairy companion details
            fetchMethod(currentUrl + `/api/fairy_companion/${updatedCompanionId}`, callback, "PUT", data);
        });
    }
});