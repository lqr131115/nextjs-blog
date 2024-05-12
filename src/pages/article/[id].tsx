import { useRef, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.css";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Article } from "@/db/entity";
import { getRepository } from "@/db";
import { IArticle } from "@/pages/api";
import ArticleComment from "@/components/Comment";
import styles from "./index.module.scss";

export async function getServerSideProps({ query }: any) {
  const { id } = query;
  const articleRep = await getRepository(Article);
  const article = await articleRep.findOne({
    where: { id },
    relations: ["user", "comments", "comments.user"],
  });

  // 更新浏览量
  if (article) {
    article.views += 1;
    await articleRep.save(article);
  }

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
  const { push } = useRouter();
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
  const goToEditor = () => {
    push(`/editor/${article.id}`);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.info}>
          <Space size="large">
            <span className={styles.nickname}>{article.user.nickname}</span>
            <span>{new Date(article.create_time).toLocaleDateString()}</span>
            <Space>
              <EyeOutlined />
              {article.views}
            </Space>
            <Button type="link" onClick={goToEditor}>
              编辑
            </Button>
          </Space>
        </div>
      </div>
      <div className={styles.content}>
        <div
          ref={divRef}
          dangerouslySetInnerHTML={renderMarkdownToHTML(article.content)}
        />
      </div>
      <div className={styles.footer}>
        <ArticleComment
          articleId={article.id}
          comments={article.comments ?? []}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
