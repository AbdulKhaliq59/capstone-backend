const express = require("express");
const User = require("../models/user");
const userController=require('../controller/user');
const router = express.Router();

//Get All user stored in database

router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(404);
    res.send({ error: "Failed to retrieve all users!" });
  }
});
//Get an individual user
router.get('/:id',async(req,res)=>{
  try {
    const user = await User.findOne({_id:req.params.id})
    res.send(user);
  } catch{
    res.status(404);
    res.send({error:"User doesn't exist!"});
  }  
})

//Save User in database
router.post("/",userController.createUser,(req,res)=>{
res.send(req.user);
});
//

module.exports=router;