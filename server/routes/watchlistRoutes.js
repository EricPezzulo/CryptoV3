import Watchlists from "../models/watchlistModel.js";

const watchlistRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const watchlist = await Watchlists.find({});
      reply.status(200).send({ success: true, data: watchlist });
      console.log(watchlist);
    } catch (error) {
      reply.code(400).send({ errorMessage: error });
    }
  });

  fastify.post("/add", async (request, reply) => {
    try {
      const watchlist = request.body;
      const newWatchlist = new Watchlists({
        coins: {
          coinName: watchlist.coinName,
          coinSymbol: watchlist.coinSymbol,
          coinID: watchlist.coinID,
          coinImage: watchlist.coinImage,
          coin24H_high: watchlist.coin24H_high,
          coin24H_low: watchlist.coin24H_low,
        },
      });
      await newWatchlist.save();
      reply.status(201).send(newWatchlist);
    } catch (error) {
      reply.status(400);
    }
  });
  done();
};

export default watchlistRoutes;
