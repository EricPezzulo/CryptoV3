import fetch from "isomorphic-unfetch";
import UserCard from "../../components/UserCard";

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/api/users`);
  const data = await res.json();
  return {
    props: { data },
  };
}

function users({ data }) {
  const users = data.data;
  console.log(users);
  // console.log(users[5].name[0].join);
  return (
    <div className="flex flex-col w-full h-full">
      <h1>userspage</h1>
      <div className="flex flex-col w-full h-full">
        {users.map((user, key) => {
          return (
            <div key={user._id} className="flex my-1 h-full w-full px-10">
              {/* <p>{user?.watchlists[6]?.coins[0]?.coinName}</p> */}
              <UserCard
                firstName={user.name[0].firstName}
                lastName={user.name[0].lastName}
                userName={user.name[0].userName}
                watchlistName={user.watchlists[0].watchlistName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default users;
