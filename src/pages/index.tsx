import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Gallery from "@/components/Gallery";
import { Post } from "@prisma/client";
import { db } from "@/db/db";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  posts,
}: {
  posts: (Post & {
    author: {
      name: string;
      image: string;
    };
  })[];
}) {
  const { data: session, status } = useSession();
  return (
    <>
      <div
        className="md:block hidden absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          className="animate-bounce-slow"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#cbb0e8" offset="0%" />
              <stop stopColor="#dbcfe8" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>
      <div
        className={`md:py-24 md:px-36 px-24 py-16 space-y-4 min-h-screen bg-slate-200 flex flex-col items-center`}
      >
        {/* <p className=" text-6xl text-opzacity-20">uwi</p>t */}
        <div className="text-center align-center text-black text-6xl">🌃</div>
        <div className="flex justify-center align-center">
          <p className="font-bold text-6xl p-2 rounded-lg  bg-purple-400 bg-opacity-10 w-fit">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-700">
              Art
            </span>
            Mart
          </p>
        </div>
        <p className="text-center font-bold text-lg font-mono">
          Trade your art. Get back your sense of community.
        </p>
        <div className="space-x-2 mt-4">
          <Link
            href="/artwork/create"
            className="text-white transition-all duration-500 bg-gradient-to-br to-indigo-600 via-purple-500 from-fuchsia-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-xl font-semibold rounded-md px-6 py-2"
          >
            Upload Art
          </Link>
          <Link
            href="/gallery"
            className="text-white transition-all duration-500 bg-gradient-to-br to-emerald-500 via-cyan-500 from-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 text-xl font-semibold rounded-md px-6 py-2"
          >
            View Gallery
          </Link>
        </div>

        <Gallery posts={posts} />
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const posts = await db.post.findMany({
    where: {},
    include: {
      author: {
        select: {
          image: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};
