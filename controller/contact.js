const Contact = require("../models/contact");
const Joi = require("joi");

const addFeedBack = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    content: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ error: error.message });
  }
  const contact = new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    content: req.body.content,
  });
  try {
    const savefeedBack = contact.save();
    req.contact = savefeedBack;
    res.json(contact);
  } catch (error) {
    res.status(404);
    res.json({ error: error.message });
  }
};
const getAllFeedBack = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    req.contacts = contacts;
    res.status(201).json(contacts);
  } catch (error) {
    res.status(404).json({ error: "Failed to retrieve all feedback" });
  }
};
const deleteFeedBack = async (req, res) => {
  try {
    const deletedFeeback = await Contact.deleteOne({ _id: req.params.id });
    if (!deletedFeeback) {
      res.status(404).json({ error: "No feedback with such ID" });
    }
    req.deletedFeeback = deletedFeeback;
    res.status(201).json({ message: "Feedback deleted Successuly " });
  } catch (error) {
    res.status(500).json({ error: "No feedback with such ID" });
  }
};
module.exports = {
  addFeedBack,
  getAllFeedBack,
  deleteFeedBack
};
