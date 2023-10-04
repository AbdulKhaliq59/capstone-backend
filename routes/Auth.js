const express = require("express");
const userController = require("../controller/user");
const authenticate = require("../middleware/auth");
const { createUser } = require('../controller/user');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returned Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: object
 *                     description: The user information
 *       401:
 *         description: Unauthorized
 */

//Get All user stored in database
router.post("/signin", userController.signin);
router.post("/verify_account", userController.verifyAccount)

//Documentation for signup
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: create new user
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
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *               dateOfBirth:
 *                 type: string
 *                 description: Birthdate for user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone Number of the user
 *               gender:
 *                  type: string
 *                  description: Gender sex for the user
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

router.post('/signup', createUser);
router.get('/', (req, res) => {
    res.send("This is signup page");
})
module.exports = router;