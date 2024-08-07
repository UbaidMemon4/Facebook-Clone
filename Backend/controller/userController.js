const UserModal = require("../Modal/userModal");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//make a transporter for mail send
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "Ubaidasif510@gmail.com",
    pass: "qfdd mqum psfs vazw",
  },
});
// Create User/Register User
exports.registerController = async (req, res) => {
  try {
    const { email } = req.body;

    //exisiting user
    const existingUser = await UserModal.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User Aleady Exisits",
      });
    }
    //generate otp
    const VerificationOtp = Math.floor(1000 + Math.random() * 9000);
    //send mail
    const info = await transporter.sendMail({
      from: "Ubaidasif510@gmail.com",
      to: email,
      subject: "OTP verification",
      html: `
      <div>Your verification OTP is ${VerificationOtp} <br/>
      Please do not share the OTP with unknown people.<div/>`,
    });
    if (info) {
      return res.status(201).send({
        success: true,
        message: "New User Created Verification OTP Send Succesfully",
        VerificationOtp,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Error In Register CallBack",
      success: false,
      error,
    });
  }
};
exports.registerControllerOtp = async (req, res) => {
  try {
    const {
      firstname,
      Surname,
      email,
      password,
      dateofbirth,
      gender,
      otp,
      VerificationOtp,
    } = req.body;
    //validation
    if (
      !firstname ||
      !Surname ||
      !email ||
      !password ||
      !dateofbirth ||
      !gender ||
      !otp ||
      !VerificationOtp
    ) {
      return res.status(400).send({
        success: false,
        message: "Please fill in all fields",
      });
    }
    //otp verification
    if (otp !== VerificationOtp) {
      return res.status(400).send({
        success: false,
        message: "OTP does not match",
      });
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    //save new user
    const user = new UserModal({
      firstname,
      Surname,
      email,
      password: hashedPassword,
      dateofbirth,
      gender,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created Succesfully",
      user,
    });
  } catch (error) {
    console.log(error, "error form register user");
    return res.status(500).send({
      message: "Error in registration callBack",
      success: false,
      error,
    });
  }
};

// get All User
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModal.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "Retrieved all users successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).res.send({
      success: false,
      message: "Error in retrieving all users",
      error,
    });
  }
};

// Login User
exports.loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    //email check
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    //password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token with expiration time
    const token = jwt.sign({ id: email }, process.env.SECRET_KEY, {
      expiresIn: "30d", // 30 days
    });

    if (token) {
      await UserModal.findOneAndUpdate(
        { email: email }, // Query
        { token: token }, // Update
        { new: true }
      );

      return res.status(200).send({
        success: true,
        message: "Login Succesfully",
        user,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
      });
    }
    //generate otp
    const ForgetOtp = Math.floor(1000 + Math.random() * 9000);
    // Update user's OTP
    const otpSave = await UserModal.findOneAndUpdate(
      { email: email }, // Query
      { otp: ForgetOtp }, // Update
      { new: true }
    );
    if (!otpSave) {
      return res.status(200).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    //send mail
    const info = await transporter.sendMail({
      from: "Ubaidasif510@gmail.com",
      to: email,
      subject: "Forget Password OTP",
      html: `
  <div>Your Forget Password OTP is ${ForgetOtp} <br/>
  Please do not share the OTP with unknown people.<div/>`,
    });
    return res.status(201).send({
      success: true,
      message: "Forget Password OTP Send Succesfully",
      email,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Something Went Wrong..",
      error,
    });
  }
};

exports.newPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    // Validate data
    if (!email || !otp || !password) {
      return res.status(401).json({
        success: false,
        message: "Please provide all required data",
      });
    }
    //Find User
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
    if (user.otp !== otp) {
      return res.status(401).send({
        success: false,
        message: "OTP mismatch",
      });
    }
    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordUpdated = await UserModal.findOneAndUpdate(
      { email: email }, // Query
      { password: hashedPassword }, // Update
      { new: true }
    );
    if (passwordUpdated) {
      return res.status(201).send({
        success: true,
        message: "Password updated succesfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to update password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateUserContoller = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params=>", req.params);
    console.log("req.body=>", req.body);
    const user = await UserModal.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    console.log("user=>", user);
    return res.status(200).send({
      success: true,
      message: "User Updated Suceesful",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating user",
      error,
    });
  }
};
//Send Friend Request
exports.sendReqContoller = async (req, res) => {
  try {
    const { senderToken, receiverId } = req.body;
    const receiver = await UserModal.findById(receiverId);
    const sender = await UserModal.findOne({ token: senderToken });

    if (!sender || !receiver) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (!receiver.friendRequests.includes(receiverId)) {
      receiver.friendRequests.push(receiverId);
      await receiver.save();
    }
    res.status(200).json({ message: "Friend request sent", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error sending friend request", error, success: false });
  }
};

//Get All Friend request
exports.getAllFriendRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModal.findOne({ token: id }).populate(
      "friendRequests"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ friendRequests: user.friendRequests, success: true });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching friend requests",
      error,
      success: false,
    });
  }
};

//DeleteFriendReq
exports.deleteFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    const user = await UserModal.findOne({ token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Remove the friend request
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );

    await user.save();

    res.status(200).json({ message: "Friend request deleted", success: true });
  } catch (error) {
    console.error("Error deleting friend request:", error);
    res.status(500).json({
      message: "Error deleting friend request",
      error,
      success: false,
    });
  }
};
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId, token } = req.body;

    const user = await UserModal.findOne({ token });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const friend = await UserModal.findById(friendId);

    if (!friend) {
      return res
        .status(404)
        .json({ message: "Friend not found", success: false });
    }
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friendId
    );
    friend.friends.push(user._id);
    await user.save();
    await friend.save();
    user.friends.push(friendId);
    res.status(200).json({ message: "Friend request accepted", success: true });
  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({
      message: "Error accepting friend request",
      error,
      success: false,
    });
  }
};
