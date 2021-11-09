import Fastify from "fastify";
import fastifyIO from "fastify-socket.io";
import mongoose from "mongoose";
import fastifyCors from "fastify-cors";
import env from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
env.config();

const fastify = Fastify();
const Port = process.env.PORT;
const uri = process.env.MONGO_URI;

/* Register CORS */

fastify.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

/* Connect to MongoDB with Mongoose */

mongoose
  .connect(uri)
  .then(() => console.log("Connected with Mongoose"))
  .catch(() => console.log("Could not connect to Database"));

fastify.register(postRoutes, { prefix: "/api/posts" });
fastify.register(userRoutes, { prefix: "/api/users" });
/* Socket.io */

fastify.register(fastifyIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

fastify.ready().then(() => {
  // we need to wait for the server to be ready, else `server.io` is undefined
  fastify.io.on("connection", (socket) => {
    // ...
  });
});

/* Start Fastify Server Asyncronously */

const start = async () => {
  try {
    await fastify.listen(Port);
    console.log(`Server running on port: ${Port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};
start();
