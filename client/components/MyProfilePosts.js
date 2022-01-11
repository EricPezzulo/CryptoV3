import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import Loader from "./Loader";
import EndMsg from "./EndMsg";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function MyProfilePosts({ session }) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get(`http://localhost:5000/api/posts/getuserposts`);
    const { data } = res;
    const filteredPostAuthors = data.filter(
      (post) => post.postAuthor === session.id
    );
    setItems(filteredPostAuthors);
    return items;
  };

  const fetchData = async () => {
    const postsFromServer = await fetchPosts();
    setItems([...items, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  const displayMyPosts = (
    <div className="flex flex-col max-w-xl sm:min-w-profile-posts self-center">
      <div
        id="scrollableDiv"
        className="flex flex-col w-full bg-Eerie-Black-dark p-2 shadow-lg rounded my-5 h-64 overflow-y-auto overflow-x-hidden"
      >
        <InfiniteScroll
          className="flex flex-col w-full justify-center items-center"
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
          scrollableTarget="scrollableDiv"
        >
          {items
            .map((i, key) => {
              return (
                <motion.div
                  className="flex w-full sm:my-1"
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
                  key={key}
                >
                  <Post
                    postBody={i.postBody}
                    postCreated={i.createdAt}
                    postAuthor={i.postAuthor}
                    deletePost={true}
                    postID={i._id}
                  />
                </motion.div>
              );
            })
            .reverse()}
        </InfiniteScroll>
      </div>
    </div>
  );
  if (!items) {
    <div>
      <p>loading...</p>
    </div>;
  }
  return (
    <div className="flex flex-col w-full">
      <p className="text-white text-xl text-center font-light">
        My Posts({items.length})
      </p>
      {displayMyPosts}
    </div>
  );
}
