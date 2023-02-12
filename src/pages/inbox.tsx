import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { db } from "@/db/db";
import { Post as PostCard } from "@/components/Post";
import { useRouter } from "next/router";
import { Post } from "../types/Post";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import truncate from "truncate";
import useCollapse from "react-collapsed";
import { VscTriangleRight } from "react-icons/vsc";
import { HiX, HiOutlineBadgeCheck } from "react-icons/hi";

const dummyData = [
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
    imageUrl:
      "https://evergreen-media.s3.us-west-1.amazonaws.com/next-s3-uploads/606df81b-8e37-424d-a5d9-9fd7cad00372/Frame-1-(2).png",
  },
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
  },
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
  },
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
  },
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
  },
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
  },
  {
    subject: "New trade request for Mono Liso from Gautam Paranjape",
  },
];

export default function Inbox({ posts }: { posts: any[] }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="w-[75%] pt-2">
        {posts.map((post, i) => {
          const { getCollapseProps, getToggleProps, isExpanded } =
            useCollapse();
          return (
            <div
              className={`${
                i !== 0 && "border-t"
              } hover:shadow-md relative px-6 py-4  justify-between cursor-pointer border-purple-300 shadow-purple-200`}
            >
              <div className="flex items-center justify-between">
                <p className="font-bold font-mono text-gray-600 text-sm text-left">
                  New trade request for {post.postInQuestion.title}
                </p>

                <div className="flex rounded-md border">
                  {/* <button> */}
                  <HiOutlineBadgeCheck
                    className="p-2 hover:bg-slate-100 hover:text-purple-700 rounded-l-md"
                    size={35}
                    onClick={() => {
                      alert("hi");
                    }}
                  />

                  <HiX
                    className="p-2 hover:bg-slate-100 hover:text-red-700 rounded-r-md border-l"
                    size={35}
                    onClick={() => {
                      alert("hi");
                    }}
                  />
                  {/* </button> */}
                </div>
              </div>
              <button
                className="mt-2 flex space-x-1 items-center"
                {...getToggleProps()}
              >
                {" "}
                <VscTriangleRight
                  className={`${isExpanded && "rotate-90"} text-gray-600`}
                  size={12}
                />
                <p className="text-xs text-gray-600 mb-1">Expand</p>
              </button>

              {isExpanded}
              <p {...getCollapseProps()} className="">
                {" "}
                <img
                  src={post.imageUrl}
                  className="w-full max-w-xl h-auto rounded-md"
                />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const requests = await db.trade.findMany({
    where: {
      authorId: session.user?.id,
    },
    include: {
      to: true,
      from: true,
      postInQuestion: true,
    },
  });
  return { props: { posts: JSON.parse(JSON.stringify(requests)) } };
};
