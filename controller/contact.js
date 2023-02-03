const Contact = require("../models/contact");
const Joi = require("joi");

const addFeedBack = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    content: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  console.log(error);
  if (error) {
    return res.status(404).send({error:error.message});
  }
  const contact = new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    content: req.body.content,
  });
  try {
    const savefeedBack=contact.save();
    req.contact=savefeedBack;
  } catch (error) {
    res.status(404);
    res.send({error:error.message});
  }
};


module.exports={
    addFeedBack
}