const express = require("express");
const { userById, allUsers, getUser, updateUser, deleteUser } = require("../controllers/users");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/users", allUsers);
router.get("/users/:userid", requireSignin, getUser);
router.put("/users/:userid", requireSignin, updateUser);
router.delete("/users/:userid", requireSignin, deleteUser);


router.param("userid", userById);

module.exports = router;