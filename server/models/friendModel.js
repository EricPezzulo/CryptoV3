import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    name: { type: String },
    avatar: { type: String },
    following: { type: Array },
    followers: { type: Array },
  },

  { timestamps: true }
);

const Friend = mongoose.model("Friend", FriendSchema);

export default Friend;
