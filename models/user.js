const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const schema = mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4()
  },
  username: String,
  email: String,
  password: String,
  dateOfBirth: String,
  phoneNumber: String,
  gender: {
    type: String,
    enum: ['male', 'female', 'better not say'],
    default: 'better not say'
  },
  address: String,
  nationality: String,
  role: {
    type: String,
    enum: ['admin', 'normal'],
    default: 'normal'
  },
  status: {
    type: Boolean,
    default: false
  },
  profile_Picture: String,
});
module.exports = mongoose.model("User", schema);
