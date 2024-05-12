import React from "react";
import { IComment } from "@/pages/api";
import { List } from "antd";
import { LikeOutlined, MessageOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Image from "next/image";
import { IconText } from "./component";
interface IProps {
  comments: IComment[];
}
const CommentList: NextPage<IProps> = ({ comments }) => {
  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={comments}
        renderItem={(item) => (
          <List.Item
            style={{ padding: 10 }}
            key={item.title}
            actions={[
              <IconText
                icon={LikeOutlined}
                text="点赞"
                key="list-vertical-like"
              />,
              <IconText
                icon={MessageOutlined}
                text="评论"
                key="list-vertical-comment"
              />,
            ]}
          >
            <List.Item.Meta
              style={{ margin: 0 }}
              avatar={
                <Image
                  width={30}
                  height={30}
                  alt="avatar"
                  src={item.user.avatar!}
                />
              }
              title={item.user.nickname}
            />
            <p>{item.content}</p>
          </List.Item>
        )}
      />
    </>
  );
};

export default CommentList;
