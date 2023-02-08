const express = require("express");
const postController=require('../controller/Post');
const authenticate = require("../middleware/auth");
const router = express.Router();
//Documentation for Create a post
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: For Creating new posts
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The Title for the new blog post
 *               description:
 *                 type: string
 *                 description: The description for the new blog post
 *               imageUrl:
 *                 type: string
 *                 description: The location for the new blog post
 *   responses:
 *     201:
 *       description: Successful operation
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: object
 *                 description: The Post Created
 *     400:
 *       description: Bad request
 */


//Create post
router.post("/", postController.createPost,(req,res)=>{
  res.send(req.post);
});

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
router.get('/',postController.getAllPost,(req,res)=>{
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
router.get("/:id",authenticate, postController.getOnePost,(req,res)=>{
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the post
 *               description:
 *                 type: string
 *                 description: Updated description of the post
 *               imageUrl:
 *                 type: string
 *                 description: Updated URL of the post's image
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
 *                 title:
 *                   type: string
 *                   description: Title of the updated post
 *                 description:
 *                   type: string
 *                   description: Description of the updated post
 *                 imageUrl:
 *                   type: string
 *                   description: URL of the updated post's image
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

//update post
router.patch("/:id",postController.updateOnePost,(req,res)=>{
  res.send(req.post);
} );

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
router.delete("/:id",authenticate, postController.deletePost,(req,res)=>{
  res.send("Post deleted Successfully");
});

//Delete all post
// router.delete('/',postController.deleteAllPost,(req,res)=>{
//   res.send("All Post deleted Successfully");
// })
module.exports = router;
