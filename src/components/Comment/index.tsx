import { ChangeEvent, useState } from "react";
import { Space, Button, Input, Tabs } from "antd";
import { SmileOutlined, FileImageOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import type { NextPage } from "next";
import type { IComment } from "@/pages/api";
import CommentList from "@/components/List/comment";
import styles from "./index.module.scss";

const { TextArea } = Input;
const commentList: IComment[] = [
  {
    id: 1,
    content: "古德古德",
    create_time: new Date(),
    update_time: new Date(),
    user: {
      id: 1,
      nickname: "nickname",
      avatar: "/image/avatar.png",
    },
  },
];
const tabItems: TabsProps["items"] = [
  {
    key: "latest",
    label: "最新",
    children: <CommentList comments={commentList} />,
  },
  {
    key: "hot",
    label: "最热",
    children: <CommentList comments={commentList} />,
  },
];
const Comment: NextPage = () => {
  const [comment, setComment] = useState<string>();
  const [commentLen, setCommentLen] = useState<number>(0);
  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setCommentLen(e.target.value.length);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.comment}>
        <div className={styles.area}>
          <TextArea
            maxLength={1000}
            style={{ minHeight: 100 }}
            value={comment}
            onChange={onCommentChange}
            placeholder="友善交流"
          />
        </div>
        <div className={styles.action}>
          <Space>
            <SmileOutlined />
            <FileImageOutlined />
          </Space>
          <Space size="large">
            <span>{commentLen}/1000</span>
            <Button type="primary" size="small">
              发送
            </Button>
          </Space>
        </div>
      </div>
      <div className={styles.list}>
        <Tabs defaultActiveKey="latest" items={tabItems} />
      </div>
    </div>
  );
};

export default Comment;
