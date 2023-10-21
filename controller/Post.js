const Post = require("../models/post");
const Joi = require("joi");
const mongoose = require("mongoose");
const handleError = require("../utils/handleError");
const validation = require("../middleware/validation/Post");
require("dotenv/config");
const createPost = async (req, res, next) => {
  try {
    const {
      post_title,
      post_subtitles,
      post_contents,
      post_media,
      post_category,
    } = req.body;

    validation.validateSubtitles(post_subtitles);
    await validation.validatePostTitle(post_title);
    const extractedSubtitles = post_subtitles.map(
      (substitleObj) => substitleObj.subtitle
    );
    //Create a set of subtitle strings for fast lookup
    const subtitleSet = new Set(extractedSubtitles);
    const newPost = new Post({
      post_title,
      post_subtitles,
      post_contents,
      post_images: [],
      post_videos: [],
      post_category,
    });

    post_media.forEach((media) => {
      validation.validateMediaSubtitle(media.subtitle, subtitleSet);
      if (media.type === "image") {
        newPost.post_images.push({
          imageUrl: media.url,
          subtitle: media.subtitle,
        });
      } else if (media.type === "video") {
        newPost.post_videos.push({
          videoUrl: media.url,
          subtitle: media.subtitle,
        });
      }
    });

    await newPost.save();
    res.status(201).json({
      message: "Post Created successfully",
      post: newPost,
    });
  } catch (error) {
    handleError(error, res);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = process.env.POST_PER_PAGE;

    const skip = (page - 1) * perPage;
    const posts = await Post.find({}).skip(skip).limit(perPage);
    const totalPosts = await Post.countDocuments({});
    const totalPages = Math.ceil(totalPosts / perPage);
    if (page > totalPages || page < 1) {
      res.status(404).json({
        error: "Page not found",
      });
    }
    req.post = posts;
    res.status(200).json({
      posts,
      totalPages,
      currentPage: page,
    });
    next();
  } catch (error) {
    handleError(error, res);
  }
};

const getOnePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({
      post_id: postId,
    });
    if (!post) {
      res.status(404).json({ error: "Post not Found" });
      return;
    }
    req.post = post;
    res.status(200).json({
      message: "Post found",
      post,
    });
  } catch (error) {
    handleError(error, res);
  }
};

const updateOnePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const {
      post_title,
      post_subtitles,
      post_contents,
      post_media,
      post_category,
    } = req.body;
    validation.validateSubtitles(post_subtitles);
    const extractedSubtitles = post_subtitles.map(
      (substitleObj) => substitleObj.subtitle
    );
    const subtitleSet = new Set(extractedSubtitles);
    const existingPost = await Post.findOne({ post_id: postId });
    if (!existingPost) {
      res.status(404).json({
        error: "Post not found",
      });
      return;
    }
    // Update the post fields
    existingPost.post_title = post_title;
    existingPost.post_subtitles = post_subtitles;
    existingPost.post_contents = post_contents;
    existingPost.post_images = [];
    existingPost.post_videos = [];
    existingPost.post_category = post_category;
    post_media.forEach((media) => {
      validation.validateMediaSubtitle(media.subtitle, subtitleSet);
      if (media.type === "image") {
        existingPost.post_images.push({
          image_url: media.url,
          subtitle: media.subtitle,
        });
      } else if (media.type === "video") {
        existingPost.post_videos.push({
          videoUrl: media.url,
          subtitle: media.subtitle,
        });
      }
    });
    await existingPost.save();
    res.status(200).json({
      message: "Post updated Successfully",
      post: existingPost,
    });
  } catch (error) {
    handleError(error, res);
  }
};
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findOneAndRemove({
      post_id: postId,
    });
    if (!deletedPost) {
      res.status(404).json({ error: "Post to delete not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    handleError(error, res);
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
