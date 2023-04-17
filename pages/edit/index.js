import { withSessionSsr } from "@/lib/config/withSession";
import { statusCheck } from "@/helpers/statusCheck";
import { authenticate } from "@/helpers/authenticate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useEffect, useState } from "react";
import { SideBar } from "@/components/mainPage/SideBar";

export default Edit;

function Edit({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);

  const getCards = async (endPoint, func) => {
    const res = await fetch(endPoint, {
      method: "GET",
    });
    try {
      await statusCheck(res);
      const content = await res.json();
      func(Array.from(content));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // getCharacters();
    getCards("/api/characters", setCharList);
    getCards("/api/actionCards", setActionCardList);
  }, []);

  return (
    <>
      <SideBar username={username} avatarImg={avatarImg}></SideBar>
      <Swiper
        slidesPerView={3}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className={"mySwiper"}
      >
        {charList.map((img, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={img} alt={img}></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        slidesPerView={3}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className={"mySwiper"}
      >
        {actionCardList.map((img, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={img} alt={img}></img>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const auth = authenticate(req);

  if (!auth.isValid) {
    return auth.action;
  }

  const user = req.session.user;

  return {
    props: { uid: user.id, username: user.username, avatar: user.avatar },
  };
});
