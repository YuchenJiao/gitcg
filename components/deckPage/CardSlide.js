import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import PropTypes from "prop-types";
import styles from "@/styles/CardSlide.module.css";
import cardStyles from "@/styles/Card.module.css";
import Card from "@/components/deckPage/Card";
import { useState } from "react";

export default CardSlide;

function CardSlide({ viewCount, imgList, type, max }) {
  const [cardNum, setCardNum] = useState(0);

  const refreshCount = () => {
    switch (type) {
      case "characterCard":
        setCardNum(
          document.querySelectorAll(`.${cardStyles.selected_char}`).length
        );
        break;
      case "actionCard":
        setCardNum(
          document.querySelectorAll(
            `div.${cardStyles.num_one}:not(.${cardStyles.hidden})`
          ).length +
            2 *
              document.querySelectorAll(
                `div.${cardStyles.num_two}:not(.${cardStyles.hidden})`
              ).length
        );
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
};
