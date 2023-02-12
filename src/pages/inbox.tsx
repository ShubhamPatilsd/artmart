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

export default function Inbox({ posts }: { posts: Post[] }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <div className="w-[75%]">
        {dummyData.map((post, i) => {
          const { getCollapseProps, getToggleProps, isExpanded } =
            useCollapse();
          return (
            <div className="border-t hover:shadow-md relative px-6 py-4  justify-between cursor-pointer border-purple-300 shadow-purple-200">
              <p className="font-bold font-mono text-gray-600 text-sm text-left">
                {post.subject}
              </p>
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
              <p {...getCollapseProps()} className="text-center">
                {" "}
                <img src={post.imageUrl} className="w-full rounded-md" />
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
      authorId: session.user?.email,
    },
    include: {
      to: true,
      from: true,
      postInQuestion: true,
    },
  });
  return { props: { posts: JSON.parse(JSON.stringify(requests)) } };
};
