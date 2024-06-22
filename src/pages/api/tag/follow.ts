import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { Tag, User } from "@/db/entity";
import { getRepository } from "@/db";
import { ironSessionOptions } from "@/config";
import { ISession } from "..";
import {
  USER_IS_NOT_LOGIN,
  FOLLOW_TAG_FAILED,
  UN_FOLLOW_TAG_FAILED,
} from "@/constants/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let followTip = UN_FOLLOW_TAG_FAILED;
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
    const { type, tagId } = req.body;
    const doFollow = type === "follow";
    if (doFollow) {
      followTip = FOLLOW_TAG_FAILED;
    }
    const { id: useId } = session.user;
    const userRep = await getRepository(User);
    const user = await userRep.findOne({
      where: { id: useId },
    });
    const tagRep = await getRepository(Tag);
    const tag = await tagRep.findOne({
      relations: ["users"],
      where: { id: tagId },
    });
    if (tag && user) {
      tag.follow_count = doFollow ? tag.follow_count + 1 : tag.follow_count - 1;
      tag.users = doFollow ? [...tag.users, user] : tag.users.filter((u) => u.id !== useId);
      await tagRep.save(tag);
    }
    res
      .status(200)
      .json({
        code: 0,
        msg: "success",
      });
  } catch (error) {
    res.status(200).json(followTip);
  }
}
