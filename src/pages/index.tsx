import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <>
      <div
        className="md:block hidden absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="animate-bounce-slow">
          <svg
            width="1360"
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
      </div>
      <div
        className={`md:py-24 md:px-36 px-24 py-16 min-h-screen bg-slate-200`}
      >
        {/* <p className=" text-6xl text-opzacity-20">uwi</p>t */}
        <div className="text-center align-center text-black text-6xl">🌃</div>
        <div className="flex justify-center align-center mt-">
          <p className="font-bold text-6xl p-2 rounded-lg  bg-purple-400 bg-opacity-10 w-fit">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-700">
              Art
            </span>
            Mart
          </p>
        </div>
        <p className="text-center font-bold text-lg font-mono	">
          The place for trading art pieces.
        </p>{" "}
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
          <div className="flex justify-center align-center">
            <button
              onClick={() => signIn("google")}
              className={`hover:scale-105 duration-300 mt-6 space-x-2 flex items-center font-md w-max p-2.5 border-2 rounded-lg border-purple-400`}
            >
              <FcGoogle className={`w-6 h-6`} />{" "}
              <span>Sign in with Google</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
