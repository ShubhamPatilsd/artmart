import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useS3Upload } from "next-s3-upload";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useState,
} from "react";
import { FiUploadCloud } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

export default function CreateArtwork() {
  let { uploadToS3 } = useS3Upload();
  const [previewUrl, setPreviewUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>();
  const [preference, setPreference] = useState<string>();
  const [uploading, setUploading] = useState(false);

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

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handlePreferenceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreference(e.target.value);
  };

  const submitArt = async () => {
    if (!title || !description || !previewUrl || !category || !preference) {
      return;
    }
    await fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        imageUrl: previewUrl,
        category,
        preferredTrade: preference,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("clearing....");
    setTitle("");
    setDescription("");
    setPreviewUrl("");
    setCategory(undefined);
    setPreference(undefined);
    console.log("cleared...");
  };

  return (
    <div className="bg-slate-200">
      <div
        className={`mx-auto max-w-3xl md:py-24 md:px-36 px-24 py-16 space-y-2 min-h-screen`}
      >
        <p className="text-4xl font-bold">Upload your artwork!</p>
        <div className="w-full space-y-1">
          <label htmlFor="title" className="block font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
            placeholder="Ex: Cool unicorn"
          />
        </div>

        <div className="w-full space-y-1">
          <label
            htmlFor="description"
            className="block font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            // type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            name="description"
            className="block w-full rounded-md border-2 border-purple-600 px-4 py-2 outline-none  sm:text-sm"
            placeholder="My cool art piece!"
            value={description}
          />
        </div>
        <div className="accent-purple-600">
          <div className="block font-bold text-gray-700">Type of Art</div>
          <div>
            <input
              className=""
              type="radio"
              name="category"
              value="painting"
              id="painting_category"
              checked={category === "painting"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="painting_category" className="ml-2">
              2D Art
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="category"
              value="sculpture"
              id="sculpture_category"
              checked={category === "sculpture"}
              onChange={handleCategoryChange}
            />
            <label htmlFor="sculpture_category" className="ml-2">
              3D Art
            </label>
          </div>
        </div>

        <div className="accent-purple-600">
          <div className="block font-bold text-gray-700">Trade Preference</div>
          <div className="text-sm text-gray-500 mb-1">
            The type of art you'd prefer to receive in a trade.
          </div>
          <div>
            <input
              className=""
              type="radio"
              name="preference"
              value="painting"
              id="painting_preference"
              checked={preference === "painting"}
              onChange={handlePreferenceChange}
            />
            <label htmlFor="painting_preference" className="ml-2">
              2D Art
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="preference"
              value="sculpture"
              id="sculpture_preference"
              checked={preference === "sculpture"}
              onChange={handlePreferenceChange}
            />
            <label htmlFor="sculpture_preference" className="ml-2">
              3D Art
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="preference"
              value="none"
              id="no_preference"
              checked={preference === "none"}
              onChange={handlePreferenceChange}
            />
            <label htmlFor="no_preference" className="ml-2">
              No preference
            </label>
          </div>
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
          disabled={
            !title || !description || !previewUrl || !category || !preference
          }
          onClick={() => submitArt()}
          className="disabled:saturate-50 disabled:cursor-not-allowed rounded-md px-6 py-3.5 font-bold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-600 enabled:hover:from-pink-400 enabled:hover:via-fuchsia-600 enabled:hover:to-purple-700 text-white text-lg w-full"
        >
          Post
        </button>
      </div>
    </div>
  );
}
