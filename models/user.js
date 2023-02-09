const mongoose = require("mongoose");
const schema = mongoose.Schema({
  username: String,
  password: String,
  confirmedPassword: String,
  dateOfBirth: String,
  phoneNumber: String,
  gender: String,
});
module.exports = mongoose.model("User", schema);
