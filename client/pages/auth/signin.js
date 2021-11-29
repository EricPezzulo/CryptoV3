import { useSession, signIn, signOut } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";
import Header from "../../components/Header";

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
    <div className="flex flex-col w-full items-center min-h-screen bg-Eerie-Black">
      <Header />
      <div
        className="flex bg-Jet-Gray rounded
      mt-10 sm:w-1/4 py-4 flex-col items-center justify-center"
      >
        <p className="text-2xl font-light text-white">Sign In</p>
        <div className="flex">
          <div className="flex w-full rounded px-3 py-1">
            <div className="flex flex-col">
              <div
                className="flex px-2 bg-Davys-Gray rounded w-full items-center py-1 cursor-pointer my-1 hover:bg-gray-500 duration-150 ease-in-out"
                onClick={() =>
                  signIn("github", { callbackUrl: "http://localhost:3000" })
                }
              >
                <GitHubIcon className="hover:cursor-pointer text-3xl text-white" />
                <p className="px-2 text-white font-light">Login with Github</p>
              </div>
              <div className="flex px-2">
                {/* <GoogleIcon onClick={() => signIn("google")} /> */}
              </div>
              <div className="flex">
                <div
                  className="flex px-2 bg-Davys-Gray-light rounded w-full items-center py-1 cursor-pointer my-1 hover:bg-gray-500 duration-150 ease-in-out"
                  onClick={() =>
                    signIn("twitter", {
                      callbackUrl: "http://localhost:3000",
                    })
                  }
                >
                  <TwitterIcon className="hover:cursor-pointer text-3xl text-white" />
                  <p className="px-2 text-white font-light">
                    Login with Twitter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
