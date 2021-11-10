import axios from "axios";
import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/api/users`);
  const data = await res.json();
  return {
    props: { data: data },
  };
}

function users() {
  const { data: session } = useSession();
  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios({
          url: `http://localhost:5000/api/users`,
          method: "GET",
        });
        setListOfUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-col items-center w-full h-full">
        {listOfUsers
          .filter((i) => {
            return i._id !== session?.id;
          })
          .map((user, key) => {
            return (
              <div key={user._id} className="flex my-1 h-full w-3/5 px-10">
                <UserCard
                  name={Object.values(user.name[0]).slice(0, -1).join("")}
                  avatar={user.image}
                  userID={user._id}
                  sessionID={session?.id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default users;
