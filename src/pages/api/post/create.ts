import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../db/db";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { title, description, imageUrl, category, preferredTrade } = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!title || !description || !imageUrl || !category || !preferredTrade) {
      res.status(400).send("missing-fields");
    }
    if (session) {
      const user = await db.user.findUnique({
        where: {
          email: session.user?.email || "",
        },
      });

      if (!user) {
        return res.status(404).send("user-not-found");
      } else {
        const post = await db.post.create({
          data: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            category: category,
            preferredTrade: preferredTrade,
            authorId: user.id,
          },
        });

        if (!post) {
          return res.status(500).send("internal-server-error");
        }

        return res.status(200).json(post);
      }
    } else {
      return res.status(401).send("unauthorized");
    }
  }
};
