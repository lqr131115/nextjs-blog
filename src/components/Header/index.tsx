import { useState } from "react";
import { Button, Space, Popover } from "antd";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";
import { useStore } from "@/store";
import { nav } from "./config";
import Login from "../Login";
import styles from "./header.module.scss";
const activeCls = styles.active;
const Header: NextPage = () => {
  const router = useRouter();
  const { pathname } = router;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const store = useStore();
  const goToLogin = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <header className={styles.wrapper}>
        <section className={styles.logo}>
          <span className={styles.box}>BLOG</span>
        </section>
        <section className={styles.navbar}>
          {nav &&
            nav.map((item) => {
              const aCls = classNames({
                [activeCls]: pathname === item.path,
              });
              return (
                <span key={item.path} className={styles.link}>
                  <Link legacyBehavior href={item.path}>
                    <a className={aCls}>{item.label}</a>
                  </Link>
                </span>
              );
            })}
        </section>
        <section className={styles.action}>
          <Space>
            <Button>写文章</Button>
            {store.user.userInfo.id ? (
              <div className={styles.avatar}>
                <Popover
                  content={<Button type="link">退出登录</Button>}
                  trigger="click"
                >
                  <Image
                    width={40}
                    height={40}
                    alt="avatar"
                    src={store.user.userInfo.avatar}
                  />
                </Popover>
              </div>
            ) : (
              <Button type="primary" onClick={goToLogin}>
                登录
              </Button>
            )}
          </Space>
        </section>
      </header>
      <Login
        open={isModalOpen}
        onClose={handleClose}
        deadline={deadline}
        setDeadline={() => setDeadline(Date.now() + 1000 * 60)}
      />
    </>
  );
};

export default Header;
