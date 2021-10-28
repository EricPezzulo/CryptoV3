import mongoose from "mongoose";
import Watchlists from "../models/watchlistModel.js";

const CoinSchema = new mongoose.Schema({
  coinName: String,
  coinSymbol: String,
  coinID: String,
  coinImage: String,
  coin24H_high: String,
  coin24H_low: String,
});

const WatchlistsSchema = new mongoose.Schema(
  {
    watchlistName: { type: String, required: true },
    coins: [CoinSchema],
  },
  { timestamps: true }
);

const NameSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    name: [NameSchema],
    watchlists: [WatchlistsSchema],
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
