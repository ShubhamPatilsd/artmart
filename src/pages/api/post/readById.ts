import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../db/db";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    const { postId } = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!postId) {
      res.status(400).send("missing-fields");
    }
    if (session) {
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post) {
        return res.status(500).send("internal-server-error");
      }

      return res.status(200).json(post);
    } else {
      return res.status(401).send("unauthorized");
    }
  }
};
