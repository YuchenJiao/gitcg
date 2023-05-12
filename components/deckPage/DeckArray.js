/* eslint-disable react-hooks/exhaustive-deps */
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
  const [decks, setDecks] = useState(
    [...Array(length)].map(() => {
      return 0;
    })
  );
  const [activeIdx, setActiveIdx] = useState(-1);

  useEffect(() => {
    async function getDecks() {
      try {
        const resp = await axios.get("/decks", {
          params: { uid: uid },
        });
        const userDeck = Array.from(resp.data.decks);
        const idx = Number(resp.data.activeIdx);
        setActiveIdx(idx);
        let newArr = [...decks];
        userDeck.forEach(({ deckid, characters }) => {
          newArr[deckid - 1] = characters;
        });
        setDecks(newArr);
      } catch (error) {
        console.log(error);
      }
    }
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
                className={`${styles.inner_container}`}
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
              <Deck
                size={size}
                content={n}
                name={`Deck ${idx + 1}`}
                isActive={idx + 1 === activeIdx}
                uid={uid}
                deckid={(idx + 1).toString()}
              ></Deck>
            </div>
          );
        }
      })}
    </div>
  );
}

DeckArray.propTypes = {
  length: PropTypes.number.isRequired,
  defaultName: PropTypes.string,
  size: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
};
