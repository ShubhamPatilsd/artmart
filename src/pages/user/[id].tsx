import { db } from "@/db/db";
import { GetServerSideProps } from "next";

const UserPage = ({ id }: { id: string }) => {
  return <div>user profile page lol {id} </div>;
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
      id,
    },
  };
};
