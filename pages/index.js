import { withSessionSsr } from "./lib/config/withSession";
import { statusCheck } from "@/helpers/statusCheck";
import { useRouter } from "next/router";

export default Home;

function Home({ user }) {
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
      <h1>Hello {user.username}</h1>
      <p>Secret Content</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
});
