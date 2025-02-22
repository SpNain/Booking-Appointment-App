let url =
  "http://localhost:3000";

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");

const bookingForm = document.querySelector("#bookingForm");
bookingForm.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", refresh);

async function refresh() {
  try {
    let response = await axios.get(`${url}/user/allappointments`);
    // console.log(response.data);
    for (let i = 0; i < response.data.length; i++) {
      displayUserOnScreen(response.data[i]);
    }
  } catch (error) {
    console.log(error);
  }
}

function onSubmit(event) {
  event.preventDefault();

  addUser();

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  dateInput.value = "";
}

async function addUser() {
  console.log("addUser run")
  let userDetailsObj = {
    userName: `${nameInput.value}`,
    userEmail: `${emailInput.value}`,
    userPhone: `${phoneInput.value}`,
    userDate: `${dateInput.value}`
  };
  console.log(userDetailsObj);
  
  if (
    userDetailsObj.userName == "" ||
    userDetailsObj.userPhone == "" ||
    userDetailsObj.userEmail == "" ||
    userDetailsObj.userDate == ""
  ) {
    alert(`Fill all the details`);
  } else {
    try {
      console.log(userDetailsObj);
      let response = await axios.post(`${url}/user/appointments`, userDetailsObj);
      console.log(response.data);
      if(response.data == 'Duplicate Entry'){
        alert(`${userDetailsObj.userEmail} already exists. Try another Email.`);
      } else {
        displayUserOnScreen(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function deleteUser(id) {

  try {
    await axios.delete(`${url}/user/appointments/delete/${id}`);
    document.getElementById(`${id}`).remove();
  } catch (error) {
    console.log(error);
  }
}

function editUser(id,userName, userEmail, userPhone, userDate) {

  nameInput.value = userName;
  emailInput.value = userEmail;
  phoneInput.value = userPhone;
  dateInput.value = userDate;

  deleteUser(id);
}

function displayUserOnScreen(userDetailsObj) {
  document.querySelector(
    ".detailsObjectsDiv"
  ).innerHTML += `<div class="card"  id=${userDetailsObj.id}>
  <div>
  <h5> ${userDetailsObj.userName} </h5>
  <h6> Email : ${userDetailsObj.userEmail} </h6>
  <h6> Phone Number : ${userDetailsObj.userPhone} </h6>
  <h6> Date : ${userDetailsObj.userDate} </h6>
  </div>
  <div class ="d-flex justify-content-end">
  <button class="btn btn-danger m-2 p-2" onclick="deleteUser(${userDetailsObj.id})">X</button>
  <button class="btn btn-primary m-2 p-2" onclick="editUser('${userDetailsObj.id}', '${userDetailsObj.userName}', '${userDetailsObj.userEmail}', '${userDetailsObj.userPhone}', '${userDetailsObj.userDate}')">Edit</button>
  </div>
  </div>`;
}


/*
Explanation:
Humne is update me crud crud ko replace krke khud ka backend use kiya hai.
Jaha pe pahle hum axios ka use krke crud crud pe request bhej rhe the, uski jagah ab humne wo saare get,post,delete,put wale kaam apne backend ka use krke kre h
Aur kyunki ab api calls ki dikkat nhi thi to maine responseData array se related code ko hta diya h aur baar baar api calls waala raasta choose kra h
kyunki responseData array hi delete ho gya h to usse related UpdateResponseData aur getTargetObj (jisme hum responseData use krte the) bhi hta diye kyunki inka koi kaam nhi rha ab


Ab aa jaate h ki humne kya kya changes kre h code me
UI to mostly same hi h bas All Bookings ki jagah All Appointments kra h
addDetailsCard, deleteDetailsCard and editDetailsCard fxn ko rename krke addUser, deleteUser and editUser kr diya h resp.
Aur pahle jo mai card ke andar hi ek mini form bna rha tha use hta diya h aur uske htne pe fir usse related addEditedCard fxn bhi delete krna pda
Waise mini form wali approach better thi kyunki usme hum put ka use kr rhe the lekin usse code thoda lamba aur complicated ho rha tha to maine jitna tasks me bola gya h utna hi krne ke liye us extra mehnat wali chij ko hta diya h
aur simple bde wale form ko re-popoulate krke aur delete fxn ka use krke edit kr rha hu

Baaki main code whi hi h bas backend change hua h
Aur pahle mai delete aur edit ke liye id getTargetObj fxn ka use krke nikal rha tha lekin ab uski jagah mai simple id ko in case of delete and saari details ko in case of edit pass kr rha hu user ka card bnate time
aur pahle card ki id unique key ko bna rha tha but abhi backend se generate hue id ko bna rha hu
ye sb mai pahle bhi kr skta tha kyunki iske liye koi api calls ki jrurat nhi h bas pahle mere dimag me nhi aaya aur ab aa gya

Baaki backend simple h dekhke smjh aa jaayega aur agr nhi aaye to web ka use kr lio yaa fir iss backend module ke previous chapters ka 
*/