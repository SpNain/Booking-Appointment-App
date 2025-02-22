let url =
  "https://crudcrud.com/api/7d4495d6552f4027b1edb59332254d77/bookingsData";
let responseData = [];

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");

const bookingForm = document.querySelector("#bookingForm");
bookingForm.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", refresh);

async function refresh() {
  try {
    let response = await axios.get(url);
    for (let i = 0; i < response.data.length; i++) {
      // console.log(response.data[i]);
      updateResponseData("getORpost", response.data[i]);
      displayUserOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

function onSubmit(event) {
  event.preventDefault();

  addDetailsCard(event);

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  dateInput.value = "";
}

async function addDetailsCard(event) {
  let userDetailsObj = {
    userName: `${nameInput.value}`,
    userEmail: `${emailInput.value}`,
    userPhone: `${phoneInput.value}`,
    userDate: `${dateInput.value}`,
    uniqueKey: `${new Date().getTime()}`,
  };

  if (
    userDetailsObj.userName == "" ||
    userDetailsObj.userPhone == "" ||
    userDetailsObj.userEmail == ""
  ) {
    alert(`Fill all the details`);
  } else {
    try {
      let response = await axios.post(url, userDetailsObj);
      // console.log(response.data);
      updateResponseData("getORpost", response.data);
      displayUserOnScreen(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

async function deleteDetailsCard(event) {
  let targetObj = getTargetObj(event.target.parentNode.parentNode);
  // console.log(targetObj._id);

  try {
    let response = await axios.delete(`${url}/${targetObj._id}`);
    updateResponseData("delete", targetObj);
    event.target.parentNode.parentNode.remove();
  } catch (error) {
    console.log(error);
  }
}

function editDetailsCard(event) {
  let targetObj = getTargetObj(event.target.parentNode.parentNode);

  document.getElementById(
    `${targetObj.uniqueKey}`
  ).innerHTML = `<form action="#" class="w-75 mx-auto" id="editBookingForm">
  <!-- Name -->
  <div class="col mb-3">
  <label for="editName" class="col-form-label">Name</label>
  <input type="text" class="form-control" name="editName" id="editName" value=${targetObj.userName}>
  </div>
  
  <!-- Email -->
  <div class="col mb-3">
  <label for="editEmail" class="col-form-label">Email</label>
  <input type="email" class="form-control" name="editEmail" id="editEmail" required value=${targetObj.userEmail}>
  </div>
  
  <!-- Phone Number -->
  <div class="col mb-3">
  <label for="editPhone" class="col-form-label">Phone Number</label>
  <input type="number" class="form-control" name="editPhone" id="editPhone" value=${targetObj.userPhone}>
  </div>
  
  <!-- Date -->
  <div class="col mb-3">
  <label for="editDate" class="col-form-label">Date</label>
  <input type="date" class="form-control" name="editDate" id="editDate" value=${targetObj.userDate}>
  </div>
  
  <!-- Submit Button -->
  <div class="col mt-4 mb-2">
    <div class="col-12 d-flex justify-content-center">
    <input type="submit" class="form-control button d-flex justify-content-center bg-success" id="submit" value="Done">
    </div>
    </div>
    </form>`;

  const editBookingForm = document.querySelector("#editBookingForm");
  editBookingForm.addEventListener("submit", addEditedCard);
}

async function addEditedCard(event) {
  event.preventDefault();

  let targetObj = getTargetObj(event.target.parentNode);

  let editedUserObj = {
    userName: event.target.editName.value,
    userEmail: event.target.editEmail.value,
    userPhone: event.target.editPhone.value,
    userDate: event.target.editDate.value,
    uniqueKey: targetObj.uniqueKey,
  };

  try {
    let response = await axios.put(`${url}/${targetObj._id}`, editedUserObj);
    // console.log(response.data);
    updateResponseData("put", editedUserObj);

    document.getElementById(`${targetObj.uniqueKey}`).innerHTML = `<div>
      <h5> ${editedUserObj.userName} </h5>
      <h6> Email : ${editedUserObj.userEmail} </h6>
      <h6> Phone Number : ${editedUserObj.userPhone} </h6>
      <h6> Date : ${editedUserObj.userDate} </h6>
    </div>
    <div class ="d-flex justify-content-end">
      <button class="btn btn-danger m-2 p-2" onclick="deleteDetailsCard(event)">X</button>
      <button class="btn btn-primary m-2 p-2" onclick="editDetailsCard(event)">Edit</button>
    </div>`;
  } catch (error) {
    console.log(error);
  }
}

function displayUserOnScreen(userDetailsObj) {
  document.querySelector(
    ".detailsObjectsDiv"
  ).innerHTML += `<div class="card"  id=${userDetailsObj.uniqueKey}>
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
}

function updateResponseData(requestType, paramObj) {
  if (requestType == "getORpost") {
    responseData.push(paramObj);
    // console.log(responseData);
  } else if (requestType == "delete") {
    responseData = responseData.filter((ele) => ele._id != paramObj._id);
    // console.log(responseData);
  } else if (requestType == "put") {
    for (let i = 0; i < responseData.length; i++) {
      if (responseData[i].uniqueKey == paramObj.uniqueKey) {
        responseData[i].userName = paramObj.userName;
        responseData[i].userEmail = paramObj.userEmail;
        responseData[i].userPhone = paramObj.userPhone;
        responseData[i].userDate = paramObj.userDate;
        // console.log(responseData);
        break;
      }
    }
  }
}

function getTargetObj(element) {
  for (let i = 0; i < responseData.length; i++) {
    if (responseData[i].uniqueKey == element.id) return responseData[i];
  }
}
