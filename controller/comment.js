const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const User = require("../models/user");
require("dotenv/config");

//Add a comment on a Post

const addComment = async (req, res) => {
  //Create controller for adding comment to post
  
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
 module.exports={
    addComment,
    deleteComment,
    countComments
 }