const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../models/user");
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: login for user
 *     tags: [Auth]
 *     description: Log in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the user
 *               password:
 *                 type: string
 *                 description: The password for the user
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The status of the operation
 *                 message:
 *                   type: string
 *                   description: The message to the user
 *                 data:
 *                   type: string
 *                   description: The JWT assigned to the user
 *       400:
 *         description: Bad request
 */



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
