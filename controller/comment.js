const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const User = require("../models/user");
const handleError = require("../utils/handleError");
require("dotenv/config");

//Add a comment on a Post

const addComment = async (req, res) => {
  try {
    // Get the JWT token from the request headers
    const token = req.headers.authorization; // Assuming the token is sent in the "Authorization" header

    if (!token) {
      return res.status(401).json({ error: "Authorization token is missing" });
    }
    const splittedToken = token.split(" ")[1];
    console.log(splittedToken);

    // Verify the token and extract the user's userId
    const decodedToken = jwt.decode(splittedToken, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;

    // Get the user's username from the user table using the userId
    const user = await User.findOne({ userId: userId });

    if (!user) {
      // If the user is not found, return a 404 Not Found response
      res.status(404).json({ error: "User not found" });
      return;
    }

    const postId = req.params.id; // Get the post_id from the request parameters
    const { comment } = req.body; // Get the comment data from the request body
    if (!comment) {
      res.status(400).json({
        error: "Please insert a comment",
      });
    }
    // Find the post by post_id
    const post = await Post.findOne({ post_id: postId });

    if (!post) {
      // If the post is not found, return a 404 Not Found response
      return res.status(404).json({ error: "Post not found" });
    }

    // Add the comment to the post's comments array along with the username
    post.post_comments.push({ user: user.username, comment });

    // Save the post with the updated comment data
    await post.save();

    // Return a success response
    res.status(200).json({
      message: "Comment added successfully",
      post: post,
    });
  } catch (error) {
    // Handle any errors
    handleError(error, res);
  }
};

//delete a comment on particular Post

const deleteComment = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const splittedToken = token.split(" ")[1];

    const decodedToken = jwt.decode(splittedToken, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findOne({
      userId: userId,
    });
    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
    }
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = await Post.findOne({
      post_id: postId,
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
    }
    // Find the comment to delete by its comment_id and check if it was posted by the user
    const comment = post.post_comments.find(
      (comment) => comment._id == commentId
    );

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (comment.user !== user.username) {
      return res.status(403).json({
        error: "Permission denied - You can only delete your own comments",
      });
    }

    // Remove the comment from the post's comments array
    post.post_comments = post.post_comments.filter(
      (comment) => comment._id != commentId
    );

    // Save the post with the updated comment data
    await post.save();

    // Return a success response
    return res.status(200).json({
      message: "Comment deleted successfully",
      post: post,
    });
  } catch (error) {
    handleError(error, res);
  }
};

//COUNT COMMENT ON PARTICULAR POST

const countComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({
      post_id: postId,
    });
    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }
    const commentCount = post.post_comments.length;
    res.status(200).send({
      message: `Post has ${commentCount} comments.`,
    });
  } catch (error) {
    handleError(error, res);
  }
};

//Edit comment
const editComment = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const splittedToken = token.split(" ")[1];
    const decodedToken = jwt.decode(splittedToken, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findOne({
      userId: userId,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { updatedComment } = req.body;
    const post = await Post.findOne({ post_id: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = post.post_comments.find(
      (comment) => comment._id == commentId
    );
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    if (comment.user !== user.username) {
      return res.status(403).json({
        error: "Permission denied -You can only edit your comments",
      });
    }
    comment.comment = updatedComment;
    await post.save();
    return res.status(200).json({
      message: "comment edited successfully",
    });
  } catch (error) {
    handleError(error, res);
  }
};
module.exports = {
  addComment,
  deleteComment,
  countComments,
  editComment
};
