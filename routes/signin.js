const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middleware/auth");
require("dotenv/config");
const User = require("../models/user");
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!user) {
      return res.status(400).send("User not Found");
    }
    if (!password) {
      res.status().send("Password is wrong");
    }
    const UserExist = {
      userId: user.id,
      username: user.username,
    };
    const token = jwt.sign(UserExist, process.env.TOKEN_SECRET);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({
      status: "success",
      message: `welcome ${user.username}`,
      data: token,
    });
  } catch (error) {
    res.status(400).send("Not Authorized");
  }

  /*

    const payload = {
      userId: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, secretKey);
    res.setHeader("Authorization", `Bearer ${token}`);
    res.send({
      status: "success",
      message: `welcome ${user.username} `,
      data: token,
    });
  } catch (error) {
    res.status(404).send({ status: "fail", message: "Error logging in" });
  }
     */
});

module.exports = router;
