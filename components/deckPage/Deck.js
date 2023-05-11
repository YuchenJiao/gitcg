import PropTypes from "prop-types";
import styles from "@/styles/Deck.module.css";
import { BsBookmark } from "react-icons/bs";
import { useState } from "react";
import axios from "@/axios/custom";
import { useRouter } from "next/router";
import Image from "next/image";

export default Deck;

function Deck({ size, content, name, isActive, uid, deckid }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const height = 171.43;
  const width = 100;

  const setAsActive = async () => {
    try {
      const resp = await axios.put("/decks", {
        uid: uid,
        deckid: deckid,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const toBuild = () => {
    router.push(`/decks/${deckid}`);
  };

  return (
    <>
      <div onClick={toBuild} className={`${styles.deck_container}`}>
        <BsBookmark size={size} className={`${styles.deck}`}></BsBookmark>
        <Image
          src={content[0]}
          width={width}
          height={height}
          alt={content[0]}
          className={`${styles.first}`}
        ></Image>
        <Image
          src={content[1]}
          width={width}
          height={height}
          alt={content[1]}
          className={`${styles.second}`}
        ></Image>
        <Image
          src={content[2]}
          width={width}
          height={height}
          alt={content[2]}
          className={`${styles.third}`}
        ></Image>
      </div>
      <div
        onMouseEnter={() => {
          setShow(!show);
        }}
        onMouseLeave={() => {
          setShow(!show);
        }}
        className={`${styles.dropdown}`}
      >
        <p className={`${styles.drop}`}>{name}</p>
        <div
          className={`${styles.dropdown_content} ${show ? styles.show : null}`}
        >
          <ul className={`${styles.list}`}>
            <li>
              {isActive ? (
                <button className="btn btn-secondary">Activated</button>
              ) : (
                <button onClick={setAsActive} className="btn btn-primary">
                  Active
                </button>
              )}
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
  isActive: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  deckid: PropTypes.string.isRequired,
};
