const express = require("express");
const {
  userBlogContoller,
  getAllBlogsContoller,
  createBlogContoller,
  getBlogByIdContoller,
  updateBlogContoller,
  deleteBlogContoller,
  likeUnlikeContoller,
  commentController,
} = require("../controller/blogController");

// router object
const router = express.Router();

//blog routes
//Get || All blogs
router.get("/all-blog", getAllBlogsContoller);

//Post || Create blog
router.post("/create-blog", createBlogContoller);

//Get || Single blog get
router.get("/get-blog/:id", getBlogByIdContoller);

//Put || Update blog
router.put("/update-blog/:id", updateBlogContoller);

//Delete || Delete blog
router.delete("/delete-blog/:id", deleteBlogContoller);

//Get || User Blog
router.get("/user-blog/:id", userBlogContoller);

//Post || User Blog
router.post("/like-blog/:id", likeUnlikeContoller);

//Post || Comment Blog
router.post("/:id/comments", commentController);

module.exports = router;
