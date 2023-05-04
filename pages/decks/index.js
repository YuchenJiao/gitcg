import { withSessionSsr } from "@/lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import { useEffect, useState } from "react";
import SideBar from "@/components/mainPage/SideBar";
import DeckArray from "@/components/deckPage/DeckArray";
import axios from "@/axios/custom";

export default Decks;

function Decks({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);

  const getCards = async (endPoint, func) => {
    try {
      const resp = await axios.get(endPoint);
      const content = resp.data;
      func(Array.from(content));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getCards("/characters", setCharList);
    getCards("/actionCards", setActionCardList);
  }, []);

  return (
    <>
      <SideBar username={username} avatarImg={avatarImg}></SideBar>
      <DeckArray
        length={8}
        defaultName={"Create New Deck"}
        size={150}
      ></DeckArray>
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
