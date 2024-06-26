const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    image: { type: String },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is require"],
    },
  },
  { timestamps: true }
);
const blogModal = mongoose.model("Blog", blogSchema);
module.exports = blogModal;
