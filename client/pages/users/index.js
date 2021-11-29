import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { nameConverter } from "../../utils/helpers";
import SearchBar from "../../components/SearchBar";
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-Eerie-Black">
      <Header />
      <div className="">
        <SearchBar
          placeholder="Search a user"
          data={listOfUsers}
          session={session}
        />
      </div>
    </div>
  );
}

export default users;
