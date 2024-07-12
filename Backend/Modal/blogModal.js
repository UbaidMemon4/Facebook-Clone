const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "title is require"],
    },
    image: { type: String },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
const blogModal = mongoose.model("Blog", blogSchema);
module.exports = blogModal;
