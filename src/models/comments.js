const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  postId: {
    type: String,
    required: true,
    trim: true,
  },
});
//we are creating a new collection
const Comments = new mongoose.model("comments", commentSchema);

module.exports = Comments;
