const express = require("express");
const { updatePassword } = require("../controller/profile");
const authenticate = require("../middleware/auth");
const router = express.Router();

//documentation for updating password API
/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Updates the password of a user
 *     tags:
 *       - User-profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user to update the password.
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user.
 *             example:
 *               username: john_doe
 *               currentPassword: abc123
 *               newPassword: def456
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *       400:
 *         description: Error updating password. Possible reasons include invalid username, incorrect current password or a server error.
 */

//Update password
router.post("/", authenticate, updatePassword);

module.exports = router;
