import styles from "@/styles/DeckArray.module.css";
import { BsBookmarkPlus, BsBookmark } from "react-icons/bs";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import axios from "@/axios/custom";
import { useEffect } from "react";

export default DeckArray;

function DeckArray({ length, defaultName, size, uid }) {
  const router = useRouter();

  const getDecks = async () => {
    try {
      // const resp = await axios.get("/decks", {
      //   params: { deckid: 1, uid: uid },
      // });
      // console.log(resp.data);
      const resp = await axios.get("/decks", {
        params: { uid: uid },
      });
      console.log(resp.data);
    } catch (error) {}
  };

  useEffect(() => {
    getDecks();
  }, []);

  const arr = [...Array(length)].map(() => {
    return 0;
  });

  const toBuild = (did) => {
    router.push(`/decks/${did}`);
  };

  return (
    <div className={`${styles.outer_container}`}>
      {arr.map((n, idx) => {
        return (
          <div key={idx} className={`${styles.container}`}>
            <BsBookmarkPlus
              size={size}
              className={`${styles.deck}`}
              onClick={() => {
                toBuild(idx + 1);
              }}
            ></BsBookmarkPlus>
            <p>{defaultName}</p>
          </div>
        );
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
