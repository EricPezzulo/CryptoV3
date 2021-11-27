import axios from "axios";
import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { nameConverter } from "../../utils/helpers";
import SearchIcon from "@mui/icons-material/Search";
import Search from "@mui/icons-material/Search";
export async function getServerSideProps() {
  const users = await fetch(`http://localhost:5000/api/users`);
  const data = await users.json();
  return {
    props: { users: data.data },
  };
}

function users({ users }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const { data: session } = useSession();
  const [listOfUsers, setListOfUsers] = useState(users);
  const [following, setFollowing] = useState(null);

  return (
    <div className="flex flex-col w-full min-h-screen bg-Eerie-Black">
      <Header />
      <div className="flex flex-col items-center w-full h-full">
        <div className="flex items-center mt-5 mb-2 justify-center h-8 bg-Davys-Gray rounded-full px-1">
          <SearchIcon className=" text-white" />
          <input
            type="text"
            className="flex text-white font-normal px-1 w-full bg-transparent outline-none"
          />
        </div>
        {listOfUsers
          .filter((i) => {
            return i._id !== session?.id;
          })
          .map((user, key) => {
            return (
              <div key={user._id} className="flex my-1 h-full w-3/5 px-10">
                <UserCard
                  name={nameConverter(user)}
                  avatar={user.image}
                  userID={user._id}
                  sessionID={session?.id}
                  userData={user}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default users;
