import { calculateObjectSize } from "bson";
import { ConnectionPoolMonitoringEvent } from "mongodb";
import User from "../models/userModel.js";

const userRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const users = await User.find({});
      reply.status(200).send({ success: true, data: users });
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

  // Get followings:

  fastify.get("/:id/following", async (request, reply) => {
    try {
      const { id } = request.params;
      const user = await User.findById(id);
      // console.log(user);
      const followings = user.following;
      // console.log(followings);
      let followingList = [];
      followings.map((following) => {
        const { userID, name, image } = following;
        followingList.push({ userID, name, image });
      });
      reply.status(200).send(followingList);
    } catch (error) {
      reply.status(500).send({ error: "could not find following" });
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

  // ***  follow a user *** //
  fastify.put("/:id/follow", async (request, reply) => {
    try {
      const { id } = request.params;
      const { currentUser } = request.body;
      const { followingUser } = request.body;

      // find current user and add new user to their followings
      let user = await User.findById(id);
      user.following.push(followingUser);

      // find requested user and add current user to followers
      let requestedUser = await User.findById(followingUser.userID);
      requestedUser.followers.push(currentUser);

      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { following: user.following },
        { new: true, useFindAndModify: false }
      );

      const updatedRequestedUser = await User.findByIdAndUpdate(
        { _id: followingUser.userID },
        { followers: requestedUser.followers },
        { new: true, useFindAndModify: false }
      );

      reply.status(201).send({ updatedUser, updatedRequestedUser });
    } catch (error) {
      reply.status(500).send({ error: "could not follow user" });
    }
  });

  // *** unfollow user *** ///
  fastify.put("/:id/unfollow", async (request, reply) => {
    try {
      const { id } = request.params;
      const { currentUser } = request.body;
      const { followingUser } = request.body;
      // get the user
      let user = await User.findById(currentUser.userID);
      // find the index of the user to remove
      const userIndex = user.following.findIndex((user) => user.userID === id);
      // remove the user from the following.
      user.following.splice(userIndex, 1);

      // find requested user and remove current user to followers
      let requestedUser = await User.findById(followingUser.userID);
      const unfollowIndex = requestedUser.followers.findIndex(
        (user) => user.userID === currentUser.userID
      );
      requestedUser.followers.splice(unfollowIndex, 1);

      const updatedUser = await User.findByIdAndUpdate(
        { _id: currentUser.userID },
        { following: user.following },
        { new: true, useFindAndModify: false }
      );
      const updatedUnfollow = await User.findByIdAndUpdate(
        { _id: followingUser.userID },
        { followers: requestedUser.followers },
        { new: true, useFindAndModify: false }
      );

      reply.status(201).send({ updatedUser, updatedUnfollow });
    } catch (error) {
      reply.status(501).send({ error: "could not unfollow user" });
    }
  });

  //***  create new watchlist  ***//
  fastify.put("/:id/addwatchlist", async (request, reply) => {
    try {
      const { id } = request.params;
      const watchlist = request.body;

      let user = await User.findById(id);

      user.watchlists.push(watchlist);

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
      await updatedUser.save();
      reply.status(201).send(updatedUser);
    } catch (error) {
      reply.status(500).send({
        error: `failed to create new watchlist`,
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
      const { watchlistName, coinID } = request.body;

      // get the user
      let user = await User.findById(id);

      // find the index of the watchlist to push too
      const watchlistIndex = user.watchlists.findIndex(
        (c) => c.watchlistName === watchlistName
      );
      // find the index of the coin to remove
      const coinIndex = user.watchlists[watchlistIndex].coins[0].coin.findIndex(
        (c) => c.coinID === coinID
      );
      // remove the coin from the watchlist it is in.
      user.watchlists[watchlistIndex].coins[0].coin.splice(coinIndex, 1);
      // update the user
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
      reply.status(500).send({ error: "can't remove coin from watchlist" });
    }
  });

  fastify.put("/:id/updatestatus", async (request, reply) => {
    try {
      const { id } = request.params;
      const { status } = request.body;
      let user = await User.findByIdAndUpdate(
        { _id: id },
        { status: status },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      reply.status(201).send(user);
    } catch (error) {
      reply.status(500).send("Could not update status");
    }
  });

  // delete watchlist
  fastify.put("/:id/deletewatchlist", async (request, reply) => {
    try {
      const { id } = request.params;
      const { watchlistName } = request.body;

      // get the user
      let user = await User.findById(id);

      // find the index of the watchlist to push too
      const watchlistIndex = user.watchlists.findIndex(
        (c) => c.watchlistName === watchlistName
      );

      // remove the coin from the watchlist it is in.
      user.watchlists.splice(watchlistIndex, 1);
      // update the user
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
      reply.status(500).send({ error: "can't delete watchlist" });
    }
  });
  done();
};

export default userRoutes;
