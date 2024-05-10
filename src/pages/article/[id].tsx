import type { NextPage } from "next";
// import { marked } from "marked";
import { Remarkable } from "remarkable";
import { Article } from "@/db/entity";
import { AppDataSource } from "@/db";
import { IArticle } from "@/pages/api";
import styles from "./index.module.scss";
export async function getServerSideProps({ query }: any) {
  const { id } = query;
  const articleRep = AppDataSource.isInitialized
    ? AppDataSource.getRepository(Article)
    : (await AppDataSource.initialize()).getRepository(Article);
  const article = await articleRep.findOne({
    where: { id },
    relations: ["user"],
  });

  return {
    props: {
      article: JSON.parse(JSON.stringify(article)),
    },
  };
}

interface IProps {
  article: IArticle;
}
const md = new Remarkable();
function renderMarkdownToHTML(markdown: string) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return { __html: renderedHTML };
}

const ArticleDetail: NextPage<IProps> = ({ article }) => {
  return (
    <div className={styles.wrapper}>
      <span>{article.user.nickname}</span>
      <h1>{article.title}</h1>
      <div
        dangerouslySetInnerHTML={renderMarkdownToHTML(article.content)}
      ></div>
    </div>
  );
};

export default ArticleDetail;
