import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { User, Article, Comment } from "@/db/entity";
import { AppDataSource, getRepository } from "@/db";
import { ironSessionOptions } from "@/config";
import { ISession } from "..";
import {
  COMMENT_IS_NULL,
  USER_IS_NOT_LOGIN,
  MAX_COMMENT_LEN,
  COMMENT_LENGTH_INVALID,
  CREATE_COMMENT_FAILED,
} from "@/constants/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { articleId, content = "" } = req.body;
    // 服务端校验
    if (!content) {
      res.status(200).json(COMMENT_IS_NULL);
      return;
    }
    if (content.length > MAX_COMMENT_LEN) {
      res.status(200).json(COMMENT_LENGTH_INVALID);
      return;
    }
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
    const userRep = await getRepository(User);
    const user = await userRep.findOne({
      where: { id: useId },
    });
    const articleRep = AppDataSource.getRepository(Article);
    const article = await articleRep.findOne({
      where: { id: articleId },
    });
    const commentRep = AppDataSource.getRepository(Comment);
    const comment = new Comment();
    comment.content = content;
    comment.article = article!;
    comment.user = user!;
    await commentRep.save(comment);

    res.status(200).json({ code: 0, msg: "create success", data: null });
  } catch (error) {
    res.status(200).json(CREATE_COMMENT_FAILED);
  }
}
