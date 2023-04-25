import styles from "@/styles/DeckArray.module.css";
import { BsBookmarkPlus, BsBookmark } from "react-icons/bs";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export { DeckArray };

function DeckArray({ deckList }) {
  const router = useRouter();

  const length = 8;
  const arr = [...Array(length)].map(() => {
    return { value: 0 };
  });

  const toBuild = () => {
    router.push("/build");
  }

  return (
    <div className={`${styles.outer_container}`}>
      {arr.map((n, idx) => {
        return (
          <div className={`${styles.container}`}>
            <BsBookmarkPlus
              key={idx}
              size={150}
              className={`${styles.deck}`}
              onClick={toBuild}
            ></BsBookmarkPlus>
            <p>Create new Deck</p>
          </div>
        );
      })}
    </div>
  );
}

// DeckArray.propTypes = {
//   deckList: PropTypes.arrayOf(PropTypes.string).isRequired,
// };
