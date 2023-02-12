import { db } from "@/db/db";
import { Post } from "@prisma/client";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Image from "next/image";

const UserPage = ({
  user,
  posts,
}: {
  user: Pick<User, "id" | "name" | "image">;
  posts: Pick<Post, "id" | "title" | "description" | "imageUrl">[];
}) => {
  return (
    <div className="px-2 py-8 bg-slate-200 min-h-screen">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-fit border-4 border-purple-200 rounded-full overflow-hidden">
          <Image
            alt={`${user.name}'s pfp`}
            src={user.image!}
            height={128}
            width={128}
          />
        </div>
        <h1 className="text-4xl font-bold mt-4">{user.name}</h1>
        <div className="mt-8 grid gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => {
            return (
              <div
                key={post.id}
                className="bg-white rounded-md overflow-hidden group relative w-56 aspect-square"
              >
                <div className="absolute z-10 w-full h-full group-hover:bg-slate-800/70 duration-150" />
                <div className="px-2 py-2 group-hover:opacity-100 opacity-0 duration-150 absolute z-10 text-white text-center flex flex-col items-center justify-center w-full h-full">
                  <span className="font-semibold italic text-xl">
                    {post.title}
                  </span>
                  <span className="line-clamp-3 font-light text-ellipsis">
                    {post.description}
                  </span>
                </div>

                <Image
                  alt={`${user.name}'s artwork`}
                  src={post.imageUrl}
                  fill
                  className="object-cover object-center"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;
  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });
  if (!user) {
    return {
      notFound: true,
    };
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
    },
  });

  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
      posts,
    },
  };
};
