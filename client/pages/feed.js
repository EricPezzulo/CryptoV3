import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import NewPost from "../components/NewPost";
import { motion } from "framer-motion";
const apiEndpoint = `http://localhost:5000/api/posts`;

function feed() {
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setPostData(data);
    };
    getPosts();
  }, [postData]);

  if (!postData) return <div>loading</div>;

  return (
    <div className="bg-Eerie-Black">
      <Header />
      <div className="flex flex-col items-center py-5">
        <p className="text-4xl font-thin text-white">POST FEED</p>
      </div>
      <div className="flex w-full justify-center items-center my-2">
        <NewPost />
      </div>
      <div className="flex flex-col items-center w-full">
        {postData.reverse().map((i) => {
          return (
            <motion.div
              initial={{ x: 0, y: -20, opacity: 0 }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 10,
                  mass: 0.4,
                  stiffness: 100,
                },
              }}
              exit={{
                x: 0,
                y: -100,
                opacity: 0,
                damping: 10,
                mass: 0.4,
                stiffness: 100,
              }}
              key={i._id}
              className="flex w-full sm:w-3/5 sm:my-1"
            >
              <Post
                postBody={i.postBody}
                postCreated={i.createdAt}
                postAuthor={i.postAuthor}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default feed;
