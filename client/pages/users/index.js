import Header from "../../components/Header";
import { useSession } from "next-auth/react";
import SearchBar from "../../components/SearchBar";

function users() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col w-full min-h-screen bg-Eerie-Black">
      <Header />
      <div className="">
        <SearchBar session={session} />
      </div>
    </div>
  );
}

export default users;
