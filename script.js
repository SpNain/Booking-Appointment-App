let url =
  "https://crudcrud.com/api/b2c7063c92094b77b75d62cd577e0ec9/bookingsData";
let responseData = [];

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");

const bookingForm = document.querySelector("#bookingForm");
bookingForm.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(url)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        // console.log(response.data[i]);
        displayUserOnScreen(response.data[i]);
      }
    })
    .catch((error) => console.log(error));
});

function onSubmit(event) {
  event.preventDefault();

  addDetailsCard(event);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  dateInput.value = "";
}

function addDetailsCard(event) {
  let userDetailsObj = {
    userName: `${nameInput.value}`,
    userEmail: `${emailInput.value}`,
    userPhone: `${phoneInput.value}`,
    userDate: `${dateInput.value}`,
  };

  if (userDetailsObj.userName == "" || userDetailsObj.userPhone == "") {
    alert(`Fill all the details`);
  } else if (isEmailExist(userDetailsObj)) {
    alert(`${userDetailsObj.userEmail} already exists. Try another Email.`);
  } else {
    axios
      .post(url, userDetailsObj)
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  }
}

function displayUserOnScreen(userDetailsObj) {
  document.querySelector(
    ".detailsObjectsDiv"
  ).innerHTML += `<div class="card"  id=${userDetailsObj.userEmail}>
            <div>
                <h5> ${userDetailsObj.userName} </h5>
                <h6> Email : ${userDetailsObj.userEmail} </h6>
                <h6> Phone Number : ${userDetailsObj.userPhone} </h6>
                <h6> Date : ${userDetailsObj.userDate} </h6>
            </div>
            <div class ="d-flex justify-content-end">
                <button class="btn btn-danger m-2 p-2" onclick="deleteDetailsCard(event)">X</button>
                <button class="btn btn-primary m-2 p-2" onclick="editDetailsCard(event)">Edit</button>
            </div>
        </div>`;

  updateResponseData(userDetailsObj);
}

function updateResponseData(userDetailsObj, targetId) {
  if (userDetailsObj) {
    responseData.push(userDetailsObj);
    console.log(responseData);
  } else {
    responseData = responseData.filter(
      (userDetailsObj) => userDetailsObj._id != targetId
    );
    console.log(responseData);
  }
}

function isEmailExist(userDetailsObj) {
  for (let i = 0; i < responseData.length; i++) {
    if (responseData[i].userEmail == userDetailsObj.userEmail) return true;
  }
  return false;
}

function deleteDetailsCard(event) {
  // from crudcrud
  let targetId = "";

  for (let i = 0; i < responseData.length; i++) {
    if (responseData[i].userEmail == event.target.parentNode.parentNode.id) {
      targetId = responseData[i]._id;
      console.log(targetId);
    }
  }

  axios
    .delete(`${url}/${targetId}`)
    .then((response) => {
      console.log(response);
      updateResponseData(null, targetId); // responseData me se jo object abhi delete kra h usko nikal denge
    })
    .catch((error) => console.log(error));

  // from UI
  event.target.parentNode.parentNode.remove();
}

function editDetailsCard(event) {
  let userDetailsObj = JSON.parse(
    localStorage.getItem(event.target.parentNode.parentNode.id)
  );

  nameInput.value = userDetailsObj.userName;
  emailInput.value = userDetailsObj.userEmail;
  phoneInput.value = userDetailsObj.userPhone;
  dateInput.value = userDetailsObj.userDate;

  deleteDetailsCard(event);
}
