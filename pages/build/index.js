import { withSessionSsr } from "@/lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/mainPage/SideBar";
import styles from "@/styles/build.module.css";
import CardSlide from "@/components/deckPage/CardSlide";
import axios from "@/axios/custom";

export default Build;

function Build({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);
  const router = useRouter();

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

  const onSave = async () => {
    console.log("Saved");
    router.push("/decks");
  };

  const onCancel = () => {
    console.log("Clean all chosen cards");
    router.push("/decks");
  };

  return (
    <>
      <SideBar username={username} avatarImg={avatarImg}></SideBar>
      <div className={`${styles.slide_row}`}>
        <CardSlide
          viewCount={5}
          imgList={charList}
          type={"characterCard"}
          max={3}
        ></CardSlide>
      </div>
      <div className={`${styles.slide_row}`}>
        <CardSlide
          viewCount={5}
          imgList={actionCardList}
          type={"actionCard"}
          max={30}
        ></CardSlide>
      </div>
      <div className={`${styles.button_row}`}>
        <button className={`${styles.button} btn btn-primary`} onClick={onSave}>
          Save
        </button>
        <button
          className={`${styles.button} btn btn-primary`}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
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
