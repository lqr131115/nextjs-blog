import React from "react";
import { IArticle } from "@/pages/api";
import { List } from "antd";
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./article.module.scss";
import { IconText } from "./component";
interface IProps {
  articles: IArticle[];
}

const ArticleList: NextPage<IProps> = ({ articles }) => {
  const { push } = useRouter();
  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={articles}
        renderItem={(item) => (
          <List.Item
            onClick={() => push(`/article/${item.id}`)}
            style={{ padding: 10 }}
            className={styles.item}
            key={item.title}
            actions={[
              <IconText
                icon={EyeOutlined}
                text={item.views + ""}
                key="list-vertical-view"
              />,
              <IconText
                icon={StarOutlined}
                text={item.stars + ""}
                key="list-vertical-star"
              />,
              <IconText
                icon={LikeOutlined}
                text={item.likes + ""}
                key="list-vertical-like"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.reviews + ""}
                key="list-vertical-comment"
              />,
            ]}
            extra={
              item.cover ? (
                <Image width={162} height={100} alt="cover" src={item.cover} />
              ) : null
            }
          >
            <List.Item.Meta
              avatar={
                <Image
                  width={30}
                  height={30}
                  alt="avatar"
                  src={item.user.avatar!}
                />
              }
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ArticleList;
