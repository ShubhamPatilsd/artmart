import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="text-lg h-16 bg-purple-100 w-full px-2">
      <div className="h-full flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <Link href="/" className="font-bold text-purple-700 text-2xl">
            ArtMart
          </Link>
        </div>
        {status === "loading" ? null : status === "authenticated" ? (
          <div className="space-x-3">
            <Link href={`/user/${session.user!.id}`}>{session.user!.name}</Link>
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
    </nav>
  );
};

export default Navbar;
