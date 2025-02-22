const fs = require('fs').promises;
const userDetails = require('../models/userDetails');

exports.getFormPage = async(req,res,next)=>{
    try{
        res.sendFile('index.html',{root:'views/user'})
    }catch(err){
        console.log("error in getting form page", err);
        res.status(500).json({
            error:err
          })
    }
}

exports.addUserDetails = async(req,res,next)=>{
    try {
        const { userName, userEmail, userPhone, userDate} = req.body;
        if(!userPhone || !userEmail){
            throw new Error('Phone Number and Email are mandatory')
        }
        
        let userDetailsObj = await userDetails.create({
            userName:userName,
            userEmail:userEmail,
            userPhone:userPhone,
            userDate:userDate
        })
        res.status(201).json(userDetailsObj)

    }catch(err){
        console.log("Error while adding the details of a new User", err);
        res.status(500).json({
            error:err
          })
    }
}

exports.getAllAppointments = async(req,res,next)=>{
    try{
        const data = await userDetails.findAll();
        res.status(200).json(data)

    }catch(err){
        console.log("Error while fetching all users details", err);
        res.status(500).json({
            error:err
          })
    }

}

exports.deleteUserDetails = async(req,res,next)=>{ 
    const id = req.params.id;
    console.log(id);
    try{
        await userDetails.destroy({
            where:{
                id : id
            }
        })
        res.status(200).json({
            msg : "User Deleted Successfully"
        })
    }catch(err){
        console.log("Error while deleting user with id : ", id, err)
        res.status(500).json({
            error:err
          })
    }
}

exports.editUserDetails = async (req, res, next) => {
    const id = req.params.id;
    try {
        const userDetailsObj = await userDetails.findByPk(id);
        userDetailsObj.userName = req.body.userName;
        userDetailsObj.userEmail = req.body.userEmail;
        userDetailsObj.userPhone = req.body.userPhone;
        userDetailsObj.userDate = req.body.userDate;
        await userDetailsObj.save();
        res.status(201).json(userDetailsObj);
    } catch (err) {
        console.log("Error while updating user with id : ", id, err)
        res.status(500).json({
            error:err
          })
    }
}