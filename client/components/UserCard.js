function UserCard({ userName, firstName, lastName, watchlists }) {
  return (
    <div className="flex h-14 w-full bg-gradient-to-tr from-gray-800 to-gray-700 rounded-lg justify-between items-center">
      <div className="flex w-full justify-between mx-2">
        <div className="flex w-full h-10">
          <img
            className="flex rounded-full"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pphfoundation.ca%2Fwp-content%2Fuploads%2F2018%2F05%2Fdefault-avatar.png&f=1&nofb=1"
            alt="avatar"
          />
        </div>
        <div className="flex w-full">
          <p className="text-white">Username: {userName}</p>
        </div>
        <div className="flex w-full">
          <p className="text-white">
            Name: {firstName} {lastName}
          </p>
        </div>
        <div className="flex w-full">
          <p className="text-white">{watchlists}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
