const express = require("express");
// const User = require("../models/user");
const userController=require('../controller/user');
// const { get } = require("mongoose");
const router = express.Router();

//Get All user stored in database
router.get('/',userController.getAllUser);
//Save User in database
router.post('/',userController.createUser);
//update user 
router.patch('/:id',userController.updateUser);
//deleter User
router.delete('/:id',userController.deleteUser);

module.exports=router;