import { useRef, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.css";

import type { NextPage } from "next";
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
function renderMarkdownToHTML(markdown: string) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = marked.parse(markdown);
  return { __html: renderedHTML };
}
const ArticleDetail: NextPage<IProps> = ({ article }) => {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef) {
      const root = divRef.current;
      const codes = (root?.querySelectorAll("pre code") ?? []) as any;
      hljs.configure({
        ignoreUnescapedHTML: true,
      });
      for (const code of codes) {
        hljs.highlightElement(code);
      }
    }
  }, [article.content]);
  return (
    <div className={styles.wrapper}>
      <span>{article.user.nickname}</span>
      <h1>{article.title}</h1>
      <div
        ref={divRef}
        dangerouslySetInnerHTML={renderMarkdownToHTML(article.content)}
      />
    </div>
  );
};

export default ArticleDetail;
