import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="relative text-lg h-16 bg-white w-full px-2">
      <div className="h-full flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <Link href="/" className="font-bold text-purple-700 text-2xl">
            ArtMart
          </Link>
        </div>
        {status === "loading" ? null : status === "authenticated" ? (
          <div className="flex items-stretch space-x-3">
            <Link
              className=" bg-purple-200 px-2 hover:bg-purple-300 rounded-md"
              href={`/user/${session.user!.id}`}
            >
              {session.user!.name}
            </Link>
            <span>|</span>
            <button
              className="bg-purple-200 px-2 hover:bg-purple-300 rounded-md"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-purple-200 px-2 hover:bg-purple-300 rounded-md"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600" />
    </nav>
  );
};

export default Navbar;
