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
    <div className={"rounded-md border border-gray-300 p-4"}>
      {/* TODO: change this to nextjs image */}
      <img src={coverPhoto} />
      <span className="bg-purple-100 px-2 py-1 text-purple-700 font-medium tracking-wider lowercase rounded-md text-xs">
        {category}
      </span>
      <h4 className="font-bold text-xl">{title}</h4>
    </div>
  );
};
