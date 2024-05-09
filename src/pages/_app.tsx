import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "@/styles/global.css";
import { StoreProvider } from "@/store";

interface IAppProps extends AppProps {
  initialValue: Record<any, any>;
}

function App({ initialValue, Component, pageProps }: IAppProps) {
  const renderLayout = () => {
    if ((Component as any).layout === null) {
      return <Component {...pageProps} />;
    } else {
      return (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      );
    }
  };
  return (
    <StoreProvider initialValue={initialValue}>{renderLayout()}</StoreProvider>
  );
}

App.getInitialProps = async ({ ctx }: any) => {
  const cookies = ctx.req?.cookies || {};
  const { id, avatar, nickname } = cookies;
  return {
    initialValue: {
      // user store module
      user: {
        userInfo: { id, avatar, nickname },
      },
    },
  };
};

export default App;
