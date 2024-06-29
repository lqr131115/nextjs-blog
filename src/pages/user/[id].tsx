import { EyeOutlined,BookOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { Article, User } from "@/db/entity";
import { getRepository } from "@/db";
import ArticleList from "@/components/List/article";
import styles from "./index.module.scss";

export async function getServerSideProps({ params }: any) {
  const { id } = params;
  const userRep = await getRepository(User);
  const user = await userRep.findOne({
    where: {
      id: Number(id),
    },
  });
  const articleRep = await getRepository(Article);
  // TODO: 分页
  const articles = await articleRep.find({
    relations: ["user", "tags"],
    where: {
      user: {
        id: Number(id),
      },
    },
  });
  return {
    props: {
      userInfo: JSON.parse(JSON.stringify(user)),
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
}

const UserDetail: NextPage = (props: any) => {
  const { userInfo, articles = [] } = props;
  const viewsCount = articles.reduce((prev: number, cur: Article) => {
    return prev + cur.views;
  }, 0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.userInfo}>userinfo</div>
          <div className={styles.articles}>
            <ArticleList articles={articles} />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>个人成就</div>
          <div className={styles.articleCount}><BookOutlined />&nbsp;共创作了<span>{articles.length}</span>篇文章</div>
          <div className={styles.viewsCount}><EyeOutlined/>&nbsp;文章被阅读了<span>{viewsCount}</span>次</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
