import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import PropTypes from "prop-types";
import styles from "@/styles/CardSlide.module.css";
import Card from "@/components/deckPage/Card";

export default CardSlide;

function CardSlide({ viewCount, imgList, type }) {
  return (
    <>
      <Swiper
        slidesPerView={viewCount}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className={`${styles.swiper} mySwiper`}
      >
        {imgList.length > 0 &&
          imgList.map((img, idx) => {
            return (
              <SwiperSlide key={idx} className={`${styles.swiper_slide}`}>
                <Card img={img} type={type}></Card>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}

CardSlide.propTypes = {
  viewCount: PropTypes.number.isRequired,
  imgList: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string,
};
