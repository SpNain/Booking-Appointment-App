let url =
  "https://crudcrud.com/api/7d4495d6552f4027b1edb59332254d77/bookingsData";
let responseData = [];

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const dateInput = document.querySelector("#date");

const bookingForm = document.querySelector("#bookingForm");
bookingForm.addEventListener("submit", onSubmit);

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(url) // crud crud se data get kra
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        // console.log(response.data[i]);
        updateResponseData("getORpost", response.data[i]); // data update krdo
        displayUserOnScreen(response.data[i]); // ui pe update krdo
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
    uniqueKey: `${new Date().getTime()}`, // creating a new key value pair so that in all similar type of project like expense tracker & seller admin panel there is a similarity in syntax throughtout the code
  };

  // as i removed the userEmail from uniqueKey so there is not point to keep checking that same email exists or not
  // i mean i can check but then i have to adjust all the future code accordingly which will take time so i think its best to just remove that functionality
  if (userDetailsObj.userName == "" || userDetailsObj.userPhone == "" || userDetailsObj.userEmail == "") {
    alert(`Fill all the details`);
  } else {
    axios
      .post(url, userDetailsObj) // crud crud pe add krdo
      .then((response) => {
        // console.log(response.data);
        updateResponseData("getORpost", response.data); // #1 - data update krdo
        displayUserOnScreen(response.data); // ui pe add krdo
      })
      .catch((error) => console.log(error));
  }
}

function deleteDetailsCard(event) {

  let targetObj = getTargetObj(event.target.parentNode.parentNode);
  // console.log(targetObj._id);

  axios
    .delete(`${url}/${targetObj._id}`) // crud crud se delete krdo
    .then((response) => {
      // console.log(response.data);
      updateResponseData("delete", targetObj); // data update krdo
      event.target.parentNode.parentNode.remove(); // ui se delete krdo
    })
    .catch((error) => console.log(error));
}

function editDetailsCard(event) {
  let targetObj = getTargetObj(event.target.parentNode.parentNode);


  // rather than refilling the details in main form we create another form within card. which looks same as of main form but with just updated edit word everywhere
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

  // after filling details when we submit the form cb fxn will run due to following code
  const editBookingForm = document.querySelector("#editBookingForm");
  editBookingForm.addEventListener("submit", addEditedCard);
}

function addEditedCard(event) {

  event.preventDefault();

  // get object jisko update krna h
  let targetObj = getTargetObj(event.target.parentNode);

  // updated object banao
  let editedUserObj = {
    userName: event.target.editName.value,
    userEmail: event.target.editEmail.value,
    userPhone: event.target.editPhone.value,
    userDate: event.target.editDate.value,
    uniqueKey: targetObj.uniqueKey,
    // hmari uniqueKey to hmesha same hi rhegi kisi ek particular obj ke liye
    // but kyunki put ke time pe hume jo chije update nhi bhi krni hoti unhe bhi same to same bhejna pdta h to isiliye iss obj me uniqueKey ko add krna pdega hume
  };

    axios
      .put(`${url}/${targetObj._id}`, editedUserObj) // crud crud pe update krdo
      .then((response) => {
        // console.log(response.data);
        updateResponseData("put", editedUserObj); // data update krdo

        // ui pe update krdo
    document.getElementById(`${targetObj.uniqueKey}`).innerHTML =
    `<div>
      <h5> ${editedUserObj.userName} </h5>
      <h6> Email : ${editedUserObj.userEmail} </h6>
      <h6> Phone Number : ${editedUserObj.userPhone} </h6>
      <h6> Date : ${editedUserObj.userDate} </h6>
    </div>
    <div class ="d-flex justify-content-end">
      <button class="btn btn-danger m-2 p-2" onclick="deleteDetailsCard(event)">X</button>
      <button class="btn btn-primary m-2 p-2" onclick="editDetailsCard(event)">Edit</button>
    </div>`;
      })
      .catch((error) => console.log(error));
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
    // nya user add hua h use add kdo
    responseData.push(paramObj);
    // console.log(responseData);
  }
  else if (requestType == "delete") {
    // user delete hua h to use nikal to array me se
    responseData = responseData.filter((ele) => ele._id != paramObj._id);
    // console.log(responseData);
  }
  else if (requestType == "put") {
    // user ko update kra h to use dund ke(using uniqueKey because _id didn't exist in paramObj in case of put request) uski details ko update krdo
    for (let i = 0; i < responseData.length; i++) {
      if (responseData[i].uniqueKey == paramObj.uniqueKey) {
        // this is our target object which we need to update
        responseData[i].userName = paramObj.userName;
        responseData[i].userEmail = paramObj.userEmail;
        responseData[i].userPhone = paramObj.userPhone;
        responseData[i].userDate = paramObj.userDate;
        // unique key to same hi h to use update krne ki jrurat nhi h yhape
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

/*
#1.
jb bhi hum axios se crud crud pe 
get ki request lgate h to hume response.data me array milta h jisme objs hote h
post ki request lgate h to response.data me jo object post kra h wo milta h with addtion key:value pair jo crud crud genrate krta h _id ke naam se
delete aur put ki request pe response milta h but respone.data me empty string hoti h matlab kuch nhi milta

Isiliye jb mai post ke time responseData me khud se userDetailsObj push krta hu to usme _id wali key nhi hoti h to jisse hmare delete aur edit button kaam nhi krte kyunki inme humne _id ki jrurat pdti h
but agr maine page refresh kr diya to fir get ki request lgti h dom load hone pe aur jisse responseData array me objects dobara se push hote h aur wo objects aate h response.data me
ab isse hota ye h ki ab saare objects ke pass _id key ho jaati h aur sbpe delete aur edit button kaam krne lg jaate h

to ab mere pass do option the yato mai jb post kru to jo fxn dom load hone pe chal rha h use call kr deta
ya fir userDetails obj ki bjaye response.data(joki userDetailsObj hi h with _id) ko pass kr deta
so i went with latter one.
*/

/*
So basically get ke time pe hume data sirf ui pe update krna hota h aur post,delete and put ke case me data hume ui pe aur backend pe dono jgah update krna hota h joki hum har ek request pe kr bhi rhe h
Aur kyunki hum data ko yahpe store kr rhe h baar baar use krne ke liye to hume har ek call pe use update krna pdega
*/