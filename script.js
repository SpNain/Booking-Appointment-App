// Task Solution
function showDetails(event) {
    event.preventDefault();

    addCard(event);

    // empty input fields
    event.target.name.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
    event.target.date.value = "";

}

function addCard(event){

    // in local storage
    let detailObj = {
        "Name" : event.target.name.value,
        "Email" : event.target.email.value,
        "Phone Number" : event.target.phone.value,
        "Date" : event.target.date.value
    };

    let uniqueKey = detailObj.Email;
    if(detailObj.Name == '' || detailObj["Phone Number"] == ''){ // emails is already required && date doesn't included
        alert(`Fill all the details`);
    }
    else if(localStorage.getItem(detailObj.Email)){
        alert(`${detailObj.Email} already exists. Try another Email.`);
    }
    else{
        localStorage.setItem(uniqueKey, JSON.stringify(detailObj));

        // on UI
        document.querySelector(".detailDiv").innerHTML += 
        `<div class="card"  id=${detailObj.Email}>
            <div class="card-body">
                <h5 class="card-title">${detailObj.Name}</h5>
                <p class="card-text">
                    <h6> Email : ${detailObj.Email} </h6>
                    <h6> Phone Number : ${detailObj['Phone Number']} </h6>
                    <button class="btn btn-danger btn-sm delete float-right" onclick="deleteCard(event)">X</button>
                    <button class="btn btn-primary btn-sm mx-2 float-right" onclick="editCard(event)">Edit</button>
                </p>
            </div>
        </div>`
    }
}

function deleteCard(event){

    // from local storage
    localStorage.removeItem(event.target.parentNode.parentNode.id);

    // from UI
    event.target.parentNode.parentNode.remove();
}

function editCard(event){

    // get object from local storage
    let detailObj = JSON.parse(localStorage.getItem(event.target.parentNode.parentNode.id));

    // set details into input fields
    document.querySelector('input[name="name"]').value = detailObj.Name;
    document.querySelector('input[name="email"]').value = detailObj.Email;
    document.querySelector('input[name="phone"]').value = detailObj["Phone Number"];
    document.querySelector('input[name="date"]').value = detailObj.Date;

    // delete from UI & local Storage
    deleteCard(event);
}