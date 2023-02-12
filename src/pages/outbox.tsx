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
  showEmail = false,
}: {
  posts: (Trade & {
    postInQuestion: Post;
    to: User;
    from: User;
  })[];
  showEmail?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <div className="w-full space-y-2">
        {posts.map((post, i) => {
          return (
            <div
              className={`${
                i !== 0 && "border-t"
              } relative px-6 py-4  justify-between cursor-pointer border-2 rounded-md hover:bg-slate-100`}
            >
              <p className="font-bold  text-gray-600 text-xl text-left">
                {post.postInQuestion.title}
              </p>
              <p className="text-sm">By {post.to.name}</p>
              {showEmail ? (
                <a className="text-purple-600" href={`mailto:${post.to.email}`}>
                  {post.to.email}
                </a>
              ) : null}

              <div className="mt-4">
                <span className="font-light">Their Art</span>
                <img
                  src={post.postInQuestion.imageUrl}
                  className="w-full max-w-xs h-auto rounded-md"
                />
                <div className="h-12" />
                <span className="font-light">Your Art</span>
                <img
                  src={post.imageUrl}
                  className="w-full max-w-xs h-auto rounded-md"
                />
              </div>
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
    <div className="bg-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto py-6 space-y-6">
        <div className="bg-white py-4 px-4 rounded-md">
          <h2 className="text-2xl font-bold">Pending</h2>
          <List posts={pendingRequests} />
        </div>

        <div className="bg-white py-4 px-4 rounded-md">
          <h2 className="text-2xl font-bold">Accepted</h2>
          <List posts={acceptedRequests} showEmail />
        </div>

        <div className="bg-white py-4 px-4 rounded-md">
          <h2 className="text-2xl font-bold">Rejected</h2>
          <List posts={rejectedRequests} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const pendingRequests = await db.trade.findMany({
    where: {
      requesterId: session.user?.id,
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
      requesterId: session.user?.id,
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
      requesterId: session.user?.id,
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
