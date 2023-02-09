const mongoose = require("mongoose");
const User = require("../models/user"); // import the User model
const bcrypt = require("bcrypt");

const updatePassword = async (req, res) => {
  // find the user
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).json({ message: "User not found" });

  // compare the current password with the one stored in the database
  const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Incorrect current password" });

  // hash the new password
  const newPassword = await bcrypt.hash(req.body.newPassword, 10);

  // update the password in the database
  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};

module.exports = { updatePassword };
