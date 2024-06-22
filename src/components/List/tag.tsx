import React from "react";
import { message } from "antd";
import {
  FileTextOutlined,
  StarOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import * as ANTD_ICONS from "@ant-design/icons";
import type { NextPage } from "next";
import IconText from "./components/IconText";
import { useStore } from "@/store";
import { ITag } from "@/pages/api";
import styles from "./tag.module.scss";
import request from "@/service/fetch";
interface IProps {
  tags: ITag[];
}
const TagList: NextPage<IProps> = ({ tags }) => {
  const { user } = useStore();
  const { userInfo } = user;
  const hasFollowedTagsId = tags
    .filter((tag) => tag.users.some((u) => u.id === Number(userInfo.id)))
    .map((tag) => tag.id);
  const handleToggleFollow = (tagId: number) => {
    const hasFollowed = hasFollowedTagsId.includes(tagId);
    request.post("/api/tag/follow",{
      type: hasFollowed ? "unfollow" : "follow",
      tagId
    }).then((res: any) => {
      const { code,msg } = res;
      if (code === 0) {
        message.success(hasFollowed ? '取注成功' : '关注成功');
      }else{
        message.error(msg);
      }
    });
  };
  return (
    <div className={styles.wrapper}>
      {tags.map((tag) => {
        return (
          <div key={tag.id} className={styles.card}>
            <div className={styles.header}>
              <span className={styles.cover}>
                {(ANTD_ICONS as any)[tag.icon]?.render() ?? (
                  <QuestionOutlined />
                )}
              </span>
              <span className={styles.title}>{tag.title}</span>
            </div>
            <div className={styles.actions}>
              <span onClick={() => handleToggleFollow(tag.id)}>
                <IconText
                  icon={StarOutlined}
                  text={
                    hasFollowedTagsId.includes(tag.id)
                      ? "已关注"
                      : `${tag.follow_count}`
                  }
                  key="list-vertical-follow_count"
                />
              </span>
              <IconText
                icon={FileTextOutlined}
                text={tag.article_count + ""}
                key="list-vertical-article_count"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
