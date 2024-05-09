import React from "react";
import { IArticle } from "@/pages/api";
import { List, Space } from "antd";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Image from "next/image";
import styles from "./article.module.scss";
import { useRouter } from "next/router";
interface IProps {
  articles: IArticle[];
}

const ArticleList: NextPage<IProps> = ({ articles }) => {
  const { push } = useRouter();
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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
                icon={StarOutlined}
                text={item.stars + ""}
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text={item.likes + ""}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.comments + ""}
                key="list-vertical-message"
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
                  src={item.user.avatar}
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
