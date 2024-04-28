import type { NextPage } from "next";
import Header from "../Header";
import Footer from "../Footer";
import styles from "@/styles/main.module.scss";

const Layout: NextPage<any> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
