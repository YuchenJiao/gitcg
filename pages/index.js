import { withSessionSsr } from "./lib/config/withSession";
import { statusCheck } from "@/helpers/statusCheck";
import { useRouter } from "next/router";
import { authenticate } from "@/helpers/authenticate";
import styles from "styles/index.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useEffect, useState } from "react";

export default Home;

function Home({ uid, username, avatar }) {
  const router = useRouter();
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";
  const [charList, setCharList] = useState([]);
  const [actionCardList, setActionCardList] = useState([]);

  const logout = async () => {
    fetch("/api/logout", {
      method: "GET",
    })
      .then(statusCheck)
      .then(() => {
        console.log("Logout");
        router.push("/account/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  // const getCharacters = async () => {
  //   const res = await fetch("/api/characters", {
  //     method: "GET",
  //   });
  //   try {
  //     await statusCheck(res);
  //     const content = await res.json();
  //     setCharList(Array.from(content));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    // getCharacters();
    getCards("/api/characters", setCharList);
    getCards("/api/actionCards", setActionCardList);
  }, []);

  return (
    <>
      <nav className={`${styles.sidebar} d-lg-block collapse bg-white`}>
        <div className={`${styles.center}`}>
          <div className={`${styles.center} list-group list-group-flush`}>
            <div className="list-group-item">
              <img
                id="avatar"
                src={avatarImg}
                alt="default avatar"
                className={`${styles.avatar}`}
              ></img>
            </div>
            <div className="list-group-item">
              <p className="h5">{username}</p>
            </div>
            {/* <div className="list-group-item">
              <button onClick={getCharacters} className="btn btn-primary">
                edit
              </button>
            </div> */}
            <div className="list-group-item">
              <button onClick={logout} className="btn btn-primary">
                logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Swiper
        slidesPerView={3}
        pagination={{
          clickable: true,
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
