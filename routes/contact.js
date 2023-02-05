const express = require("express");
const { addFeedBack, getAllFeedBack, deleteFeedBack } = require("../controller/contact");
const router = express.Router();
const authenticate= require("../middleware/auth");

//Documentation for Create a post
/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Add a new feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Name of the person who gave the feedback
 *                 required: true
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the person who gave the feedback
 *                 required: true
 *               content:
 *                 type: string
 *                 description: The feedback content
 *                 required: true
 *     responses:
 *       201:
 *         description: Feedback successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 content:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
//Send feedback
router.post("/", addFeedBack);

/**
* @swagger
* /contact:
*   get:
*       summary: For returning all Feedback
*       tags: [Feedback]
*       description: return all FeedBack
*       responses:
*        200:
*            description: Feedbacks Returned successfully
*            content:
*              application/json:
*                schema:
*                    type: object
*         
*/

//Retrieve  all Feeback
router.get('/',getAllFeedBack);

//delete specific feedback
router.delete('/:id',authenticate,deleteFeedBack);
module.exports = router;
