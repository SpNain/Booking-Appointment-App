let url = "https://crudcrud.com/api/b2c7063c92094b77b75d62cd577e0ec9/bookingsData";

// delete aur edit ke time pe dobara se get call lgane ki bjaye mai jb DOMContentLoaded ke time call lgaunga tbhi saare objs store kr lunga taaki baar baar call na lgana pde
// ab dono ke alag alag faayde h store krne pe baar baar call nhi lgani pdegi but space use hoga
// baar baar call lgane se space use nhi hoga but data ko baar baar mangwana pdega jise api calls bdegi
let responseData = [];

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");

const bookingForm = document.querySelector("#bookingForm");
bookingForm.addEventListener("submit", onSubmit);

// DOM load hote hi saare jo jo data pahle se added hoga use get krke ui pe lga dega ye wala code
window.addEventListener("DOMContentLoaded", () => {
    axios.get(url)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                // console.log(response.data[i]);
                displayUserOnScreen(response.data[i]);
            }
        })
        .catch(error => console.log(error));
})

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
    userDate: `${dateInput.value}`
  };

  if (userDetailsObj.userName == "" || userDetailsObj.userPhone == "") {
    alert(`Fill all the details`);
  }
  else if (isEmailExist(userDetailsObj)) { // check if mail already exists or not
    alert(`${userDetailsObj.userEmail} already exists. Try another Email.`);
  }
  else {
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
    
    updateResponseData(userDetailsObj); // jaise hi new object add hoga ya pahle se added objects load honge to responsedata ko update kr denge
}

// response data ko udpate krne ke kaam h iska
function updateResponseData(userDetailsObj) {
    responseData.push(userDetailsObj);
    console.log(responseData);
}

// email dobara na aaye isiliye ye fxn bnaaya h ye check krne ke liye ki mail exist krti h ki nhi
function isEmailExist(userDetailsObj) {
    for (let i = 0; i < responseData.length; i++){
        if (responseData[i].userEmail == userDetailsObj.userEmail) return true;
    }
    return false;
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