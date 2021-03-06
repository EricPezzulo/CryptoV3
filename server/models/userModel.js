import mongoose from "mongoose";

const CoinSchema = new mongoose.Schema({
  coinID: { type: String },
});
const CoinsSchema = new mongoose.Schema({
  coin: [CoinSchema],
});

const WatchlistSchema = new mongoose.Schema({
  watchlistName: { type: String },
  coins: [CoinsSchema],
});

const NameSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
});

const UserSchema = new mongoose.Schema({
  name: [NameSchema],
  watchlists: [WatchlistSchema],
  followers: { type: Array }, // store user _id's
  following: { type: Array }, // store user _id's
  status: { type: String },
});

const User = mongoose.model("User", UserSchema);

export default User;
