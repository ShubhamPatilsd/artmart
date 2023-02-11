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
        include: {
          author: true,
        },
      });

      if (!post) {
        return res.status(500).send("internal-server-error");
      }

      await db.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200);
    } else {
      return res.status(401).send("unauthorized");
    }
  }
};
