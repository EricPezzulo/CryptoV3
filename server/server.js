import Fastify from "fastify";
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
(() => {
  try {
    mongoose.connect(uri).then(() => console.log("Connected with Mongoose"));
  } catch (error) {
    console.log("Could not connect to Mongo");
  }
})();

fastify.register(postRoutes, { prefix: "/api/posts" });
fastify.register(userRoutes, { prefix: "/api/users" });

/* Start Fastify Server Asyncronously */
(async () => {
  try {
    await fastify.listen(Port);
    console.log(`Server running on port: ${Port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();
