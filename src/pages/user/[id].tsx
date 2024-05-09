import type { NextPage } from "next";
import { Article } from "@/db/entity";
import { AppDataSource } from "@/db";
import ArticleList from "@/components/List/article";
import styles from "./index.module.scss";

export async function getServerSideProps(context: any) {
  // console.log("****context****", context);
  const articleRep = AppDataSource.isInitialized
    ? AppDataSource.getRepository(Article)
    : (await AppDataSource.initialize()).getRepository(Article);
  const articles = await articleRep.find({ relations: ["user"] });

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}

const Home: NextPage = (props: any) => {
  const { articles } = props;
  return (
    <div className={styles.wrapper}>
      <ArticleList articles={articles} />
    </div>
  );
};

export default Home;
