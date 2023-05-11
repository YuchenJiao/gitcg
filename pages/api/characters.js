import { MongoClient } from "mongodb";
import { withSessionRoute } from "lib/config/withSession";
import { genMongoToken } from "@/helpers/genMongoToken";
import { authenticate } from "@/helpers/authenticate";
// import path from "path";
// import { promises as fs } from "fs";

export default withSessionRoute(handler);

async function handler(req, res) {
  const auth = authenticate(req);
  if (!auth.isValid) {
    res.status(401).json("Unauthorized");
  } else {
    if (req.method === "GET") {
      try {
        const token = genMongoToken("genshin_resource");
        const client = await MongoClient.connect(token);
        const db = client.db();
        const collection = db.collection("index");
        const result = await collection.findOne({ name: "character_list" });
        if (result) {
          const path = result.Character.map((char) => {
            return "/img/Character/" + char + ".png";
          });
          res.status(200).json(path);
        } else {
          res.status(404).json({
            msg: "character list is lost",
          });
        }
        client.close();

        /* the version of using local file */
        // const file = path.join(process.cwd(), "/public/character_list.json");
        // const content = await fs.readFile(file, "utf8");
        // res.status(200).json(JSON.stringify(JSON.parse(content).Character));
      } catch (err) {
        res.status(500).json({
          err,
        });
      }
    }
  }
}
