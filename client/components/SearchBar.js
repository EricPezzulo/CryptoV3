import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UserCard from "./UserCard";
import { nameConverter } from "../utils/helpers";

function SearchBar({ placeholder, data, session }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [listOfNames, setListOfNames] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    const fullName = nameConverter(data);
    const newFilter = data.filter((user) => {
      return user.name.includes(searchWord);
    });
    setFilteredUsers(newFilter);
  };
  console.log(listOfNames);
  return (
    <div className="flex flex-col items-center">
      <div className="flex bg-Davys-Gray rounded-full px-2 py-1 my-4">
        <SearchIcon className="text-white" />
        <input
          type="text"
          className="flex text-white font-light px-1 w-full bg-transparent outline-none"
          placeholder={placeholder}
          onChange={handleFilter}
        />
      </div>

      {filteredUsers.length != 0 && (
        <div className="flex flex-col w-full items-center">
          {data
            .filter((i) => {
              return i._id != session?.id;
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
      )}
    </div>
  );
}

export default SearchBar;
