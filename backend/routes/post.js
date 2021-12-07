const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post");

// CRUD POSTS
router.get("/", auth, postCtrl.readPost);
router.post("/", auth, postCtrl.createPost);
router.put("/:id", auth, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

// CRUD COMMENTS
router.get("/get-comment", auth, postCtrl.readComment);
router.post("/:id/create-comment", auth, postCtrl.createComment);
router.put("/update-comment/:id", auth, postCtrl.updateComment);
router.delete("/delete-comment/:id", auth, postCtrl.deleteComment);

// LIKE
router.post("/:id/like", auth, postCtrl.likePost);

module.exports = router;
