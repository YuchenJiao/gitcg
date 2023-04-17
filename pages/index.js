import { withSessionSsr } from "@/lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import { SideBar } from "@/components/mainPage/SideBar";

export default Home;

function Home({ uid, username, avatar }) {
  const avatarImg = avatar ? avatar : "/img/Avatar/jean.png";

  return (
    <>
      <SideBar username={username} avatarImg={avatarImg}></SideBar>
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
