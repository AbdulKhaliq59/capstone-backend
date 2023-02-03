const express = require("express");
const { addComment, deleteComment, countComments } = require("../controller/comment");
const { UpdatePost } = require("../controller/Post");
const authenticate = require("../middleware/auth");
const router = express.Router();

//Documentation for comments

/**
 * @swagger
 * /posts/{id}/comments:
 *   post:
 *     summary: For creating new comments on a specific post
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to add the comment to
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The text of the comment
 *     responses:
 *       201:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


//Add comments

router.post("/:id/comments", authenticate, addComment,UpdatePost);

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   delete:
 *     summary: For deleting a specific comment on a post
 *     tags: [Comments]
 *     parameters:
 *       - name: postId
 *         in: path
 *         description: ID of the post the comment belongs to
 *         required: true
 *         type: string
 *       - name: commentId
 *         in: path
 *         description: ID of the comment to delete
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */


//Delete comment
router.delete("/:id/comments/:id", authenticate, deleteComment);

//Documentation counting comments on specific post
/**
 * @swagger
 * /posts/{id}/comments/count:
 *   get:
 *     summary: For retrieving the number of comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the post to retrieve comment count for
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The number of comments for the post
 *       400:
 *         description: Bad request
 *       404:
 *         description: Post not found
 */


//Count comments
router.get('/:id/comments/count',countComments);


module.exports=router;