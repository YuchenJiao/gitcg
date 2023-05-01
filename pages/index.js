import { withSessionSsr } from "@/lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import SideBar from "@/components/mainPage/SideBar";
import Image from "next/image";
import { useMouse } from "primereact/hooks";

export default Home;

function Home({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const { x, y } = useMouse();

  const isOnSideBar = () => {
    return x < 200;
  };

  return (
    <>
      {isOnSideBar() && (
        <SideBar username={username} avatarImg={avatarImg}></SideBar>
      )}
      <Image src="/background.png" alt="official wallpaper" fill></Image>
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
