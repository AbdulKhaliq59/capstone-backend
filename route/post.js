const express = require("express");
const Post = require("../models/post");
const router = express.Router();
//Save post in database

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  await post.save();
  res.send(post);
});
//View all Post
router.get('/',async(req,res)=>{
    try {
        const posts= await Post.find({});
        res.send(posts);
    } catch{
        res.status(404);
        res.send({error:"Failed to retreive all post!"});
    }
})

//View individual Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
//update post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.description) {
      post.description = req.body.description;
    }
    if (req.body.imageUrl) {
      post.imageUrl = req.body.imageUrl;
    }
    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
//Delete one Post
router.delete("/:id", async (req, res) => {
  try {
    await Post.deleteOne({_id:req.params.id})
    res.status(202).send();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

//Delete all post
router.delete('/',async(req,res)=>{
    try {
        await Post.deleteMany({})
        res.status(202).send();    
    } catch {
        res.status(404);
        res.send({error:"Failed to delete all Post!"});
    }  
})
module.exports = router;
