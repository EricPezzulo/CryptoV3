import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserCard from "./UserCard";
import axios from "axios";
import { nameConverter } from "../utils/helpers";
function SearchBar({ session }) {
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/users");
      const users = res.data.data;
      setFilteredUsers(users);
    };
    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex bg-Davys-Gray rounded-full px-2 py-1 my-4">
        <SearchIcon className="text-white" />
        <input
          type="text"
          className="flex text-white font-light px-1 w-full bg-transparent outline-none"
          placeholder={"Search for user"}
        />
      </div>

      <div className="flex flex-col w-full items-center">
        {filteredUsers
          .filter((i) => {
            return i._id != session?.id;
          })
          .map((user, key) => {
            return (
              <div key={key} className="flex my-1 h-full w-3/5 px-10">
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

export default SearchBar;
