import React from "react";
import useSWR from "swr";
import Link from "next/link";
import { fetcher, nameConverter } from "../utils/helpers";

function Post({ postBody, postAuthor, postCreated }) {
  const apiEndpoint = `http://localhost:5000/api/users/${postAuthor}`;
  const { data, error } = useSWR(apiEndpoint, fetcher);

  if (error) return <div>failed</div>;
  if (!data) return <div>loading</div>;
  const fullName = nameConverter(data);
  const timestamp = new Date(postCreated).toISOString().substring(0, 10);
  return (
    <div className="flex bg-Eerie-Black-dark w-full justify-between p-2 sm:rounded cursor-pointer hover:bg-Davys-Gray border-t border-Davys-Gray sm:border-none duration-100">
      <Link href={`/users/${postAuthor}`}>
        <div className="flex w-full">
          <img
            className="flex w-12 h-12 rounded-full"
            src={data.image}
            alt="avatar"
          />
          <div className="flex w-full flex-col">
            <div className="flex w-full justify-between px-2">
              <p className="text-white font-semibold">{fullName}</p>
              <p className="font-light text-white">{timestamp}</p>
            </div>
            <div className="flex px-2">
              <p className="text-white font-light">{postBody}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
