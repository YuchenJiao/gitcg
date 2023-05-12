import { withSessionRoute } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";

export default withSessionRoute(logout);

async function logout(req, res) {
  const auth = authenticate(req);
  if (!auth.isValid) {
    res.status(401).json("Unauthorized");
  } else {
    if (req.method === "GET") {
      try {
        req.session.destroy();
        res.status(200).json("log out successfully");
      } catch (error) {
        res.status(500).json("failed to log out due to unknown error");
      }
    }
  }
}
