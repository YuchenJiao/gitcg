import { withSessionSsr } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import SideBar from "@/components/mainPage/SideBar";
import Image from "next/image";
import Head from "next/head";
import { useMouse } from "primereact/hooks";

export default Home;

function Home({ uid, username, avatar }) {
  const { x, y } = useMouse();

  const isOnSideBar = () => {
    return x < 200;
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {isOnSideBar() && (
        <SideBar username={username} avatarImg={avatar}></SideBar>
      )}
      <Image
        src="/background.png"
        alt="official wallpaper"
        fill
        priority
      ></Image>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const auth = authenticate(req);

  if (!auth.isValid) {
    return auth.action;
  }

  const user = req.session.user;

  return {
    props: { uid: user.id, username: user.username, avatar: user.avatar },
  };
});
