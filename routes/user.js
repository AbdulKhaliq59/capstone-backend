const express = require("express");
// const User = require("../models/user");
const userController = require("../controller/user");
const authenticate = require("../middleware/auth");
// const { get } = require("mongoose");
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
router.get("/", authenticate, userController.getAllUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A single user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the user
 *                 username:
 *                   type: string
 *                   format: email
 *                   description: The username of the user
 *                 Phone Number:
 *                   type: string
 *                   description: The Phone Number of the user
 *                 Gender:
 *                   type: string
 *                   description: The gender of the user
 *       404:
 *         description: User not found
 */

//Get a single user
router.get("/:id", authenticate, userController.getOneUser);
module.exports = router;
