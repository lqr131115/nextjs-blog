import { useState } from "react";
import { Button, Space, Popover } from "antd";
import { PoweroffOutlined, HomeOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";
import { useStore } from "@/store";
import request from "@/service/fetch";
import { nav } from "./config";
import Login from "../Login";
import styles from "./header.module.scss";
const activeCls = styles.active;
const Header: NextPage = () => {
  const router = useRouter();
  const { pathname } = router;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const { user: userStore } = useStore();
  const goToLogin = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };
  const goToHomepage = (e: any) => {
    e.preventDefault();
    console.log("goToHomepage");
    setIsPopoverOpen(false);
  };
  const logout = (e: any) => {
    e.preventDefault();
    request
      .post("/api/user/logout")
      .then(() => {
        setIsPopoverOpen(false);
        location.reload();
      })
      .catch((err) => {
        console.log("logout", err);
      });
  };
  const handlePopoverOpenChange = (newOpen: boolean) => {
    setIsPopoverOpen(newOpen);
  };
  const popoverContent = () => {
    return (
      <Space direction="vertical">
        <Button type="link" icon={<HomeOutlined />} onClick={goToHomepage}>
          个人主页
        </Button>
        <Button type="link" danger icon={<PoweroffOutlined />} onClick={logout}>
          退出登录
        </Button>
      </Space>
    );
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
            {userStore.userInfo.userId ? (
              <div className={styles.avatar}>
                <Popover
                  content={popoverContent}
                  trigger="click"
                  open={isPopoverOpen}
                  onOpenChange={handlePopoverOpenChange}
                >
                  <Image
                    width={40}
                    height={40}
                    alt="avatar"
                    src={userStore.userInfo.avatar}
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
