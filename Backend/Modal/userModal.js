const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: [true, "firstname is requried"],
    },
    Surname: {
      type: String,
      require: [true, "Surname is requried"],
    },
    email: {
      type: String,
      require: [true, "email is requried"],
    },
    password: {
      type: String,
      require: [true, "password is requried"],
    },
    dateofbirth: {
      type: String,
      require: [true, "dateofbirth is requried"],
    },
    gender: {
      type: String,
      require: [true, "gender is requried"],
    },
    otp: {
      type: String,
      require: [true, "otp is requried"],
    },
    token: {
      type: String,
      require: [true, "token is requried"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
    friends: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const UserModal = mongoose.model("User", UserSchema);
module.exports = UserModal;
