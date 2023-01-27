const express = require("express");
const postController=require('../controller/Post');
const authenticate = require("../middleware/auth");
const router = express.Router();

//Create post
router.post("/", postController.createPost,(req,res)=>{
  res.send(req.post);
});
//View all Post
router.get('/',postController.getAllPost,(req,res)=>{
  res.send(req.posts);
});

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
