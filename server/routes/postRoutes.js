import Post from "../models/postModel.js";

const postRoutes = async (fastify, opts, done) => {
  fastify.get("/", async (request, reply) => {
    try {
      const posts = await Post.find({});
      reply.status(200).send(posts);
      // console.log(posts);
    } catch (error) {
      reply.code(400).send({ errorMessage: error });
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
      reply.status(201).send(updatedPost);
    } catch (error) {
      reply.status(500).send({ error: "could not delete post" });
    }
  });
  done();
};

export default postRoutes;
