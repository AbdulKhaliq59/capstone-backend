const express = require("express");
const userController = require("../controller/user");
const authenticate = require("../middleware/auth");
const { createUser } = require("../controller/user");

const router = express.Router();

router.post("/signin", userController.signin);
router.post("/verify_account", userController.verifyAccount);

//Documentation for signup
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     description: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *               email:
 *                 type: string
 *                 description: The email for the new user
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *               dateOfBirth:
 *                 type: string
 *                 description: Birthdate for the user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone Number of the user
 *               gender:
 *                 type: string
 *                 description: Gender sex for the user
 *               address:
 *                 type: string
 *                 description: address for the user
 *               nationality:
 *                 type: string
 *                 description: nationality for the user
 *               role:
 *                 type: string
 *                 description: role for the user
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The created user
 *                 token:
 *                   type: string
 *                   description: The JWT assigned to the user
 *       400:
 *         description: Bad request
 */

router.post("/signup", createUser);

router.get("/", (req, res) => {
  res.send("This is signup page");
});
module.exports = router;
