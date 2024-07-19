const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  blog: { type: mongoose.Types.ObjectId, ref: "Blog", required: true },
});

const CommentModal = mongoose.model("Comment", CommentSchema);
module.exports = CommentModal;
