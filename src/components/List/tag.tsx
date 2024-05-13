import React from "react";
import { ITag } from "@/pages/api";
import {
  FileTextOutlined,
  StarOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import * as ANTD_ICONS from "@ant-design/icons";
import type { NextPage } from "next";
import IconText from "./components/IconText";
import { useStore } from "@/store";
import styles from "./tag.module.scss";
interface IProps {
  tags: ITag[];
}
const TagList: NextPage<IProps> = ({ tags }) => {
  const { user } = useStore();
  const { id } = user;
  const handleUnFollow = (tagId: number) => {
    console.log(tagId);
  };
  const hasFollowedTagsId = tags
    .filter((tag) => tag.users.find((u) => u.id === id))
    .map((tag) => tag.id);
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
              <span onClick={() => handleUnFollow(tag.id)}>
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
