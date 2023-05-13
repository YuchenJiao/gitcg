import { useRouter } from "next/router";
import styles from "styles/SideBar.module.css";
import axios from "@/axios/custom";
import { useState } from "react";
import Image from "next/image";

export default SideBar;

function SideBar({ uid, username, avatarImg }) {
  const router = useRouter();
  const [avatar, setAvatar] = useState(avatarImg);
  const height = 256;
  const width = 256;

  const logout = async () => {
    try {
      const resp = await axios.get("/logout");
      console.log(resp.data);
      router.push("/account/login");
    } catch (error) {
      console.log(error.response);
    }
  };

  const toDeckPage = () => {
    router.push("/decks");
  };

  const toHomePage = async () => {
    try {
      const resp = await axios.get("/duel", {
        params: {
          uid: uid,
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getNextAvatar = async () => {
    try {
      const resp = await axios.post("/avatar", {
        current: avatarImg,
      });
      const nextAvatar = resp.data;
      setAvatar(nextAvatar);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const toDuel = () => {
    router.push("/duel");
  };

  return (
    <nav className={`${styles.sidebar} d-lg-block collapse bg-white`}>
      <div className={`${styles.center}`}>
        <div className={`${styles.center} list-group list-group-flush`}>
          <div className="list-group-item">
            <Image
              src={avatar}
              width={width}
              height={height}
              alt={"avatar"}
              onClick={getNextAvatar}
              priority
              className={`${styles.avatar}`}
            ></Image>
          </div>
          <div className="list-group-item">
            <p className="h5">{username}</p>
          </div>
          <div className="list-group-item">
            <button onClick={toHomePage} className="btn btn-primary">
              home
            </button>
          </div>
          <div className="list-group-item">
            <button onClick={toDeckPage} className="btn btn-primary">
              decks
            </button>
          </div>
          <div className="list-group-item">
            <button onClick={toDuel} className="btn btn-primary">
              DUEL !
            </button>
          </div>
          <div className="list-group-item">
            <button onClick={logout} className="btn btn-primary">
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
