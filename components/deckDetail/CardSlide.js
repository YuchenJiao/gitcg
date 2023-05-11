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
import { countCard } from "@/helpers/countCard";

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

  const refresh = () => {
    const result = countCard(type);
    setCardNum(result.num);
    setNum(result.num);
    setSelectedList(result.list);
    setList(result.list);
  };

  const getDeck = async () => {
    try {
      const resp = await axios.get("/decks", {
        params: { uid: uid, deckid: deckid, type: type },
      });
      const deck = resp.data;
      if (deck) {
        setCardNum(deck.length);
        setSelectedList(deck);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeck();
  });

  return (
    <div onMouseOver={refresh}>
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
