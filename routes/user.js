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
router.post("/verify_account", userController.verifyAccount)
module.exports = router;
