import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useS3Upload } from "next-s3-upload";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function CreateArtwork() {
  let { uploadToS3 } = useS3Upload();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = event.target.files[0];
    console.log("hi");
    let { url } = await uploadToS3(file);

    console.log("Successfully uploaded to S3!", url);
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello artwork!</h1>
      <h1 className="text-3xl font-bold underline">Hello artwork!</h1>
      <div>
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

        <div>
          <label
            htmlFor="Description"
            className="block text-md font-medium text-gray-700"
          >
            Title
          </label>
          <textarea
            // type="text"
            name="description"
            className="block rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
            placeholder="My cool art piece!"
          />
        </div>
        <input type="file" onChange={handleFileChange} />
      </div>
    </>
  );
}
