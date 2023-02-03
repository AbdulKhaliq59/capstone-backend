const express = require("express");
const { addFeedBack } = require("../controller/contact");
const router = express.Router();

router.post("/", addFeedBack);

module.exports = router;
