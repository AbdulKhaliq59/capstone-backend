const express = require("express");
const User = require("../models/user");
const { post } = require("./post");
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
router.post("/", async (req, res) => {
    const user= new User({
        username:req.body.username,
        password:req.body.password
    });
    await user.save();
    res.send(user);
});
//

module.exports=router;