import { useRouter } from "next/router";
import { statusCheck } from "@/helpers/statusCheck";
import styles from "styles/SideBar.module.css";

export { SideBar };

function SideBar({ username, avatarImg }) {
  const router = useRouter();

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

  const toDeckPage = () => {
    router.push("/decks");
  };

  const toHomePage = () => {
    router.push("/");
  };

  return (
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
            <button onClick={logout} className="btn btn-primary">
              logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
