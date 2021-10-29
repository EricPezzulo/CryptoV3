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
      console.log(watchlist);
      const updatedUser = await User.findByIdAndUpdate(id, {
        $push: { watchlists: watchlist },
      });
      await updatedUser.save();
    } catch (error) {
      reply.status(500).send({
        error: `failed to create new watchlist for `,
      });
    }
  });

  //**  add coin to watchlist  **/
  fastify.put(":/id/addcointowatchlist", async (request, reply) => {
    try {
      const { id } = request.params;
      const coin = request.body;
      const addedCoin = await User.findByIdAndUpdate(id, {
        $push: { watchlists: { coins: { coin } } },
      });
      await addedCoin.save();
      console.log(coin);
    } catch (error) {
      reply.status(500).send({
        error: `failed to add coin to watchlist`,
      });
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

  done();
};

export default userRoutes;
