import { Post as PostType } from "@prisma/client";
import Link from "next/link";
import { Post } from "./Post";

export default function Gallery({
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
    <div className="max-w-5xl min-w-2xl mx-auto py-8">
      <div className="grid sm:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-4">
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
  );
}
