const express = require("express");
const {
  registerController,
  getAllUsers,
  loginUsers,
  registerControllerOtp,
  forgetPassword,
  newPassword,
  updateUserContoller,
  sendReqContoller,
  getAllFriendRequests,
  deleteFriendRequest,
  acceptFriendRequest,
} = require("../controller/userController");

// router object
const router = express.Router();

//Create User || Post
router.post("/register", registerController);

//Register Otp || Post
router.post("/register-otp", registerControllerOtp);

//Get All User || Get
router.get("/all-users", getAllUsers);

//Login USer || Post
router.post("/login", loginUsers);

//Forget Password || Send OTP || Post
router.post("/forget-password", forgetPassword);

//Forget Password ||  New Password || Post
router.post("/new-password", newPassword);

//Update User || Put
router.put("/update-user/:id", updateUserContoller);

//Send Friend Req || post
router.post("/send-friend-request", sendReqContoller);

//Get All Friend Req || post
router.get("/all-friend-requests/:id", getAllFriendRequests);

//Friend Req Deleted|| delete
router.delete("/delete-friend-request", deleteFriendRequest);

//Friend Req Accept|| post
router.post("/accept-friend-request", acceptFriendRequest);

module.exports = router;
