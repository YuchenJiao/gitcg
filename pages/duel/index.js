import { withSessionSsr } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";

export default Duel;

function Duel({ uid, username, avatar }) {

  return (
    <>
    <p>{uid}</p>
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
