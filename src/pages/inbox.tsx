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
import { Trade, TradeStatus, User } from "@prisma/client";

const List = ({
  posts,
}: {
  posts: (Trade & {
    postInQuestion: Post;
    to: User;
    from: User;
  })[];
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="w-full">
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
                  {post.postInQuestion.title}
                </p>

                <div className="flex rounded-md border">
                  {/* <button> */}
                  <HiOutlineBadgeCheck
                    className="p-2 hover:bg-slate-100 hover:text-purple-700 rounded-l-md"
                    size={35}
                    onClick={async () => {
                      await fetch("/api/trade/accept", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          tradeId: post.id,
                        }),
                      });
                      router.replace(router.asPath);
                    }}
                  />

                  <HiX
                    className="p-2 hover:bg-slate-100 hover:text-red-700 rounded-r-md border-l"
                    size={35}
                    onClick={async () => {
                      await fetch("/api/trade/decline", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          tradeId: post.id,
                        }),
                      });
                      router.replace(router.asPath);
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
};

export default function Inbox({
  posts: { pendingRequests, acceptedRequests, rejectedRequests },
}: {
  posts: {
    pendingRequests: (Trade & {
      postInQuestion: Post;
      to: User;
      from: User;
    })[];
    acceptedRequests: (Trade & {
      postInQuestion: Post;
      to: User;
      from: User;
    })[];
    rejectedRequests: (Trade & {
      postInQuestion: Post;
      to: User;
      from: User;
    })[];
  };
}) {
  return (
    <div className="w-[75%] mx-auto">
      <h2>Pending</h2>
      <List posts={pendingRequests} />

      <h2>Accepted</h2>
      <List posts={acceptedRequests} />

      <h2>Rejected</h2>
      <List posts={rejectedRequests} />
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const pendingRequests = await db.trade.findMany({
    where: {
      authorId: session.user?.id,
      status: TradeStatus.pending,
    },
    include: {
      to: true,
      from: true,
      postInQuestion: true,
    },
  });
  const acceptedRequests = await db.trade.findMany({
    where: {
      authorId: session.user?.id,
      status: TradeStatus.accepted,
    },
    include: {
      to: true,
      from: true,
      postInQuestion: true,
    },
  });
  const rejectedRequests = await db.trade.findMany({
    where: {
      authorId: session.user?.id,
      status: TradeStatus.rejected,
    },
    include: {
      to: true,
      from: true,
      postInQuestion: true,
    },
  });
  return {
    props: {
      posts: JSON.parse(
        JSON.stringify({
          pendingRequests,
          acceptedRequests,
          rejectedRequests,
        })
      ),
    },
  };
};
