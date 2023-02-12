import { db } from "@/db/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Post } from "@/types/Post";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useS3Upload } from "next-s3-upload";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Trade = ({ individualArtwork }: { individualArtwork: Post }) => {
  let { uploadToS3 } = useS3Upload();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    let file = event.target.files[0];
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    let { url } = await uploadToS3(file);

    console.log("Successfully uploaded to S3!", url);
    setPreviewUrl(url);
    setUploading(false);
  };

  const submitTrade = async () => {
    if (!previewUrl) {
      return;
    }
    await fetch("/api/trade/send", {
      method: "POST",
      body: JSON.stringify({
        theirArtId: individualArtwork.id,
        myArtUrl: previewUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPreviewUrl("");
  };
  return (
    <div className="flex flex-col mx-auto items-stretch max-w-3xl w-full md:py-24 md:px-36 px-24 py-16 space-y-2">
      <h1 className="text-center text-3xl font-bold">Trade For</h1>

      <div>{individualArtwork.title}</div>
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full object-cover object-center"
          src={individualArtwork.author.image}
          alt=""
        />
        <div>{individualArtwork.author.name}</div>
      </div>
      <img
        className="lg:w-96 w-full lg:h-auto h-64 object-cover object-center rounded"
        src={individualArtwork.imageUrl}
      />

      <div className="relative rounded-lg  p-[2px] bg-gradient-to-r from-purple-400 to-purple-700">
        <div className="bg-white p-16 rounded-md space-y-2">
          {/* <Ociton */}
          <input
            className="w-full h-full absolute top-0 left-0 rounded-md cursor-pointer opacity-0"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* <p className="font-bold text-purple-600"> Upload Image</p> */}
          <FiUploadCloud className="text-purple-700 mx-auto" size={50} />
          <p className="text-sm font-mono text-gray-500 text-center ">
            {uploading
              ? "Uploading..."
              : previewUrl
              ? "Replace with another picture of your art"
              : "Upload a picture of your art"}
          </p>
        </div>
      </div>

      <img src={previewUrl} />
      <button
        disabled={!previewUrl}
        onClick={() => submitTrade()}
        className="disabled:saturate-50 disabled:cursor-not-allowed rounded-md px-6 py-3.5 font-bold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600 enabled:hover:from-pink-400 enabled:hover:via-fuchsia-600 enabled:hover:to-purple-700 text-white text-lg w-full"
      >
        Request Trade
      </button>
    </div>
  );
};

export default Trade;

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
