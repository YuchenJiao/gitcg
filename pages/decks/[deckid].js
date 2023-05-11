import { withSessionSsr } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SideBar from "@/components/mainPage/SideBar";
import styles from "@/styles/buildDeck.module.css";
import CardSlide from "@/components/deckDetail/CardSlide";
import axios from "@/axios/custom";
import { countCharacterCard } from "@/helpers/countCharacterCard";
import { countActionCard } from "@/helpers/countActionCard";

export default Deck;

function Deck({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);
  const [selectedChar, setSelectedChar] = useState(0);
  const [selectedActionCard, setSelectedActionCard] = useState(0);
  const [selectedCharList, setSelectedCharList] = useState([]);
  const [selectedActionCardList, setSelectedActionCardList] = useState([]);
  const router = useRouter();
  const { deckid } = router.query;

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

  const refreshCount = () => {
    const result1 = countCharacterCard();
    setSelectedChar(result1.num);
    setSelectedCharList(result1.list);
    const result2 = countActionCard();
    setSelectedActionCard(result2.num);
    setSelectedActionCardList(result2.list);
  };

  const onSave = async () => {
    refreshCount();
    if (selectedChar !== 3 || selectedActionCard !== 30) {
      alert(
        "Need 3 characters and 30 action cards, after selection, click save again"
      );
    } else {
      try {
        const resp = await axios.put("/decks", {
          characters: selectedCharList,
          actionCards: selectedActionCardList,
          deckid: deckid,
          uid: uid,
        });
        alert(resp.data);
        router.push("/decks");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCancel = () => {
    router.push("/decks");
  };

  const onDelete = async () => {
    try {
      const resp = await axios.delete("/decks", {
        params: {
          uid: uid,
          deckid: deckid,
        },
      });
      alert(resp.data);
      if (resp.status === 200) {
        router.push("/decks");
      }
    } catch (error) {
      console.log(error);
    }
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
          selected={selectedChar}
          setNum={setSelectedChar}
          list={selectedCharList}
          setList={setSelectedCharList}
          uid={uid}
          deckid={deckid}
        ></CardSlide>
      </div>
      <div className={`${styles.slide_row}`}>
        <CardSlide
          viewCount={5}
          imgList={actionCardList}
          type={"actionCard"}
          max={30}
          selected={selectedActionCard}
          setNum={setSelectedActionCard}
          list={selectedActionCardList}
          setList={setSelectedActionCardList}
          uid={uid}
          deckid={deckid}
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
        <button
          className={`${styles.button} btn btn-primary`}
          onClick={onDelete}
        >
          Delete
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
