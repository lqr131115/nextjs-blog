import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import type { NextPage } from "next";
import { nav } from "./config";
import styles from "./header.module.scss";
const activeCls = styles.active;
const Header: NextPage = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
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
      <section className={styles.profile}>登录</section>
    </header>
  );
};

export default Header;
