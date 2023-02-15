const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const User = require("../models/user");
require("dotenv/config");

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        status: "fail",
        message: "Post not found",
      });
    }

    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({
        status: "fail",
        message: "No token provided",
      });
    }

    const secretKey = process.env.TOKEN_SECRET;
    let decoded;

    try {
      decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
    } catch (err) {
      return res.status(401).send({
        status: "fail",
        message: "Invalid token",
      });
    }

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "User not found",
      });
    }

    const comment = {
      username: user.username,
      comment: req.body.comment,
    };

    await Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment },
    });

    return res.status(201).json({
      status: "success",
      message: "Comment added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "fail",
      message: "Error adding comment",
      error: err,
    });
  }
};

//delete a comment on particular Post

const deleteComment = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).send({ status: "Fail", message: "Unauthorized" });
    }
    const user = User.findOne({ username: decoded.username });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Fail", message: "User not found" });
    }
    const post = Post.findOne({ _id: req.body.params });
    if (!post) {
      return res
        .status(404)
        .send({ status: "Fail", message: "Post Not Found" });
    }
    const comment = post.comments.find((c) => c._id == req.params.commentId);
    if (!comment) {
      return res
        .status(404)
        .send({ status: "Fail", message: "Comment Not Found" });
    }
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { comments: { _id: req.params.commentId } },
    });
    res
      .status(200)
      .send({ status: "Success", message: "Comment deleted Successfully" });
  } catch (error) {
    res.status(500).send({ status: "Fail", message: "Error deleting comment" });
    console.log(error);
  }
};

//COUNT COMMENT ON PARTICULAR POST

const countComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post Not Found");
    }
    const commentCount = post.comments.length;
    res.status(200).send({
      status: "Success",
      message: `Post has ${commentCount} comments.`,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Fail", message: "Error Counting comments " });
  }
};
module.exports = {
  addComment,
  deleteComment,
  countComments,
};
