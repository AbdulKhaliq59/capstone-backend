const express = require("express");
const { upload } = require("../controller/Post");
const postController = require("../controller/Post");
const authenticate = require("../middleware/auth");
const router = express.Router();
//Documentation for Create a post
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     description: Create a new post with title, description, and image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               description:
 *                 type: string
 *                 description: Description of the post
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image for the post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

//Create post
router.post(
  "/",
  authenticate,
  upload.single("imageUrl"),
  postController.createPost,
  (req, res) => {
    res.send(req.post);
  }
);

/**
 * @swagger
 * /posts:
 *   get:
 *       summary: For returning all posts
 *       tags: [Posts]
 *
 *       description: return all posts
 *       responses:
 *        200:
 *            description: post Returned successfully
 *            content:
 *              application/json:
 *                schema:
 *                    type: object
 *
 */

//View all Post
router.get("/", postController.getAllPost, (req, res) => {
  res.send(req.posts);
});

//documentation for getting individual post
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: For returning a single post
 *     tags: [Posts]
 *     description: Return a single post by its ID
 *     parameters:
 *       - name: id
 *         description: ID of the post to return
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Title of the post
 *                 description:
 *                   type: string
 *                   description: Description of the post
 *                 imageUrl:
 *                   type: string
 *                   description: URL of the post's image
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

//View individual Post
router.get("/:id", authenticate, postController.getOnePost, (req, res) => {
  res.send(req.post);
});
//documentation for Update post
/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update a specific post by ID
 *     tags: [Posts]
 *     description: Update the details of a post by its ID
 *     parameters:
 *       - name: id
 *         description: ID of the post to update
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the post
 *               description:
 *                 type: string
 *                 description: Updated description of the post
 *               image:
 *                 type: file
 *                 description: Updated image of the post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

//update post
router.patch(
  "/:id",
  authenticate,
  upload.single("imageUrl"),
  postController.updateOnePost,
  (req, res) => {
    res.send(req.post);
  }
);

//Documentation for deleting specific post

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a specific post by ID
 *     tags: [Posts]
 *     description: Remove a post by its ID
 *     parameters:
 *       - name: id
 *         description: ID of the post to delete
 *         in: path
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Confirmation message
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

//Delete one Post
router.delete("/:id", authenticate, postController.deletePost, (req, res) => {
  res.send("Post deleted Successfully");
});

//Delete all post
// router.delete('/',postController.deleteAllPost,(req,res)=>{
//   res.send("All Post deleted Successfully");
// })
module.exports = router;
