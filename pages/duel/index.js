import { withSessionSsr } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import axios from "@/axios/custom";
import Image from "next/image";
import { useEffect, useState } from "react";

export default Duel;

function Duel({ uid, username, avatar }) {
  const [background, setBackground] = useState("");

  useEffect(() => {
    async function getBackground() {
      try {
        const resp = await axios.get("/background", {
          params: { page: "duel" },
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
      <Image src={background} alt="desk background" fill priority></Image>
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
