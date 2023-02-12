import { db } from "@/db/db";
import { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { authOptions } from "../api/auth/[...nextauth]";
import { Post } from "@/types/Post";
import Link from "next/link";

interface IndividualArtworkProps {
  individualArtwork: Post;
}

const IndividualArtwork: NextPage<IndividualArtworkProps> = ({
  individualArtwork,
}) => {
  const router = useRouter();

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="lg:w-11/12 mx-auto flex flex-wrap">
        <img
          className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          src={individualArtwork.imageUrl}
        />
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm text-gray-500 tracking-widest">LISTING</h2>
          <h1
            className="text-gray-900 text-3xl font-medium mb-1"
            style={{ cursor: "auto" }}
          >
            {individualArtwork.title}
          </h1>
          <div className="flex mb-4">
            <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
              {individualArtwork.category}
            </span>
          </div>
          <p className="leading-relaxed">{individualArtwork.description}</p>
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
          <div className="flex">
            <span className="font-medium text-sm">
              <div className="flex space-x-2">
                <p>Preference </p>
                <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
                  {individualArtwork.category}s
                </span>
              </div>
            </span>
            <Link
              className="flex ml-auto bg-purple-700 py-1.5 px-6 text-base font-semibold text-white rounded-md hover:from-pink-400 hover:via-fuchsia-600 hover:to-purple-700"
              href={`/artwork/${individualArtwork.id}/trade`}
            >
              Trade
            </Link>
          </div>
          <p className="text-sm font-medium pt-5">Listed By</p>
          <div className="flex items-center pt-3">
            <img
              className="h-10 w-10 rounded-full object-cover object-center"
              src={individualArtwork.author.image}
              alt=""
            />
            <div className="mx-4">
              <h1 className="text-sm font-semibold text-gray-700">
                {individualArtwork.author.name}
              </h1>
              <p className="text-sm text-gray-500">
                {individualArtwork.author.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualArtwork;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const artworkId = context.params?.id;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const individualArtwork = await db.post.findUnique({
      where: {
        id: artworkId?.toString(),
      },
      include: {
        author: true,
      },
    });

    return {
      props: {
        individualArtwork: JSON.parse(JSON.stringify(individualArtwork)),
      },
    };
  }
};
