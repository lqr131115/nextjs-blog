import { FC, useState } from "react";
import { Menu, Button } from "antd";
import { RadarChartOutlined } from "@ant-design/icons";

import styles from "./header.module.scss";
import { nav } from "./config";
const Header: FC = () => {
  return (
    <header className={styles.wrapper}>
      <section className={styles.logo}>
        <span className={styles.box}>
          <RadarChartOutlined />
          <span
            style={{ fontSize: "1.2rem", fontWeight: "bold", marginLeft: 5 }}
          >
            BLOG
          </span>
        </span>
      </section>
      <section className={styles.link}>
        <Menu mode="horizontal" items={nav} style={{ border: "none" }} />
      </section>
      <section className={styles.profile}>
        <Button type="primary">登录</Button>
      </section>
    </header>
  );
};

export default Header;
