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
      <div className="h-30 md:h-36 lg:h-48 rounded-lg flex justify-center">
        <img src={coverPhoto} className=" h-full w-auto rounded-t-lg" />
      </div>
      <div className="pt-4 p-8 shadow">
        <div className="mb-3">
          <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
            {category}
          </span>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-xl">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};
