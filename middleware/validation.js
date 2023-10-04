const Joi = require("joi");
const bcrypt = require("bcrypt");

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(5).alphanum().required(),
    confirmedPassword: Joi.ref("password"),
    dateOfBirth: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string(),
    address: Joi.string(),
    nationality: Joi.string(),
    status: Joi.boolean(),
    role: Joi.string()
  });
  return schema.validate(user);
};
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
module.exports = {
  validateUser,
  hashPassword,
};
