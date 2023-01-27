const User = require("../models/user");
const { validateUser, hashPassword } = require("../middleware/validation");
const { default: mongoose } = require("mongoose");
const jwt=require("jsonwebtoken");
require('dotenv/config');
//Create New User
const createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details);
  }
  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered");
  req.body.password = await hashPassword(req.body.password);
  user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  res.send(user);
  //Create and assign JWT
  const token =jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
  res.header("auth-token",token).send(user,token);
};

//Retrieve All User
const getAllUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};
//Retreive only one user
const getOneUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id,
  });
  res.send(user);
};
const updateUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error.details);
  }
  //Check if user exists
  let user = await User.findById(mongoose.Types.ObjectId(req.params.id));
  if (!user) return res.status(400).send("User Not Found");
  //Hash Password if it was updated
  if (req.body.password !== req.body.confirmedPassword) {
    return res.status(400).send("Password and confirmed password do not match");
  }
  //Hash password if it updated
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }
  //Update User
  user = await User.findByIdAndUpdate(
    mongoose.Types.ObjectId(req.params.id),
    req.body,
    { new: true }
  );
  res.send(user);
};
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found");
  res.send({ error: `user with id ${req.params.id} deleted Successfully` });
};
module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
