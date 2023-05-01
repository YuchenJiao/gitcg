import Layout from "@/components/account/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import localFont from "next/font/local";

export default App;

const myFont = localFont({ src: "../fonts/genshin.ttf" });

function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
