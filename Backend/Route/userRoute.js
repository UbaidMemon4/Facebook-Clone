const express = require("express");
const {
  registerController,
  getAllUsers,
  loginUsers,
  registerControllerOtp,
  forgetPassword,
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
router.post("/new-password", forgetPassword);

module.exports = router;
