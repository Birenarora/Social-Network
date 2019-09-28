const express = require("express");
const { signup, signin, signout  } = require("../controllers/auth");
const { userById } = require("../controllers/users");

// const { createPostValidator } = require("../validation/index");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);

router.param("userid", userById);

module.exports = router;