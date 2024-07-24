//////////////////////////////////////////////////////
// FETCH METHOD  
// USED TO FETCH THE API TO MAKE A REQ TO THE SERVER
//////////////////////////////////////////////////////
function fetchMethod(url, callback, method = "GET", data = null, token = null) {

  // fetches the API in order to make http requests
  console.log("fetchMethod: ", url, method, data, token);

  const headers = {};

  // it takes the url callback function to send in the request body
  if (data) {
    headers["Content-Type"] = "application/json";
  }

  // the headers are based on the presence of data and token
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  let options = {
    method: method.toUpperCase(),
    headers: headers,
  };

  if (method.toUpperCase() !== "GET" && data !== null) {
    options.body = JSON.stringify(data);
  }

  // makes the fetch request and handles the response 
  fetch(url, options)
    .then((response) => {
      if (response.status == 204) {
        callback(response.status, {});
      } else {
        response.json().then((responseData) => callback(response.status, responseData));
      }
    })
    .catch((error) => console.error(`Error from ${method} ${url}:`, error));
}