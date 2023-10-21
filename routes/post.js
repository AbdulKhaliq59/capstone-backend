const express = require("express");
const postController = require("../controller/Post");
const isAdmin = require("../middleware/auth");
const router = express.Router();

//Documentation for Create a post
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_title:
 *                 type: string
 *                 description: The title of the new post
 *               post_subtitles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subtitle:
 *                       type: string
 *                       description: A subtitle for the post
 *                 description: An array of subtitles for the post
 *               post_content:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: The content of the post
 *                     subtitle:
 *                       type: string
 *                       description: The subtitle associated with the content
 *                 description: An array of content objects for the post
 *               post_media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       enum: [image, video]
 *                       description: The type of media (image or video)
 *                     url:
 *                       type: string
 *                       description: The URL of the media
 *                     subtitle:
 *                       type: string
 *                       description: The subtitle associated with the media
 *                 description: An array of media objects for the post
 *               post_category:
 *                 type: string
 *                 description: The category of the post
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

//Create post
router.post("/", isAdmin.isAdmin, postController.createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     description: Retrieve a list of posts with pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve (default is 1).
 *     responses:
 *       200:
 *         description: Posts returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page being displayed.
 *       404:
 *         description: Page not found
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
 *     summary: Get an individual post by ID
 *     tags:
 *       - Posts
 *     description: Retrieve a specific post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve.
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success.
 *                 post:
 *       404:
 *         description: Post not found
 */
//View individual Post
router.get(
  "/:id",
  isAdmin.isAuthorized,
  postController.getOnePost,
  (req, res) => {
    res.send(req.post);
  }
);
//documentation for Update post
/**
 * @swagger
 * /posts/{id}:
 *   patch:
 *     summary: Update an individual post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_title:
 *                 type: string
 *                 description: The updated title of the post
 *               post_subtitles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     subtitle:
 *                       type: string
 *                       description: A subtitle for the post
 *                 description: An array of updated subtitles for the post
 *               post_contents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: string
 *                       description: The updated content of the post
 *                     subtitle:
 *                       type: string
 *                       description: The subtitle associated with the updated content
 *                 description: An array of updated content objects for the post
 *               post_media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       enum: [image, video]
 *                       description: The updated type of media (image or video)
 *                     url:
 *                       type: string
 *                       description: The updated URL of the media
 *                     subtitle:
 *                       type: string
 *                       description: The subtitle associated with the updated media
 *                 description: An array of updated media objects for the post
 *               post_category:
 *                 type: string
 *                 description: The updated category of the post
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
 *                   description: A success message
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */

//update post
router.patch(
  "/:id",
  isAdmin.isAdmin,
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
 *     summary: Delete an individual post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 post:
 *       404:
 *         description: Post to delete not found
 *       500:
 *         description: Internal server error
 */

//Delete one Post
router.delete(
  "/:id",
  isAdmin.isAuthorized,
  postController.deletePost,
  (req, res) => {
    res.send("Post deleted Successfully");
  }
);

//Delete all post
// router.delete('/',postController.deleteAllPost,(req,res)=>{
//   res.send("All Post deleted Successfully");
// })
module.exports = router;
