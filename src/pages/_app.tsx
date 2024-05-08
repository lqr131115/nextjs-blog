import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/styles/global.css";
import { StoreProvider } from "@/store";

interface IAppProps extends AppProps {
  initialValue: Record<any, any>;
}

function App({ initialValue, Component, pageProps }: IAppProps) {
  return (
    <StoreProvider initialValue={initialValue}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

App.getInitialProps = async ({ ctx }: any) => {
  const cookies = ctx.req?.cookies || {};
  const { userId, avatar, nickname } = cookies;
  return {
    initialValue: {
      // user module
      user: {
        userInfo: { userId, avatar, nickname },
      },
    },
  };
};

export default App;
