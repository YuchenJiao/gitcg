import { MongoClient } from "mongodb";
import { withSessionRoute } from "lib/config/withSession";
import { genMongoToken } from "@/helpers/genMongoToken";
import { authenticate } from "@/helpers/authenticate";

export default withSessionRoute(handler);

async function handler(req, res) {
  const auth = authenticate(req);
  if (!auth.isValid) {
    res.status(401).json("Unauthorized");
  } else {
  }
}
