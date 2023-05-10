import styles from "@/styles/DeckArray.module.css";
import { BsBookmarkPlus } from "react-icons/bs";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import axios from "@/axios/custom";
import { useState, useEffect } from "react";
import Deck from "@/components/deckPage/Deck";

export default DeckArray;

function DeckArray({ length, defaultName, size, uid }) {
  const router = useRouter();
  const arr = [...Array(length)].map(() => {
    return 0;
  });
  const [decks, setDecks] = useState(arr);

  const getDecks = async () => {
    try {
      const resp = await axios.get("/decks", {
        params: { uid: uid },
      });
      const userDeck = Array.from(resp.data);
      let newArr = [...decks];
      userDeck.forEach(({ deckid, characters }) => {
        newArr[deckid - 1] = characters;
      });
      setDecks(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDecks();
  }, []);

  const toBuild = (did) => {
    router.push(`/decks/${did}`);
  };

  return (
    <div className={`${styles.outer_container}`}>
      {decks.map((n, idx) => {
        if (n === 0) {
          return (
            <div key={idx} className={`${styles.container}`}>
              <div
                className={`${styles.container}`}
                onClick={() => {
                  toBuild(idx + 1);
                }}
              >
                <BsBookmarkPlus
                  size={size}
                  className={`${styles.deck}`}
                ></BsBookmarkPlus>
              </div>
              <p className={`${styles.default_name}`}>{defaultName}</p>
            </div>
          );
        } else {
          return (
            <div key={idx} className={`${styles.container}`}>
              <div
                className={`${styles.container}`}
                onClick={() => {
                  toBuild(idx + 1);
                }}
              >
                <Deck size={size} content={n}></Deck>
              </div>
              <p
                onClick={() => {
                  console.log("!!!");
                }}
              >
                Deck {idx + 1}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}

DeckArray.propTypes = {
  // deckList: PropTypes.arrayOf(PropTypes.string).isRequired,
  length: PropTypes.number.isRequired,
  defaultName: PropTypes.string,
  size: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
};
