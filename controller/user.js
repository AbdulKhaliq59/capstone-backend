const User = require("../models/user");
const { validateUser, hashPassword } = require("../middleware/validation");
const { default: mongoose } = require("mongoose");
const { sendEmail } = require('../utils/sendEmail')
const handleError = require('../utils/handleError')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
require("dotenv/config");
//Create New User
const createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }
  let user = await User.findOne({ email: req.body.email });
  console.log('User to register', user)
  if (user) return res.status(400).json({ message: "User already registered" });
  req.body.password = await hashPassword(req.body.password);
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    address: req.body.address,
    nationality: req.body.nationality,
    role: req.body.role
  });
  await user.save();
  const verificationToken = jwt.sign({
    userId: user.userId,
    email: user.email,
  }, process.env.TOKEN_SECRET);
  const verificationUrl = `${process.env.URL}/auth/verify_account?token=${verificationToken}`;

  await sendEmail(user.email, 'Account Verification', 'Thank you for joining me in this wonderful journey', verificationUrl);
  res.status(200).json({ message: "User created Successfully", token: verificationToken });
};

//Verify Account
const verifyAccount = async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({ message: "Token is missing" })
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decoded.userId;
    const user = await User.findOneAndUpdate(
      { userId: userId },
      { $set: { status: true } },
      { new: true }
    )
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ message: 'Account verified successfully' })
  } catch (error) {
    handleError(error, res)
  }
}

//signin controller

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const password = await bcrypt.compare(req.body.password, user.password)
    if (!user) {
      return res.status(400).json({ mesage: "User not found" })
    }
    if (!password) {
      return res.json({ error: "Wrong password" })
    }
    if (user.status !== true) {
      return res.status(400).json({ Error: "Your account is not verified" })
    }
    const userExist = {
      userId: user.userId,
      email: user.email,
      role: user.role
    }
    const token = jwt.sign(userExist, process.env.TOKEN_SECRET);
    res.setHeader("Authorization", `Bearer${token}`)
    res.status(201).json({
      status: "Success",
      Message: `Welcome ${user.username}`,
      data: token
    })
  } catch (error) {
    handleError(error, res)
  }
}

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
  verifyAccount,
  signin
};
