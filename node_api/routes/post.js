const express = require("express");
const { getPost, createPost, postsByUser, postById, isPoster, updatePost, deletePost } = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/users");
// const { createPostValidator } = require("../validation/index");

const router = express.Router();

router.get("/posts", getPost);
router.post("/post/new/:userid", requireSignin, createPost);
router.get("/posts/by/:userid", requireSignin, postsByUser);
router.put("/post/:postid", requireSignin, isPoster, updatePost);
router.delete("/post/:postid", requireSignin, isPoster, deletePost);

router.param("userid", userById);
router.param("postid", postById);

module.exports = router;