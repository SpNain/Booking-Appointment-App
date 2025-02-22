let url =
  "http://localhost:3000";

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");
const idInput = document.querySelector("#idInput");

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

  
  let userDetailsObj = {
    userName: `${nameInput.value}`,
    userEmail: `${emailInput.value}`,
    userPhone: `${phoneInput.value}`,
    userDate: `${dateInput.value}`
  };
  
  if (
    userDetailsObj.userName == "" ||
    userDetailsObj.userPhone == "" ||
    userDetailsObj.userEmail == "" ||
    userDetailsObj.userDate == ""
  ) {
    alert(`Fill all the details`);
  } else {
    
    if (idInput.value == '') {
      addUser(userDetailsObj);
    }
    else {
      addEditedUser(userDetailsObj, idInput.value);
    }

  }

  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  dateInput.value = "";
}

async function addUser(userDetailsObj) {
    try {
      let response = await axios.post(`${url}/user/form`, userDetailsObj);
      displayUserOnScreen(response.data);
    } catch (error) {
      alert(`${userDetailsObj.userEmail} already exists. Try another Email.`);
      console.log(error);
    }
}

async function deleteUser(id) {

  try {
    await axios.delete(`${url}/user/appointment/delete/${id}`);
    document.getElementById(`${id}`).remove();
  } catch (error) {
    console.log(error);
  }
}

function editUser(userName, userEmail, userPhone, userDate, id) {

  nameInput.value = userName;
  emailInput.value = userEmail;
  phoneInput.value = userPhone;
  dateInput.value = userDate;
  idInput.value = id;

  document.getElementById(`${id}`).style.display = "none";

}

async function addEditedUser(userDetailsObj, id) {

  idInput.value = ""; // kyunki ye apne aap nhi htegi aur fir ek baar kisi user ko edit kr diya to fir aage whi user edit hota rhega jb bhi hum nya user add krne ki kosish krenge

  try {
    let response = await axios.put(`${url}/user/appointment/edit/${id}`,userDetailsObj);
    // console.log(response);
    
    document.getElementById(`${id}`).style.display = "block";
    
    document.getElementById(`${id}`).innerHTML =
    `<div>
    <h5> ${response.data.userName} </h5>
    <h6> Email : ${response.data.userEmail} </h6>
    <h6> Phone Number : ${response.data.userPhone} </h6>
    <h6> Date : ${response.data.userDate} </h6>
    </div>
    <div class ="d-flex justify-content-end">
    <button class="btn btn-danger m-2 p-2" onclick="deleteUser(${response.data.id})">X</button>
    <button class="btn btn-primary m-2 p-2" onclick="editUser('${response.data.userName}', '${response.data.userEmail}', '${response.data.userPhone}', '${response.data.userDate}', '${response.data.id}')">Edit</button>
    </div>`;
  }
  catch (error) {
    document.getElementById(`${id}`).style.display = "block";
    alert(`${userDetailsObj.userEmail} already exists. Try another Email.`);
    console.log(error);
  }
  
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
  <button class="btn btn-primary m-2 p-2" onclick="editUser('${userDetailsObj.userName}', '${userDetailsObj.userEmail}', '${userDetailsObj.userPhone}', '${userDetailsObj.userDate}', '${userDetailsObj.id}')">Edit</button>
  </div>
  </div>`;
}


/*
Explanation:
Pichle aur iss version me maine kuch changes kre hai
sbse pahle to routes change kre h
controller me data json me bheja h sb fxn me aur sb fxns me error ka structure same kra h

Aur edit ki functionality add kri h bdia trike se put ka use krke
Humne ek hidden input bnaya h jisme hum edit pe click krne pe wo hidden input me id daal dete h
aur saath me apne div ki display none kr dete h
aur jb fir form submit hota h to id aayi h ya nhi uske basis pe user ko identify krte h ki nya user add ho rha h ya edited
agr nya h to addUser fxn chala dete h nhi to addEditedUser fxn chla deta h jisme hum put ka use krke db me update kr dete h
aur card ki display ko firse block kr dete h
aur agr by chance user form me already existed email daal deta h update ke time to us case ko bhi humne handle kr rkha h
*/