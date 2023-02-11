import { db } from "@/db/db";
import { GetServerSideProps } from "next";
import { User } from "next-auth";
import Image from "next/image";

const UserPage = ({ user }: { user: Pick<User, "id" | "name" | "image"> }) => {
  return (
    <div className="px-2 py-8">
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
      </div>
    </div>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params!.id;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });
  console.log(user);
  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    },
  };
};
