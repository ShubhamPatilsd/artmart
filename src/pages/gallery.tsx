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
  const router = useRouter();

  return (
    <div className="bg-slate-200 px-8">
      <div className="max-w-5xl mx-auto py-8">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post, i) => {
            return (
              <Link href={`/artwork/${post.id}`} key={post.id}>
                <Post
                  coverPhoto={post.imageUrl}
                  authorName={post.author.name}
                  authorPhoto={post.author.image}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                />
              </Link>
            );
          })}
        </div>
      </div>
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
