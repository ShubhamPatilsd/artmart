import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { db } from "@/db/db";
import { Post } from "@/components/Post";

export default function Dashboard({ posts }: { posts: Post[] }) {
  return (
    <div>
      {posts.map((post, i) => {
        return (
          <div>
            <Post
              coverPhoto={post.imageUrl}
              authorName={post.author.name}
              authorPhoto={post.author.image}
              title={post.title}
              description={post.description}
              category={post.category}
            />
          </div>
        );
      })}
    </div>
  );
}

interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  preferredTrade: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}

interface Author {
  image: string;
  name: string;
}

export const getServerSideProps = async () => {
  const posts = await db.post.findMany({
    where: {},
    include: {
      author: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  console.log(JSON.stringify(posts));
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};
