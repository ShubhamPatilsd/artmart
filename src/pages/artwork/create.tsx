import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useS3Upload } from "next-s3-upload";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function CreateArtwork() {
  let { uploadToS3 } = useS3Upload();

  coconsodlelogynhc
    ent han: RFieeChance = ast.h (angeEvent<HTMLInputElement>
  ) => {
    let file = event.target.files[0];
    if (!file.type.startsWith("image/")) return;
    let { url } = await uploadToS3(file);

    coe.log("Successfully uploaded to S3!", url);
  };

  return (
    <>
      <div className="md:py-32 md:px-48 px-32 py-16 min-h-screen bg-slate-200">
        {/* <div className="flex justify-center align-center"> */}
        <p className="rotate-45 font-bold text-2xl -mb-4  rounded-lg   bg-opacity-10 w-fit">
          ✨
        </p>
        <p className="font-bold text-4xl p-2 rounded-lg  bg-purple-400 bg-opacity-10 w-fit">
          Upload your Artwork!
        </p>
        {/* </div> */}
        {/* <div className="flex justify-center align-center"> */}
        <div className="mt-12">
          <div>
            <label
              htmlFor="title"
              className="block text-md font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              className="block rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
              placeholder="Ex: Cool unicorn"
            />
          </div>
          <div className="mt-8">
            <label
              htmlFor="Description"
              className="block text-md font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              // type="text"
              name="description"
              className="block rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
              placeholder="My cool art piece!"
            />
          </div>
          <div className="mt-4">
            <input type="file" onChange={handleFileChange} />
          </div>{" "}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
