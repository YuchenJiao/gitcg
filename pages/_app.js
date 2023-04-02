import { Layout } from "@/components/account/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

export default App;

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
