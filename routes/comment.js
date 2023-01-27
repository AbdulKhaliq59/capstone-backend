const express = require("express");
const { addComment, deleteComment, countComments } = require("../controller/comment");
const { UpdatePost } = require("../controller/Post");
const authenticate = require("../middleware/auth");
const router = express.Router();

//Add comments

router.post("/:id/comments", authenticate, addComment,UpdatePost);

//Delete comment
router.delete("/:id/comments/:id", authenticate, deleteComment);

//Count comments
router.get('/:id/comments/count',countComments);


module.exports=router;