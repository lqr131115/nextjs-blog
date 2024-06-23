import { NextApiRequest, NextApiResponse } from "next";
import { Article, Tag } from "@/db/entity";
import { getRepository } from "@/db";
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
    const {
      title,
      content,
      description = "",
      id = 0,
      preTagIds=[],
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

    const tagRep = await getRepository(Tag);
    // remove article_count 
    // TODO: 级联tags_articles_ref的tag_id 数量
    const removeTagIds = preTagIds.filter((id: number) => !tagIds.includes(id));
    const removeTags = await tagRep.findByIds(removeTagIds);
    for(const t of removeTags){
      const newTag = {...t, article_count: t.article_count - 1}
      await tagRep.save(newTag);
    }

    const articleRep = await getRepository(Article);
    const article = await articleRep.findOne({
      where: { id },
    });
        
    const addTagIds = tagIds.filter((id: number) => !preTagIds.includes(id));
    const tags = await tagRep.findByIds(tagIds);

    if (article) {
      article.title = title;
      article.description = description;
      article.content = content;
      if(tags){
        const newTags = tags.map((t:any) => {
          let article_count = t.article_count
          if(addTagIds.includes(t.id)){
            article_count += 1
          }
          return {...t, article_count}
        })
        article.tags = newTags;
      }
      await articleRep.save(article);
    }
    res.status(200).json({ code: 0, msg: "update success", data: null });
  } catch (error) {
    res.status(200).json(UPDATE_ARTICLE_FAILED);
  }
}
