import { withSessionSsr } from "@/lib/config/withSession";
import { statusCheck } from "@/helpers/statusCheck";
import { authenticate } from "@/helpers/authenticate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideBar } from "@/components/mainPage/SideBar";
import styles from "@/styles/build.module.css";
import { CardSlide } from "@/components/deckPage/CardSlide";
// import { BsBookmarkPlus, BsBookmark } from "react-icons/bs";

export default Build;

function Build({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);
  const router = useRouter();

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

  const onSave = async () => {
    console.log("Saved");
    router.push("/decks");
  }

  const onCancel = () => {
    console.log("Clean all chosen cards");
    router.push("/decks");
  }

  return (
    <>
      <SideBar username={username} avatarImg={avatarImg}></SideBar>
      <div className={`${styles.row_container}`}>
        <CardSlide viewCount={5} imgList={charList}></CardSlide>
        <button className={`${styles.button} btn btn-primary`} onClick={onSave}>Save</button>
      </div>
      <div className={`${styles.row_container}`}>
        <CardSlide viewCount={5} imgList={actionCardList}></CardSlide>
        <button className={`${styles.button} btn btn-primary`} onClick={onCancel}>Cancel</button>
      </div>

      {/* <div className={`${styles.card_container}`}>
        <BsBookmarkPlus size={500} className={`${styles.card}`}></BsBookmarkPlus>
        <BsBookmark size={100} className={`${styles.hp}`}></BsBookmark>
      </div> */}
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
