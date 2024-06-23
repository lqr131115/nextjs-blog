import { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import type { NextPage } from "next";
import { ITag } from "../api";
import request from "@/service/fetch";
import TagList from "@/components/List/tag";
import styles from "./index.module.scss";

const Tag: NextPage = () => {
  const [followTags, setFollowTags] = useState<ITag[]>([]);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [needRefresh,setNeedRefresh] = useState<boolean>(false)
  const tabItems: TabsProps["items"] = [
    {
      label: "所有",
      key: "all",
      children: <TagList tags={allTags} refresh={setNeedRefresh} needRefresh={needRefresh}/>,
    },
    {
      label: "关注",
      key: "follow",
      children: <TagList tags={followTags} refresh={setNeedRefresh} needRefresh={needRefresh}/>,
    },
  ];
  useEffect(() => {
    request.get("/api/tag/get").then((res: any) => {
      const { code, data } = res;
      if (code == 0) {
        const { allTags = [], followTags = [] } = data;
        setFollowTags(followTags);
        setAllTags(allTags);
      }
    });
  }, [needRefresh]);

  return (
    <div className={styles.wrapper}>
      <Tabs
        className={styles.tabs}
        defaultActiveKey="all"
        tabPosition="left"
        items={tabItems}
      />
    </div>
  );
};

export default Tag;
