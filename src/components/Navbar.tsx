import { db } from "@/db/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiOutlinePencilAlt, HiInbox, HiLogout, HiUser } from "react-icons/hi";
import { MdOutlineOutbox } from "react-icons/md";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <nav className="relative text-lg h-16 bg-white w-full px-2">
      <div className="h-full flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <Link href="/" className="font-bold text-purple-700 text-2xl">
            🎨 {"  ArtMart"}
          </Link>
        </div>
        {status === "loading" ? null : status === "authenticated" ? (
          <div className="flex items-stretch space-x-3 text-sm">
            <button
              // className="bg-purple-200 rounded-full hover:bg-purple-300 p-2"
              onClick={() => router.push("/artwork/create")}
            >
              <HiOutlinePencilAlt
                size={35}
                className="bg-purple-200 hover:bg-purple-300 p-2 rounded-full"
              />
            </button>

            <button
              // className="bg-purple-200 rounded-full hover:bg-purple-300 p-2"
              onClick={() => router.push("/inbox")}
            >
              <HiInbox
                size={35}
                className="bg-purple-200 hover:bg-purple-300 p-2 rounded-full"
              />
            </button>

            <button
              // className="bg-purple-200 rounded-full hover:bg-purple-300 p-2"
              onClick={() => router.push("/inbox")}
            >
              <MdOutlineOutbox
                size={35}
                className="bg-purple-200 hover:bg-purple-300 p-2 rounded-full"
              />
            </button>
            <Link
              // className=" bg-purple-200 px-2 hover:bg-purple-300 rounded-md"
              href={`/user/${session.user!.id}`}
            >
              <HiUser
                size={35}
                className="bg-purple-200 hover:bg-purple-300 p-2 rounded-full"
              >
                <p>{session.user.name}</p>
              </HiUser>
            </Link>

            <button
              className="bg-purple-200 hover:bg-purple-300 rounded-full"
              onClick={() => signOut()}
            >
              <HiLogout
                size={35}
                className="bg-purple-200 hover:bg-purple-300 p-2 rounded-full"
              />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-purple-200 px-2 hover:bg-purple-300 rounded-md text-sm"
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
