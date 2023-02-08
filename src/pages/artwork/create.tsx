import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function CreateArtwork() {
  let { uploadToS3 } = useS3Upload();
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    let file = event.target.files[0];
    if (!file.type.startsWith("image/")) return;
    let { url } = await uploadToS3(file);

    console.log("Successfully uploaded to S3!", url);
    setPreviewUrl(url);
  };

  return (
    <>
      <div
        className={`md:py-24 md:px-36 px-24 py-16 space-y-2 min-h-screen bg-slate-200`}
      >
        <p className="text-4xl font-bold">Upload your artwork!</p>
        <div className="w-full space-y-1">
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

        <div className="w-full space-y-1">
          <label
            htmlFor="description"
            className="block text-md font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            // type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            name="description"
            className="block w-full rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
            placeholder="My cool art piece!"
          />
        </div>
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
              {previewUrl
                ? "Replace with another picture of your art"
                : "Upload a picture of your art"}
            </p>
          </div>
        </div>
        <img src={previewUrl} />

        <button
          onClick={() => {
            console.log({
              title,
              description,
              imageUrl: previewUrl,
              category: "sculpture",
              preferredTrade: "painting",
            });
            axios({
              method: "POST",
              url: "/api/post/create",
              data: {
                title,
                description,
                imageUrl: previewUrl,
                category: "sculpture",
                preferredTrade: "painting",
              },
            });
          }}
          className="rounded-md px-6 py-4 font-bold bg-gradient-to-r from-purple-400 to-purple-700 text-white text-lg w-full"
        >
          Next
        </button>
      </div>
    </>
  );
}
