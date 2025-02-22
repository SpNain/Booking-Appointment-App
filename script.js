// Yhape mai iss app ko nya look de rha hu bas aur kuch nhi aur bas thode bhut naam change kre h fxns objects ke baaki logic to same hi h

// Aur isme hum sirf user ko local storage se htake crud crud pe save krne ka code change kr rhe h logic wise
// aur ui pe save krne wala code ka logic same h but thoda sa code me change h

let url =
  "https://crudcrud.com/api/b2c7063c92094b77b75d62cd577e0ec9/bookingsData";

// get all inputs - agr mai inko naa bhi nikalu to bhi sidha nameInput ki jgaha name use krunga to muje name ke input ki value mil jaayegi due to label
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");

// on form submission onSubmit fxn will run
const bookingForm = document.querySelector("#bookingForm");
bookingForm.addEventListener("submit", onSubmit);

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
    userPhone: `${phoneInput.value}`, // have to rename form "Phone Number" to "userPhone" because apis isn't working with previous one
    userDate: `${dateInput.value}`
  };

  if (userDetailsObj.userName == "" || userDetailsObj.userPhone == "") {
    alert(`Fill all the details`);
  } else if (localStorage.getItem(userDetailsObj.userEmail)) {
    alert(`${userDetailsObj.Email} already exists. Try another Email.`);
  } else {
    // instead of local storage now we add detailsObj in crud-crud database using axios
    axios
      .post(url, userDetailsObj)
      .then((response) => displayUserOnScreen(response.data))
      .catch((error) => console.log(error));
  }
}

function displayUserOnScreen(userDetailsObj) {
  document.querySelector(".detailsObjectsDiv").innerHTML +=
        `<div class="card"  id=${userDetailsObj.userEmail}>
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

function deleteDetailsCard(event) {
  localStorage.removeItem(event.target.parentNode.parentNode.id);
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
