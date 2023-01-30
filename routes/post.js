const express = require("express");
const postController=require('../controller/Post');
const authenticate = require("../middleware/auth");
const router = express.Router();
//Documentation for Create a post
//Documentation for signup
/**
* @swagger
* /posts:
*   post:
*       summary: For Creating new posts
*       tags: [Posts]
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
*       summary: For returning a single post
*       tags: [Posts]
*       
*       description: return one post
*       parameters:
*         - name: id
*           description: return particular post
*           in: path
*           required: true
*           type: string
*       security:
*         - bearerAuth:['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2Q3OWVhY2ZkMDMwZTFhMzY4NWU1ODEiLCJ1c2VybmFtZSI6ImtoYWxpcUBnbWFpbC5jb20iLCJpYXQiOjE2NzUwNzU0NTV9.VKarBEBTPwdlP54LOym_XGE9BvQ8jFdi6J8zawHYabw  ']
*       responses:
*        200:
*            description: post Returned successfully
*            content:
*              application/json:
*                schema:
*                    type: object
*         
*        404:
*            description: No such post Found
*            content:
*              application/json:
*                schema:
*                    type: object
*         
*/


//View individual Post
router.get("/:id",authenticate, postController.getOnePost,(req,res)=>{
  res.send(req.post);
});
//update post
router.patch("/:id",postController.updateOnePost,(req,res)=>{
  res.send(req.post);
} );
//Delete one Post
router.delete("/:id", postController.deletePost,(req,res)=>{
  res.send("Post deleted Successfully");
});

//Delete all post
// router.delete('/',postController.deleteAllPost,(req,res)=>{
//   res.send("All Post deleted Successfully");
// })
module.exports = router;
