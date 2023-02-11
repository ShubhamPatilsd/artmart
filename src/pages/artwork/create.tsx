import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

export default function CreateArtwork() {
  let { uploadToS3 } = useS3Upload();
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);

    console.log("Successfully uploaded to S3!", url);
    setPreviewUrl(url);
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello artwork!</h1>
      <div className="space-y-4 p-16 max-w-3xl">
        <div className="w-full">
          <label
            htmlFor="title"
            className="block text-md font-bold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
            placeholder="Ex: Cool unicorn"
          />
        </div>

        {title}

        <div className="w-full">
          <label
            htmlFor="description"
            className="block text-md font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            // type="text"
            name="description"
            className="block w-full rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
            placeholder="My cool art piece!"
          />
        </div>
        <div className="relative  rounded-md  p-[4px] bg-gradient-to-r from-purple-400 to-purple-700">
          <div className="bg-white p-16 rounded-md">
            {/* <Ociton */}
            <input
              className="w-full h-full absolute top-0 left-0 rounded-md cursor-pointer opacity-0"
              type="file"
              onChange={handleFileChange}
            />
            {/* <p className="font-bold text-purple-600"> Upload Image</p> */}
            <FiUploadCloud className="bg-gradient-to-r from-purple-400 to-purple-700" />
          </div>
        </div>
        <img src={previewUrl} />

        <button
          onClick={() => {}}
          className="rounded-md px-6 py-4 font-bold bg-gradient-to-r from-purple-400 to-purple-700 text-white text-lg w-full"
        >
          Next
        </button>
      </div>
    </>
  );
}
