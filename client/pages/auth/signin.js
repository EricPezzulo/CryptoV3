import { useSession, signIn, signOut } from "next-auth/react";

export default function SignIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />{" "}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />{" "}
      <button
        className="flex bg-blue-600 w-20 h-20"
        onClick={() => signIn("github")}
      >
        Sign in
      </button>
    </>
  );
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center h-header-screen">
        <div className="flex  items-center justify-content bg-white rounded-xl w-3/4 h-2/4 p-2">
          <div className="flex flex-col h-full w-full items-center justify-center"></div>
        </div>
      </div>
    </>
  );
}
