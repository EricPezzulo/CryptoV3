import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import Loader from "../components/Loader";
import EndMsg from "../components/EndMsg";

function App() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(
        `http://localhost:5000/api/posts?page=1&limit=20`
        // For json server use url below
        // `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
      );
      const data = await res.json();
      setItems(data);
    };

    getPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch(
      `http://localhost:5000/api/posts?page=${page}&limit=20`
      // For json server use url below
      // `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const postsFromServer = await fetchPosts();

    setItems([...items, ...postsFromServer]);
    if (postsFromServer.length === 0 || postsFromServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };
  console.log(items);
  return (
    <div className="flex flex-col w-full bg-gray-400">
      <div className="flex flex-col mx-20">
        <InfiniteScroll
          className="flex flex-col"
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<Loader />}
          endMessage={<EndMsg />}
        >
          {items.map((item, key) => {
            return (
              <div
                className="flex my-1 w-full items-center justify-center"
                key={key}
              >
                <Post
                  postAuthor={item.postAuthor}
                  postBody={item.postBody}
                  postCreated={item.createdAt}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default App;
