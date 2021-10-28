import { useSession, signIn, signOut } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useRouter } from "next/router";

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
    <div className="flex flex-col min-h-screen">
      Not signed in <br />{" "}
      <div className="flex">
        <div className="flex rounded px-3 py-1">
          <div className="flex">
            <div className="flex px-2">
              <GitHubIcon
                onClick={() =>
                  signIn("github", { callbackUrl: "http://localhost:3000" })
                }
              />
            </div>
            <div className="flex px-2">
              {/* <GoogleIcon onClick={() => signIn("google")} /> */}
            </div>
            <div className="flex px-2">
              <TwitterIcon
                onClick={() =>
                  signIn("twitter", { callbackUrl: "http://localhost:3000" })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
