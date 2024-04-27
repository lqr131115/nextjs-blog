import type { NextPage } from "next";
import styles from "./footer.module.scss";

const Footer: NextPage = () => {
  return (
    <footer className={styles.wrapper}>
      <p>Footer</p>
    </footer>
  );
};

export default Footer;
