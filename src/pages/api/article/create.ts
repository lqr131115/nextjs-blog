import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { User, Article, Tag } from "@/db/entity";
import { getRepository } from "@/db";
import { ironSessionOptions } from "@/config";
import { ISession } from "..";
import {
  TITLE_IS_NULL,
  CONTENT_IS_NULL,
  USER_IS_NOT_LOGIN,
  CREATE_ARTICLE_FAILED,
} from "@/constants/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      title,
      content,
      description = "",
      isPublished = false,
      tagIds = [],
    } = req.body;
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
    const userRep = await getRepository(User);
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

    const tagRep = await getRepository(Tag);
    // findByIds 弃用
    // let tags = await tagRep.findByIds(tagIds); 
    let tags = await tagRep.find({
      where: tagIds.map((id: number) => ({ id })),
    });
    if (tags) {
      const newTags = tags.map((t: any) => ({
        ...t,
        article_count: t.article_count + 1,
      }));
      // 做了cascade:true, 这里不需要再保存
      // 注意级联的位置
      article.tags = newTags;
    }
    const articleRep = await getRepository(Article);
    await articleRep.save(article);

    res.status(200).json({ code: 0, msg: "create success", data: null });
  } catch (error) {
    res.status(200).json(CREATE_ARTICLE_FAILED);
  }
}
