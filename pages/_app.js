import Layout from "@/components/account/Layout";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import localFont from "next/font/local";
import Head from "next/head";

export default App;

const myFont = localFont({ src: "../fonts/genshin.ttf" });

function App({ Component, pageProps }) {
  return (
    <main className={myFont.className}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
