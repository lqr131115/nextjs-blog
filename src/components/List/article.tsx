import React, { useState } from "react";
import { IArticle } from "@/pages/api";
import { Avatar, List, Space } from "antd";
import Image from "next/image";
import type { NextPage } from "next";
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
interface IProps {
  articles: IArticle[];
}

const ArticleList: NextPage<IProps> = ({ articles }) => {
  console.log("articles", articles);

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={articles}
        renderItem={(item) => (
          <List.Item
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
                <Image width={272} height={272} alt="cover" src={item.cover} />
              ) : null
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatar} />}
              title={<a href={`/article/${item.id}`}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </>
  );
};

export default ArticleList;
