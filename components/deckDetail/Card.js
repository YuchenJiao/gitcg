import PropTypes from "prop-types";
import styles from "@/styles/Card.module.css";
import { useRef } from "react";
import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs1Square,
  Bs2Square,
} from "react-icons/bs";

export default Card;

function Card({ img, type }) {
  const refImg = useRef();
  const refFirstChar = useRef();
  const refSecondChar = useRef();
  const refThirdChar = useRef();
  const refAddOne = useRef();
  const refAddTwo = useRef();

  const onSelectChar = () => {
    if (refImg.current.classList.contains(`${styles.selected_char}`)) {
      refImg.current.classList.remove(`${styles.selected_char}`);
      refFirstChar.current.classList.add(`${styles.hidden}`);
      refSecondChar.current.classList.add(`${styles.hidden}`);
      refThirdChar.current.classList.add(`${styles.hidden}`);
    } else {
      const len = document.querySelectorAll(`.${styles.selected_char}`).length;
      if (len < 3) {
        refImg.current.classList.add(`${styles.selected_char}`);
        if (
          !document.querySelector(
            `div.${styles.char_first}:not(.${styles.hidden})`
          )
        ) {
          refFirstChar.current.classList.remove(`${styles.hidden}`);
        } else if (
          !document.querySelector(
            `div.${styles.char_second}:not(.${styles.hidden})`
          )
        ) {
          refSecondChar.current.classList.remove(`${styles.hidden}`);
        } else if (
          !document.querySelector(
            `div.${styles.char_third}:not(.${styles.hidden})`
          )
        ) {
          refThirdChar.current.classList.remove(`${styles.hidden}`);
        }
      }
    }
  };

  const onSelectAction = () => {
    const len =
      document.querySelectorAll(`div.${styles.num_one}:not(.${styles.hidden})`)
        .length +
      2 *
        document.querySelectorAll(
          `div.${styles.num_two}:not(.${styles.hidden})`
        ).length;
    if (len < 30) {
      if (!refAddTwo.current.classList.contains(`${styles.hidden}`)) {
        refAddOne.current.classList.add(`${styles.hidden}`);
        refAddTwo.current.classList.add(`${styles.hidden}`);
        refImg.current.classList.remove(`${styles.selected_action}`);
      } else if (!refAddOne.current.classList.contains(`${styles.hidden}`)) {
        refAddOne.current.classList.add(`${styles.hidden}`);
        refAddTwo.current.classList.remove(`${styles.hidden}`);
        refImg.current.classList.add(`${styles.selected_action}`);
      } else {
        refAddOne.current.classList.remove(`${styles.hidden}`);
        refAddTwo.current.classList.add(`${styles.hidden}`);
        refImg.current.classList.add(`${styles.selected_action}`);
      }
    } else {
      refAddOne.current.classList.add(`${styles.hidden}`);
      refAddTwo.current.classList.add(`${styles.hidden}`);
      refImg.current.classList.remove(`${styles.selected_action}`);
    }
  };

  return (
    <div className={`${styles.card_wrapper}`}>
      <img
        id={img}
        src={img}
        alt={img}
        className={`${styles.card_img}`}
        ref={refImg}
        onClick={() => {
          switch (type) {
            case "characterCard":
              onSelectChar();
              break;
            case "actionCard":
              onSelectAction();
              break;
            default:
          }
        }}
      ></img>
      {/* Filled circle for character order */}
      <div
        ref={refFirstChar}
        className={`${styles.char_first} ${styles.hidden}`}
      >
        <Bs1CircleFill size={25}></Bs1CircleFill>
      </div>
      <div
        ref={refSecondChar}
        className={`${styles.char_second} ${styles.hidden}`}
      >
        <Bs2CircleFill size={25}></Bs2CircleFill>
      </div>
      <div
        ref={refThirdChar}
        className={`${styles.char_third} ${styles.hidden}`}
      >
        <Bs3CircleFill size={25}></Bs3CircleFill>
      </div>
      {/* Empty square for numner of card */}
      <div ref={refAddOne} className={`${styles.num_one} ${styles.hidden}`}>
        <Bs1Square size={25}></Bs1Square>
      </div>
      <div ref={refAddTwo} className={`${styles.num_two} ${styles.hidden}`}>
        <Bs2Square size={25}></Bs2Square>
      </div>
    </div>
  );
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
