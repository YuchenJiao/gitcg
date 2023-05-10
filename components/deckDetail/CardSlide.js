import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import PropTypes from "prop-types";
import styles from "@/styles/CardSlide.module.css";
import cardStyles from "@/styles/Card.module.css";
import Card from "@/components/deckDetail/Card";
import { useState, useEffect } from "react";
import axios from "@/axios/custom";

export default CardSlide;

function CardSlide({
  viewCount,
  imgList,
  type,
  max,
  selected,
  setNum,
  list,
  setList,
  uid,
  deckid,
}) {
  const [cardNum, setCardNum] = useState(selected);
  const [selectedList, setSelectedList] = useState(list);

  const refreshCount = () => {
    switch (type) {
      case "characterCard":
        const charNum = document.querySelectorAll(
          `.${cardStyles.selected_char}`
        ).length;
        setCardNum(charNum);
        setNum(charNum);
        const firstChar = document.querySelector(
          `.${cardStyles.char_first}:not(.${cardStyles.hidden})`
        )?.parentElement?.childNodes[0]?.id;
        const secondChar = document.querySelector(
          `.${cardStyles.char_second}:not(.${cardStyles.hidden})`
        )?.parentElement?.childNodes[0]?.id;
        const thirdChar = document.querySelector(
          `.${cardStyles.char_third}:not(.${cardStyles.hidden})`
        )?.parentElement?.childNodes[0]?.id;
        setSelectedList([firstChar, secondChar, thirdChar]);
        setList([firstChar, secondChar, thirdChar]);
        break;
      case "actionCard":
        const actionCardNum =
          document.querySelectorAll(
            `div.${cardStyles.num_one}:not(.${cardStyles.hidden})`
          ).length +
          2 *
            document.querySelectorAll(
              `div.${cardStyles.num_two}:not(.${cardStyles.hidden})`
            ).length;
        setCardNum(actionCardNum);
        setNum(actionCardNum);
        const singleCards = Array.from(
          document.querySelectorAll(
            `.${cardStyles.num_one}:not(.${cardStyles.hidden})`
          )
        );
        const doubleCards = Array.from(
          document.querySelectorAll(
            `.${cardStyles.num_two}:not(.${cardStyles.hidden})`
          )
        );
        let selectedCardList = [];
        singleCards.forEach((ref) => {
          selectedCardList.push(ref?.parentElement?.childNodes[0]?.id);
        });
        doubleCards.forEach((ref) => {
          selectedCardList.push(ref?.parentElement?.childNodes[0]?.id);
          selectedCardList.push(ref?.parentElement?.childNodes[0]?.id);
        });
        setSelectedList(selectedCardList);
        setList(selectedCardList);
        break;
      default:
    }
  };

  const getDeck = async () => {
    try {
      const resp = await axios.get("/decks", {
        params: { uid: uid, deckid: deckid },
      });
      const deckList = resp.data;
      if (deckList) {
        if (type === "characterCard") {
          setCardNum(3);
          setSelectedList(deckList.characters);
        } else if (type === "actionCard") {
          setCardNum(30);
          setSelectedList(deckList.actionCards);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <div onClick={refreshCount}>
      <p>
        {cardNum}/{max}
      </p>
      <Swiper
        slidesPerView={viewCount}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className={`${styles.swiper} mySwiper`}
      >
        {imgList.map((img, idx) => {
          const loc = selectedList.indexOf(img);
          let flags = [false, false, false, false, false, false];
          if (loc !== -1) {
            if (type === "characterCard") {
              switch (loc) {
                case 0:
                  flags = [true, true, false, false, false, false];
                  break;
                case 1:
                  flags = [true, false, true, false, false, false];
                  break;
                default:
                  flags = [true, false, false, true, false, false];
              }
            } else if (type === "actionCard") {
              if (
                loc === selectedList.length - 1 ||
                selectedList[loc + 1] !== selectedList[loc]
              ) {
                flags = [true, false, false, false, true, false];
              } else {
                flags = [true, false, false, false, false, true];
              }
            }
          }
          return (
            <SwiperSlide key={idx} className={`${styles.swiper_slide}`}>
              <Card img={img} type={type} flags={flags}></Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

CardSlide.propTypes = {
  viewCount: PropTypes.number.isRequired,
  imgList: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string,
  max: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired,
  setNum: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string),
  setList: PropTypes.func,
};
