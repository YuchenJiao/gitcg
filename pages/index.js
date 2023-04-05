import { withSessionSsr } from "./lib/config/withSession";
import { statusCheck } from "@/helpers/statusCheck";
import { useRouter } from "next/router";
import Link from "next/link";
import { authenticate } from "@/helpers/authenticate";

export default Home;

function Home({ uid, username, decks }) {
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
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="display-3">Hello {username}</h1>
      {/* <Link href={`/edit/DECKID`} className="btn btn-link">Edit Deck</Link> */}
      <button onClick={logout} className="btn btn-primary">
        logout
      </button>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const auth = authenticate(req);

  if (!auth.isValid) {
    return auth.action;
  }

  const user = req.session.user;

  return {
    // props: { uid: user.id, username: user.username, decks: user.decks },
    props: { uid: user.id, username: user.username },
  };
});
