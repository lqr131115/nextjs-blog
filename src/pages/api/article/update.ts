import { NextApiRequest, NextApiResponse } from "next";
import { Article } from "@/db/entity";
import { AppDataSource } from "@/db";
import {
  TITLE_IS_NULL,
  CONTENT_IS_NULL,
  UPDATE_ARTICLE_FAILED,
} from "@/constants/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, content, description = "", id = 0 } = req.body;
    // 服务端校验
    if (!title) {
      res.status(200).json(TITLE_IS_NULL);
      return;
    }
    if (!content) {
      res.status(200).json(CONTENT_IS_NULL);
      return;
    }

    const articleRep = AppDataSource.isInitialized
      ? AppDataSource.getRepository(Article)
      : (await AppDataSource.initialize()).getRepository(Article);

    const article = await articleRep.findOne({
      where: { id },
    });

    if (article) {
      article.title = title;
      article.description = description;
      article.content = content;
      await articleRep.save(article);
    }
    res.status(200).json({ code: 0, msg: "update success", data: null });
  } catch (error) {
    res.status(200).json(UPDATE_ARTICLE_FAILED);
  }
}
