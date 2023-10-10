const express = require("express");
const { updatePassword } = require("../controller/profile");
const authenticate = require("../middleware/auth");
const router = express.Router();

//Update password
router.patch("/", authenticate.isAuthorized, updatePassword);

module.exports = router;
