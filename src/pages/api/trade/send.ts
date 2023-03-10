import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../db/db";
import { TradeStatus } from "@prisma/client";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.body?.theirArtId || !req.body?.myArtUrl) {
      res.status(400).send("missing-fields");
      return;
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).send("unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!user) {
      return res.status(404).send("user-not-found");
    }

    const theirArt = await db.post.findUnique({
      where: {
        id: req.body.theirArtId,
      },
      select: {
        id: true,
        authorId: true,
      },
    });

    if (!theirArt) {
      return res.status(404).send("their-art-not-found");
    }

    const trade = await db.trade.create({
      data: {
        authorId: theirArt.authorId,
        requesterId: user.id,
        postId: theirArt.id,
        status: TradeStatus.pending,
        imageUrl: req.body.myArtUrl,
      },
    });

    if (!trade) {
      return res.status(500).send("internal-server-error");
    }

    return res.status(200).json(trade);
  }
};

export default handler;
