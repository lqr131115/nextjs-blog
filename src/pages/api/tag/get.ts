import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { Tag } from "@/db/entity";
import { getRepository } from "@/db";
import { ironSessionOptions } from "@/config";
import { ISession } from "..";
import { USER_IS_NOT_LOGIN, CET_TAG_FAILED } from "@/constants/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session: ISession = await getIronSession(
      req,
      res,
      ironSessionOptions
    );
    if (session.user == null) {
      res.status(200).json(USER_IS_NOT_LOGIN);
      return;
    }
    const { id: useId } = session.user;
    // const followTags = await tagRep.find({
    //   relations: ["users"],
    // });

    const tagRep = await getRepository(Tag);
    const allTags = await tagRep.find({
      relations: ["users"],
    });

    res
      .status(200)
      .json({ code: 0, msg: "get success", data: { allTags, followTags: [] } });
  } catch (error) {
    res.status(200).json(CET_TAG_FAILED);
  }
}
