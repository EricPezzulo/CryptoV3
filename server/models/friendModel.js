import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    name: { type: String },
    avatar: { type: String },
    following: {
      type: Array,
      name: String,
      image: String,
    },
    followers: { type: Array },
  },

  { timestamps: true }
);

const Friend = mongoose.model("Friend", FriendSchema);

export default Friend;
