import { useRouter } from "next/router";
import styles from "styles/SideBar.module.css";
import axios from "@/axios/custom";
import { useState } from "react";

export default SideBar;

function SideBar({ username, avatarImg }) {
  const router = useRouter();
  const [avatar, setAvatar] = useState(avatarImg);

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

  const toHomePage = () => {
    router.push("/");
  };

  const getNextAvatar = async () => {
    try {
      const resp = await axios.post("/avatar", {
        current: avatarImg,
      });
      const nextAvatar = resp.data;
      setAvatar(nextAvatar);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toDuel = () => {
    alert("Not implemented yet");
  };

  return (
    <nav className={`${styles.sidebar} d-lg-block collapse bg-white`}>
      <div className={`${styles.center}`}>
        <div className={`${styles.center} list-group list-group-flush`}>
          <div className="list-group-item">
            <img
              id="avatar"
              src={avatar}
              alt="avatar"
              onClick={getNextAvatar}
              className={`${styles.avatar}`}
            ></img>
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
