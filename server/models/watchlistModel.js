import mongoose from "mongoose";

const CoinSchema = new mongoose.Schema({
  coinName: String,
  coinSymbol: String,
  coinID: String,
  coinImage: String,
  coin24H_high: String,
  coin24H_low: String,
});

const WatchlistSchema = new mongoose.Schema({
  watchlistName: String,
  coins: [CoinSchema],
});
const WatchlistsSchema = new mongoose.Schema(
  {
    watchlists: [WatchlistSchema],
  },
  { timestamps: true }
);

const Watchlists = mongoose.model("Watchlists", WatchlistsSchema);
export default Watchlists;

// module.exports =
//   mongoose.models.Watchlist || mongoose.model("Watchlist", WatchlistSchema);
