interface PostProps {
  coverPhoto: string;
  authorName: string;
  authorPhoto: string;
  title: string;
  description: string;
  category: string;
}

export const Post: React.FC<PostProps> = ({
  coverPhoto,
  authorName,
  authorPhoto,
  title,
  description,
  category,
}) => {
  return (
    <div
      className={
        "group relative hover:bg-opacity-40 hover:border-transparent hover:shadow-lg duration-100 rounded-md border border-gray-300"
      }
    >
      {/* TODO: change thifs to nextjs image */}
      <div className="h-30 md:h-36 lg:h-48 rounded-lg">
        <img
          src={coverPhoto}
          className="shadow-lg relative z-10 group-hover:brightness-50 h-full w-full object-cover rounded-lg"
        />
      </div>
      <div className="">
        <div className="bg-indigo-500 bg-opacity-80 h-auto absolute opacity-0 transition duration-75 group-hover:opacity-100 z-50 bottom-3 left-3 p-2 rounded-lg  pr-8 w-auto">
          <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
            {category}
          </span>
          <h4 className="font-bold text-xl text-white">{title}</h4>
          <p className="text-sm text-gray-300 font-semibold ">{description}</p>
          <p className="text-sm text-gray-100 pl-auto font-semibold">
            By: {authorName}
          </p>
        </div>
      </div>

      {/* <div className="absolute pl-4 pb-8 group-hover:opacity-100 opacity-0 -mt-12 space-y-1 z-50"></div> */}
    </div>
  );
};
