const Post = require("../models/post");
const createPost = async (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  try {
    const savePost = await post.save();
    req.post = savePost;
    next();
  } catch {
    res.status(404);
    res.send({ error: error.message });
  }
};
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({});
    req.posts = posts;
    next();
  } catch {
    res.status(404);
    res.send({ error: "Failed to retrieve all Post!" });
  }
};

const getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.status(404);
      return res.send({ error: "Post doesn't exist" });
    }
    req.post = post;
    next();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
};
const updateOnePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      res.status(404);
      res.send({ error: "Post doesn't exist" });
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
    res.status(404);
    res.send({ error: "Post doesn't exist" });
  }
};
const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.id });
    if (!deletedPost) {
      res.status(404);
      return res.send({ error: "Post doesn't exist" });
    }
    req.deletedPost = deletedPost;
    next();
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist" });
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
module.exports = {
  createPost: createPost,
  getAllPost: getAllPosts,
  getOnePost: getOnePost,
  updateOnePost: updateOnePost,
  deletePost: deletePost,
  // deleteAllPost:deleteAllPost
};
