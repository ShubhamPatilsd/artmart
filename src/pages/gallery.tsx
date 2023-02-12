import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { db } from "@/db/db";
import { Post } from "@/components/Post";
import { Post as PostType } from "@prisma/client";
import { useRouter } from "next/router";
import Gallery from "@/components/Gallery";

export default function Dashboard({
  posts,
}: {
  posts: (PostType & {
    author: {
      name: string;
      image: string;
    };
  })[];
}) {
  return (
    <div className="min-h-screen bg-slate-200 w-screen px-4">
      <Gallery posts={posts} />
    </div>
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
