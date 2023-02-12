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
        "hover:bg-white hover:border-transparent hover:shadow-lg duration-100 rounded-md border border-gray-300 p-4"
      }
    >
      {/* TODO: change this to nextjs image */}
      <div className="h-30 md:h-36 lg:h-48 rounded-lg flex justify-center">
        <img src={coverPhoto} className="h-full w-auto rounded-t-lg" />
      </div>
      <div className="py-4">
        <div className="mb-3">
          <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
            {category}
          </span>
          <div className="space-y-1">
            <h4 className="font-bold text-xl">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          <img src={authorPhoto} className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold font-mono">{authorName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
