const Post = require("../models/post");
const Joi = require("joi");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "daognkuqr",
  api_key: "364827857523956",
  api_secret: "UF-wpwDvNFcZ19IMcOENukxqiXc",
});
const createPost = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.imageUrl, {
      folder: "posts",
    });
    req.body.imageUrl = result.secure_url;

    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      imageUrl: Joi.string().uri().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(404);
      res.send({ error: error.message });
      return;
    }
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    });

    const savePost = await post.save();
    console.log(savePost);
    res.status(201);
    req.post = savePost;
    res.status(200).json({ message: "Post Created Successuly" });
    next();
  } catch (error) {
    res.status(500);
    res.send({ error: error.message });
  }
};
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    req.posts = posts;
    res.status(201);
    next();
  } catch {
    res.status(404);
    res.send({ error: "Failed to retrieve all Post!" });
  }
};

const getOnePost = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    res.status(404);
    res.send({ error: error.message });
  }
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.status(404);
      return res.json({ error: "Post doesn't exist" });
    }
    if (!post._id) {
      // res.status(201);
      res.json({ error: "Post doesn't have an _id property" });
    }
    res.status(200).json({ message: "success" });
    req.post = post;
    next();
  } catch {
    res.status(404);
    res.json({ error: "Post doesn't exist!" });
  }
};
const updateOnePost = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().allow(""),
    description: Joi.string().allow(""),
    imageUrl: Joi.string().uri().allow(""),
  });
  const { error } = schema.validate({ ...req.params, ...req.body });
  if (error) {
    res.status(404);
    res.json({ error: error.message });
    return;
  }
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.status(404);
      res.json({ error: "Post doesn't exist" });
    }
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.description) {
      post.description = req.body.description;
    }
    if (req.body.imageUrl) {
      post.imageurl = req.body.imageUrl;
    }
    await post.save();
    req.post = post;
    next();
  } catch {
    res.status(404).json({ error: "Post doesn't exist" });
  }
};
const deletePost = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    res.status(404);
    res.send({ error: error.message });
  }
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.id });
    if (!deletedPost) {
      res.status(404);
      res.json({ error: "Post doesn't exist" });
    }
    req.deletedPost = deletedPost;
    res.status(200).json({ message: "Post deleted Successfully" });
    next();
  } catch {
    res.status(500);
    res.send({ error: "Internal server error" });
  }
};
// const deleteAllPost = async (req, res, next) => {
//   try {
//     const deletedPosts = await Post.deleteMany({});
//     if (!deletedPosts) {
//       res.status(404);
//       return res.send({ error: "Failed to delete All posts!" });
//     }
//     req.deletedPosts = deletedPosts;
//     next();
//   } catch {
//     res.status(404);
//     res.send({ error: "Failed to delete All posts!" });
//   }
// };

//Update Post
const UpdatePost = async (req, res) => {
  try {
    const existingPost = await Post.findById({ _id: req.params.id });
    if (!existingPost) {
      return res
        .status(400)
        .send({ status: "Fail", message: "Post doesn't exist" });
    }
    if (req.body.comments) {
      existingPost.comments = req.body.comments;
    }
    await existingPost.save();
  } catch (error) {
    res.status(500).send({ status: "Fail", message: "Failed to add comments" });
  }
};

module.exports = {
  createPost: createPost,
  getAllPost: getAllPosts,
  getOnePost: getOnePost,
  updateOnePost: updateOnePost,
  deletePost: deletePost,
  UpdatePost: UpdatePost,
  // deleteAllPost:deleteAllPost
};
