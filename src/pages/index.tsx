import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { getSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  ext: any;
}

export default function Home({ ext }: Props) {
  return (
    <>
      <div
        className={`md:py-24 md:px-36 px-24 py-16 min-h-screen bg-slate-200`}
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
        <p className="text-center font-bold text-lg font-mono	">
          The place for trading art pieces.
        </p>{" "}
        <div className="flex justify-center align-center">
          <button
            onClick={() => signIn("google")}
            className={`hover:scale-105 duration-300 mt-6 space-x-2 flex border-purple-300 items-center font-md w-max p-2.5 border-2 rounded-lg`}
          >
            <FcGoogle className={`w-6 h-6`} /> <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      ext: session,
    },
  };
}
