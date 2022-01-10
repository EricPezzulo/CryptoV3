import Post from "../models/postModel.js";

const postRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const posts = await Post.find({});
      const reversedPosts = [...posts.reverse()];
      reply.status(200).send(reversedPosts);
    } catch (error) {
      reply.status(400).send({ errorMessage: error });
    }
  });

  // get posts from specific user
  fastify.get("/getuserposts", async (request, reply) => {
    try {
      const posts = await Post.find({});
      reply.status(200).send(posts);
    } catch (error) {
      reply.status(400).send(error);
    }
  });

  fastify.post("/add", async (request, reply) => {
    try {
      const post = request.body;
      const newPost = new Post({
        ...post,
      });
      await newPost.save();
      reply.status(201).send(newPost);
    } catch (error) {
      reply.status(400);
    }
  });
  fastify.delete("/:id/delete", async (request, reply) => {
    try {
      const { id } = request.params;
      const { postID } = request.body;
      const updatedPost = await Post.findByIdAndDelete(id);
      console.log("deleted post in DB");
      reply.status(201).send(updatedPost);
    } catch (error) {
      reply.status(500).send({ error: "could not delete post" });
    }
  });
  done();
};

export default postRoutes;
