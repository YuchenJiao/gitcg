import { withSessionSsr } from "@/lib/config/withSession";
import { statusCheck } from "@/helpers/statusCheck";
import { authenticate } from "@/helpers/authenticate";
import { useEffect, useState } from "react";
import SideBar from "@/components/mainPage/SideBar";
// import styles from "@/styles/decks.module.css";
// import { CardSlide } from "@/components/deckPage/CardSlide";
// import { BsBookmarkPlus, BsBookmark } from "react-icons/bs";
import DeckArray from "@/components/deckPage/DeckArray";

export default Decks;

function Decks({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);

  const getCards = async (endPoint, func) => {
    const res = await fetch(endPoint, {
      method: "GET",
    });
    try {
      await statusCheck(res);
      const content = await res.json();
      func(Array.from(content));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getCharacters();
    getCards("/api/characters", setCharList);
    getCards("/api/actionCards", setActionCardList);
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
