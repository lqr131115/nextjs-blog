import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { ITag } from "../api";
import request from "@/service/fetch";
import styles from "./index.module.scss";

const Tag: NextPage = () => {
  const [followTags, setFollowTags] = useState<ITag[]>([]);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  useEffect(() => {
    request.get("/api/tag/get").then((res: any) => {
      const { code, data } = res;
      if (code == 0) {
        const { allTags = [], followTags = [] } = data;
        setFollowTags(followTags);
        setAllTags(allTags);
      }
    });
  }, []);
  return <div className={styles.wrapper}>I am Tag</div>;
};

export default Tag;
