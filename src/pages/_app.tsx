import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/styles/global.css";
import { StoreProvider } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}
