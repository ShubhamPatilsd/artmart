import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    const { title, description, imageUrl, category, preferredTrade } = req.body;
    const session = getServerSession(req, res, authOptions);
  }
};
