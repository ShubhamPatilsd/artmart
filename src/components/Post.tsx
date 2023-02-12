interface PostProps {
  coverPhoto: string;
  authorName: string;
  authorPhoto: string;
  authorEmail: string;
  title: string;
  description: string;
  category: string;
  onClick: any;
}

export const Post: React.FC<PostProps> = ({
  coverPhoto,
  authorName,
  authorPhoto,
  authorEmail,
  title,
  description,
  category,
  onClick,
}) => {
  return (
    <div className={"rounded-md border border-gray-300 p-4"} onClick={onClick}>
      {/* TODO: change this to nextjs image */}
      <div className="h-30 md:h-36 lg:h-48 p-2 rounded-lg flex justify-center">
        <img
          src={coverPhoto}
          className=" w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="pt-4 p-8 space-y-4 shadow">
        <div>
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

        <div className="flex space-x-2 items-center">
          <img src={authorPhoto} className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold font-mono">{authorName}</p>
            <p className="text-xs font-mono">{authorEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
