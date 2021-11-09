import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    postBody: { type: String },
    postAuthor: { type: String },
  },

  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
