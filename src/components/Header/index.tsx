import Link from "next/link";
import type { NextPage } from "next";
import { nav } from "./config";
import styles from "./header.module.scss";
const Header: NextPage = () => {
  return (
    <header className={styles.wrapper}>
      <section className={styles.logo}>
        <span className={styles.box}>BLOG</span>
      </section>
      <section className={styles.navbar}>
        {nav &&
          nav.map((item) => {
            return (
              <span key={item.path} className={styles.link}>
                <Link legacyBehavior href={item.path}>
                  <a>{item.label}</a>
                </Link>
              </span>
            );
          })}
      </section>
      <section className={styles.profile}>登录</section>
    </header>
  );
};

export default Header;
