////////////////////////////////////////////////////////////
/////////////   POST - COMMENT - LIKE ROUTES   /////////////
////////////////////////////////////////////////////////////

// Creation of router
const express = require("express");
const router = express.Router();

// Import post controllers
const postCtrl = require("../controllers/post");

// CRUD POSTS
router.get("/", postCtrl.readPost);
router.post("/", postCtrl.createPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);

// CRUD COMMENTS
router.get("/get-comment", postCtrl.readComment);
router.post("/:id/create-comment", postCtrl.createComment);
router.put("/update-comment/:id", postCtrl.updateComment);
router.delete("/delete-comment/:id", postCtrl.deleteComment);

// LIKE
router.get("/like", postCtrl.readLike);
router.post("/:id/like", postCtrl.likePost);

module.exports = router;
