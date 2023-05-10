import { withSessionSsr } from "@/lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import SideBar from "@/components/mainPage/SideBar";
import DeckArray from "@/components/deckPage/DeckArray";

export default Decks;

function Decks({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";

  return (
    <>
      <SideBar username={username} avatarImg={avatarImg}></SideBar>
      <DeckArray
        length={8}
        defaultName={"New Deck"}
        size={150}
        uid={uid}
      ></DeckArray>
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
