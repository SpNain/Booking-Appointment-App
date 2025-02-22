const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/form',userController.getFormPage);
router.post('/form',userController.addUserDetails);
router.get('/allappointments',userController.getAllAppointments);
router.delete('/appointment/delete/:id',userController.deleteUserDetails);
router.put('/appointment/edit/:id',userController.editUserDetails);

module.exports = router;