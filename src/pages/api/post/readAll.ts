import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../db/db";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      const posts = await db.post.findMany({
        include: {
          author: true,
          Trade: true,
        },
      });

      if (!posts) {
        return res.status(500).send("internal-server-error");
      }

      return res.status(200).json(posts);
    } else {
      return res.status(401).send("unauthorized");
    }
  }
};
