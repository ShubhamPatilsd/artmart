import { Author } from "./Author";

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  preferredTrade: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}
