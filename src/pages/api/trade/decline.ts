import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { db } from "../../../db/db";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { tradeId } = req.body;
    const session = await getServerSession(req, res, authOptions);

    if (!tradeId) {
      res.status(400).send("missing-fields");
      return;
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
        const trade = await db.trade.update({
          where: {
            id: tradeId,
          },
          data: {
            accepted: false,
            status: "rejected",
          },
        });

        if (!trade) {
          return res.status(500).send("internal-server-error");
        }

        return res.status(200);
      }
    } else {
      return res.status(401).send("unauthorized");
    }
  }
};

export default handler;
