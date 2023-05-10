import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
import { genMongoToken } from "@/helpers/genMongoToken";
import { authenticate } from "@/helpers/authenticate";

export default withSessionRoute(handler);

async function handler(req, res) {
  const auth = authenticate(req);
  if (!auth.isValid) {
    res.status(401).json("Unauthorized");
  } else {
    if (req.method === "POST") {
      const path = "/img/Avatar/";
      const type = ".png";
      try {
        const token = genMongoToken("genshin_resource");
        const client = await MongoClient.connect(token);
        const db = client.db();
        const collection = db.collection("index");
        const result = await collection.findOne({ name: "avatar_list" });
        const { current } = req.body;
        if (result) {
          const list = Array.from(result.Avatar);
          const name = current.substring(
            path.length,
            current.length - type.length
          );
          const index = list.indexOf(name);
          if (index >= 0) {
            const nextAvatar = path + list[(index + 1) % list.length] + type;
            req.session.user.avatar = nextAvatar;
            await req.session.save();
            res.status(200).json(nextAvatar);
          } else {
            res.status(404).json("Current avatar not found");
          }
        } else {
          res.status(404).json("Avatar list not found");
        }
        client.close();
      } catch (error) {
        res.status(500).json({ error });
      }
    }
  }
}
