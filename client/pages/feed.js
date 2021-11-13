import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import Post from "../components/Post";
import useSWR from "swr";
import NewPost from "../components/NewPost";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const apiEndpoint = `http://localhost:5000/api/posts`;

// export async function getServerSideProps() {
//   const res = await fetch(apiEndpoint);
//   const data = await res.json();
//   console.log(data);
//   return {
//     props: { data: data },
//   };
// }

function feed({ data }) {
  // const { data, error } = useSWR(apiEndpoint, fetcher);
  // if (error) return <div>error</div>;

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
    <div>
      <Header />
      <div className="flex flex-col items-center py-5">
        <p className="text-4xl font-thin">POST FEED</p>
      </div>
      <div className="flex w-full justify-center items-center">
        <NewPost />
      </div>
      <div className="flex flex-col items-center w-full">
        {postData.reverse().map((i) => {
          return (
            <div key={i._id} className="flex w-3/5 my-2">
              <Post
                postBody={i.postBody}
                postCreated={i.createdAt}
                postAuthor={i.postAuthor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default feed;
