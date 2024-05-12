import { ChangeEvent, useState } from "react";
import { Space, Button, Input, Tabs, message } from "antd";
import { SmileOutlined, FileImageOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import type { NextPage } from "next";
import type { IComment } from "@/pages/api";
import request from "@/service/fetch";
import CommentList from "@/components/List/comment";
import { MAX_COMMENT_LEN } from "@/constants/response";
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

interface IProps {
  articleId: number;
}

const Comment: NextPage<IProps> = ({ articleId }) => {
  const [content, setContent] = useState<string>();
  const [contentLen, setContentLen] = useState<number>(0);
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
  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setContentLen(e.target.value.length);
  };
  const handleComment = () => {
    if (!content) {
      message.error("评论不能为空");
      return;
    }

    request
      .post("/api/comment/create", {
        articleId,
        content,
      })
      .then(() => {
        setContent("");
        setContentLen(0);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.comment}>
        <div className={styles.area}>
          <TextArea
            maxLength={MAX_COMMENT_LEN}
            style={{ minHeight: 100 }}
            value={content}
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
            <span>
              {contentLen}/{MAX_COMMENT_LEN}
            </span>
            <Button type="primary" size="small" onClick={handleComment}>
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
