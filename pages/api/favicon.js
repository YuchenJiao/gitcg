import { withSessionRoute } from "lib/config/withSession";
import { authenticate } from "@/helpers/authenticate";
import { genS3Img } from "@/helpers/genS3Img";

export default withSessionRoute(handler);

async function handler(req, res) {
  const auth = authenticate(req);
  if (!auth.isValid) {
    res.status(401).json("Unauthorized");
  } else {
    if (req.method === "GET") {
      res.status(200).json(genS3Img("/static/favicon.ico"));
    }
  }
}
