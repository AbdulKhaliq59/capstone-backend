const express = require("express");
const userController = require("../controller/user");
const { createUser } = require("../controller/user");

const router = express.Router();

//Documentation for signin

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
 *     description: Sign in an existing user with their email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       201:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: A status indicating success
 *                 Message:
 *                   type: string
 *                   description: A welcome message for the user
 *                 data:
 *                   type: string
 *                   description: The JWT token assigned to the user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user was not found
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the password is incorrect or the account is not verified
 *                 auth_error:
 *                   type: string
 *                   description: Error message indicating that the user is not authorized
 */


router.post("/signin", userController.signin);

//Documentation for Account verification
/**
 * @swagger
 * /auth/verify_account:
 *   post:
 *     summary: Verify a user account
 *     tags: [Auth]
 *     description: Verify a user's account by providing a valid token
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The verification token received by the user's email
 *     responses:
 *       200:
 *         description: Account verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating that the account has been verified
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the token is missing
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the token is invalid
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user associated with the token was not found
 */

router.post("/verify_account", userController.verifyAccount);

//Documentation for signup
/**
 * @swagger
 * /auth/signup:
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
