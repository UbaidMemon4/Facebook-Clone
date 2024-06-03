const UserModal = require("../Modal/userModal");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

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
    //save new user
    return res.status(201).send({
      success: true,
      message: "New User Created Succesfully",
      VerificationOtp,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error In Register CallBack",
      success: false,
      error,
    });
  }
};
exports.registerControllerOtp = async (req, res) => {
  console.log("req.body", req.body);
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
        message: "please fields all blanks",
      });
    }
    //otp verification
    if (otp == VerificationOtp) {
      return res.status(400).send({
        success: false,
        message: "OTP Not Matched",
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
      message: "Error In Register CallBack",
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
      message: "Get All User Suceesfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).res.send({
      success: false,
      message: "erroe in get all user",
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
        message: "Please Provide Email or Password",
      });
    }
    //email check
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not Registerd",
      });
    }
    //password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Username or Password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login Succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login callback",
      error,
    });
  }
};
