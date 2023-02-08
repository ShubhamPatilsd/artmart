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
        "rounded-lg border-2 border-purple-200 shadow-lg shadow-purple-100"
      }
    >
      {/* TODO: change this to nextjs image */}
      <div className="group">
        <div className="h-30 md:h-36  lg:h-48 rounded-lg flex justify-center">
          <img
            src={coverPhoto}
            className="relative z-10 group-hover:brightness-50 h-full w-auto rounded-t-lg"
          />
        </div>

        {/* <div className="absolute pl-4 pb-8 group-hover:opacity-100 opacity-0 -mt-12 space-y-1 z-50"></div> */}
        <div className="absolute opacity-0 z-50 group-hover:opacity-100 -mt-32 pt-4 p-8 shadow">
          <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
            {category}
          </span>
          <h4 className="font-bold text-xl text-white">{title}</h4>
          <p className="text-sm text-gray-100 inline ">{description}</p>
          <p className="text-sm text-gray-100 pl-auto justify-right text-right inline">
            {authorName}
          </p>
        </div>
      </div>
    </div>
  );
};
