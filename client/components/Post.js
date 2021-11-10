import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
function Post({ postBody, postAuthor, postCreated }) {
  const apiEndpoint = `http://localhost:5000/api/users/${postAuthor}`;
  const { data, error } = useSWR(apiEndpoint, fetcher);

  if (error) return <div>failed</div>;
  if (!data) return <div>loading</div>;
  const fullName = Object.values(data.name[0]).slice(0, -1).join("");
  const timestamp = new Date(postCreated).toISOString().substring(0, 10);
  return (
    <div className="flex bg-gray-100 w-full justify-between p-2 rounded">
      <div className="flex w-full">
        <div className="w-12 h-12 rounded-full">
          <img
            className="flex rounded-full w-12 h-12"
            src={data.image}
            alt="avatar"
          />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full justify-between px-2">
            <p>{fullName}</p>
            <p className="font-light text-gray-600">{timestamp}</p>
          </div>
          <div className="flex px-2">
            <p>{postBody}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
