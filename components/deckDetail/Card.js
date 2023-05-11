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
import Image from "next/image";

export default Card;

function Card({ img, type, flags }) {
  const refImg = useRef();
  const refFirstChar = useRef();
  const refSecondChar = useRef();
  const refThirdChar = useRef();
  const refAddOne = useRef();
  const refAddTwo = useRef();

  const height = 720;
  const width = 420;

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

  const imgClass = flags[0]
    ? type === "characterCard"
      ? `${styles.selected_char}`
      : `${styles.selected_action}`
    : null;

  const firstCharClass = flags[1] ? null : `${styles.hidden}`;
  const secondCharClass = flags[2] ? null : `${styles.hidden}`;
  const thirdCharClass = flags[3] ? null : `${styles.hidden}`;
  const oneCardClass = flags[4] ? null : `${styles.hidden}`;
  const twoCardsClass = flags[5] ? null : `${styles.hidden}`;

  return (
    <div className={`${styles.card_wrapper}`}>
      <Image
        id={img}
        src={img}
        height={height}
        width={width}
        alt={img}
        className={`${styles.card_img} ${imgClass}`}
        unoptimized
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
      ></Image>
      {/* Filled circle for character order */}
      <div
        ref={refFirstChar}
        className={`${styles.char_first} ${firstCharClass}`}
      >
        <Bs1CircleFill size={25}></Bs1CircleFill>
      </div>
      <div
        ref={refSecondChar}
        className={`${styles.char_second} ${secondCharClass}`}
      >
        <Bs2CircleFill size={25}></Bs2CircleFill>
      </div>
      <div
        ref={refThirdChar}
        className={`${styles.char_third} ${thirdCharClass}`}
      >
        <Bs3CircleFill size={25}></Bs3CircleFill>
      </div>
      {/* Empty square for numner of card */}
      <div ref={refAddOne} className={`${styles.num_one} ${oneCardClass}`}>
        <Bs1Square size={25}></Bs1Square>
      </div>
      <div ref={refAddTwo} className={`${styles.num_two} ${twoCardsClass}`}>
        <Bs2Square size={25}></Bs2Square>
      </div>
    </div>
  );
}

Card.propTypes = {
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  flags: PropTypes.arrayOf(PropTypes.bool),
};
