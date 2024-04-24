import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/styles/main.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        {Array.from({ length: 30 }).map((_, idx) => {
          return <h1 key={idx}>idx</h1>;
        })}
      </main>
      <Footer />
    </>
  );
}
