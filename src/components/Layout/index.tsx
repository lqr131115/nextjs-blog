import { FC } from "react";
import Header from "../Header";
import Footer from "../Footer";
import styles from "@/styles/main.module.scss";

const Layout: FC = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
