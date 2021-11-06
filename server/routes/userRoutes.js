import { calculateObjectSize } from "bson";
import User from "../models/userModel.js";

const userRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const users = await User.find({});
      reply.status(200).send({ success: true, data: users });
      console.log(users);
    } catch (error) {
      reply.code(400).send({ errorMessage: error });
    }
  });

  fastify.get("/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await User.findById(id);
      reply.status(200).send(user);
    } catch (error) {
      reply.status(500).send("Can not find user");
    }
  });

  fastify.post("/add", async (request, reply) => {
    try {
      const user = request.body;
      const newUser = new User({
        name: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
        },
        watchlists: {
          watchlistName: user.watchlistName,
        },
      });
      await newUser.save();
      reply.status(201).send(newUser);
    } catch (error) {
      reply.status(400);
    }
  });
  //***  create new watchlist  ***//
  fastify.put("/:id/addwatchlist", async (request, reply) => {
    try {
      const { id } = request.params;
      const watchlist = request.body;

      // // get user
      // let user = await User.findById(id);

      // user.push(watchlist);
      const updatedUser = await User.findByIdAndUpdate(id, {
        $push: { watchlists: watchlist },
      });
      await updatedUser.save();
    } catch (error) {
      reply.status(500).send({
        error: `failed to create new watchlist for`,
      });
    }
  });

  //**  add coin to watchlist  **/
  fastify.put("/:id/addcointowatchlist", async (request, reply) => {
    try {
      const { id } = request.params;
      const newCoin = request.body;

      // get the user
      let user = await User.findById(id);
      // find the index of the watchlist to push too
      const watchlistIndex = user.watchlists.findIndex(
        (c) => c.watchlistName === newCoin.watchlistName
      );

      // push the new coin to the User's watchlist
      user.watchlists[watchlistIndex].coins[0].coin.push(newCoin);

      //update the user document
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          watchlists: user.watchlists,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      reply.status(201).send(updatedUser);
    } catch (error) {
      reply.status(500).send("could not add to list");
    }
  });

  fastify.put("/:id", async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await User.findByIdAndUpdate(id, request.body);
      if (!user) {
        reply.status(400).send({ error: "Could not find user" });
      }

      reply.staus(200).send({ success: true, data: user });
    } catch (error) {
      reply.status(500).send({ error: "Could not update user" });
    }
  });

  fastify.put("/:id/deletecoin", async (request, reply) => {
    try {
      const { id } = request.params;
      const watchlist = request.body;
      console.log(watchlist.coins.coin.coinID);
      // get the user
      let user = await User.findById(id);

      // find the index of the watchlist to push too
      const watchlistIndex = user.watchlists.findIndex(
        (c) => c.watchlistName === request.body.watchlistName
      );
      console.log(user.watchlists[watchlistIndex].watchlistName);

      user.watchlists[watchlistIndex].coins[0].coin.pull(
        watchlist.coins.coin.coinID
      );
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          watchlists: user.watchlists,
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );

      reply.status(201).send(updatedUser);
    } catch (error) {
      reply.status(500).send({ error: "cant remove coin from watchlist" });
    }
  });
  done();
};

export default userRoutes;
