import { withSessionSsr } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import SideBar from "@/components/mainPage/SideBar";
import Image from "next/image";
import { useMouse } from "primereact/hooks";
import { useEffect, useState } from "react";
import axios from "@/axios/custom";

export default Home;

function Home({ uid, username, avatar }) {
  const { x, y } = useMouse();
  const [background, setBackground] = useState("");
  const [favicon, setFavicon] = useState("");

  const isOnSideBar = () => {
    return x < 200;
  };

  useEffect(() => {
    async function getBackground() {
      try {
        const resp = await axios.get("/background", {
          params: { page: "homepage" },
        });
        const path = resp.data;
        setBackground(path);
      } catch (error) {
        console.log(error);
      }
    }
    getBackground();
  }, []);

  return (
    <>
      {isOnSideBar() && (
        <SideBar uid={uid} username={username} avatarImg={avatar}></SideBar>
      )}
      <Image src={background} alt="official wallpaper" fill priority></Image>
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
