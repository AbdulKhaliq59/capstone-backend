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
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid password");
    }

    const payload = { userId: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);

    if (user.username === "admin@gmail.com") {
      return res
        .status(200)
        .send({ data: token, username: user.username, isAdmin: true });
    } else {
      return res
        .status(200)
        .send({ data: token, username: user.username, isAdmin: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

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
