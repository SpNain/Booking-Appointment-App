const fs = require('fs').promises;
const userDetails = require('../models/userDetails');

exports.getFormPage = async(request,response,next)=>{
    try{
        response.sendFile('index.html',{root:'views/user'})
    }catch(err){
        console.log("error in getting form page", err);
    }
}

exports.addUserDetails = async(request,response,next)=>{
    try {
        const { userName, userEmail, userPhone, userDate} = request.body;
        let userDetailsObj = await userDetails.create({
            userName:userName,
            userEmail:userEmail,
            userPhone:userPhone,
            userDate:userDate
        })
        response.send(userDetailsObj);

    }catch(err){
        console.log("Error while adding the details of a new User",err);
        response.send('Duplicate Entry');
    }
}

exports.getAllAppointments = async(request,response,next)=>{
    try{
        const data = await userDetails.findAll();
        response.send(data);

    }catch(err){
        console.log("Error while fetching all users Details",err);
    }

}

exports.deleteUserDetails = async(request,response,next)=>{ 
    const id = request.params.id;
    console.log(id);
    try{
        await userDetails.destroy({
            where:{
                id : id
            }
        })
        response.send('User Details Deleted Successfully');
    }catch(err){
        console.log("Error while deleting user Details with id : ",id,err)
    }
}

exports.editUserDetails = async (request, response, next) => {
    const id = request.params.id;
    try {
        const userDetailsObj = await userDetails.findByPk(id);
        userDetailsObj.userName = request.body.userName;
        userDetailsObj.userEmail = request.body.userEmail;
        userDetailsObj.userPhone = request.body.userPhone;
        userDetailsObj.userDate = request.body.userDate;
        await userDetailsObj.save();
        response.end();
    } catch (error) {
        console.log(error);
    }
}