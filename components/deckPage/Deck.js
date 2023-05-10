import PropTypes from "prop-types";
import styles from "@/styles/Deck.module.css";
import { BsBookmark } from "react-icons/bs";
import { useState } from "react";

export default Deck;

function Deck({ size, content, name }) {
  const [show, setShow] = useState(false);

  const setAsActive = () => {};

  return (
    <>
      <div className={`${styles.deck_container}`}>
        <BsBookmark size={size} className={`${styles.deck}`}></BsBookmark>
        <img
          src={content[0]}
          alt={content[0]}
          className={`${styles.first}`}
        ></img>
        <img
          src={content[1]}
          alt={content[1]}
          className={`${styles.second}`}
        ></img>
        <img
          src={content[2]}
          alt={content[2]}
          className={`${styles.third}`}
        ></img>
      </div>
      <div className={`${styles.dropdown}`}>
        <p
          onClick={() => {
            setShow(!show);
          }}
          className={`${styles.drop}`}
        >
          {name}
        </p>
        <div
          className={`${styles.dropdown_content} ${show ? styles.show : null}`}
        >
          <ul className={`${styles.list}`}>
            <li>
              <button onClick={setAsActive} className="btn btn-primary">
                Active
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

Deck.propTypes = {
  size: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};
