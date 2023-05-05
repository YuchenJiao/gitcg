import styles from "@/styles/DeckArray.module.css";
import { BsBookmarkPlus, BsBookmark } from "react-icons/bs";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default DeckArray;

function DeckArray({ deckList, length, defaultName, size }) {
  const router = useRouter();
  const deckid = 1;

  const arr = [...Array(length)].map(() => {
    return { value: 0 };
  });

  const toBuild = () => {
    router.push(`/decks/${deckid}`);
  };

  return (
    <div className={`${styles.outer_container}`}>
      {arr.map((n, idx) => {
        return (
          <div className={`${styles.container}`}>
            <BsBookmarkPlus
              key={idx}
              size={size}
              className={`${styles.deck}`}
              onClick={toBuild}
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
};
