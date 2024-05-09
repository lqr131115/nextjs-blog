import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { User, Article } from "@/db/entity";
import { AppDataSource } from "@/db";
import { ironSessionOptions } from "@/config";
import { ISession } from "..";
import {
  TITLE_IS_NULL,
  CONTENT_IS_NULL,
  USER_IS_NOT_LOGIN,
} from "@/constants/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, content, description = "", isPublished = false } = req.body;
    // 服务端校验
    if (!title) {
      res.status(200).json(TITLE_IS_NULL);
      return;
    }
    if (!content) {
      res.status(200).json(CONTENT_IS_NULL);
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
    const userRep = AppDataSource.isInitialized
      ? AppDataSource.getRepository(User)
      : (await AppDataSource.initialize()).getRepository(User);
    const { id } = session.user;
    const user = await userRep.findOne({
      where: { id },
    });
    const article = new Article();
    article.title = title;
    article.description = description;
    article.content = content;
    article.is_publish = isPublished;
    article.user = user!;

    const articleRep = AppDataSource.isInitialized
      ? AppDataSource.getRepository(Article)
      : (await AppDataSource.initialize()).getRepository(Article);
    await articleRep.save(article);

    res
      .status(200)
      .json({ code: 0, msg: "create or update success", data: null });
  } catch (error) {
    console.log("login error", error);
    res
      .status(200)
      .json({ code: -1, msg: "create or update failed", data: null });
  }
}