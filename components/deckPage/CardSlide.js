import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import PropTypes from "prop-types";
import styles from "@/styles/CardSlide.module.css";
import { useRef } from "react";

export { CardSlide };

function CardSlide({ viewCount, imgList }) {
  const refList = new Array(imgList.length);
  for (let i = 0; i < refList.length; i++) {
    refList[i] = useRef();
  }

  const onSelect = (idx) => {
    refList[idx].current.classList.toggle(`${styles.selected}`);
  };

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
        {imgList.map((img, idx) => {
          return (
            <SwiperSlide key={idx} className={`${styles.swiper_slide}`}>
              <img
                id={img}
                src={img}
                alt={img}
                ref={refList[idx]}
                onClick={() => {
                  onSelect(idx);
                }}
              ></img>
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
};
