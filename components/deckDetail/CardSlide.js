import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import PropTypes from "prop-types";
import styles from "@/styles/CardSlide.module.css";
import cardStyles from "@/styles/Card.module.css";
import Card from "@/components/deckDetail/Card";
import { useState } from "react";

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
        const singleCards = Array.from(document.querySelectorAll(
          `.${cardStyles.num_one}:not(.${cardStyles.hidden})`
        ));
        const doubleCards = Array.from(document.querySelectorAll(
          `.${cardStyles.num_two}:not(.${cardStyles.hidden})`
        ));
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
          return (
            <SwiperSlide key={idx} className={`${styles.swiper_slide}`}>
              <Card img={img} type={type}></Card>
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
