// import { MongoClient } from "mongodb";
import { withSessionRoute } from "pages/lib/config/withSession";
import path from "path";
import { promises as fs } from "fs";

// export default handler;
export default withSessionRoute(handler);

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const token =
      //   process.env.MONGODB_TOKEN_PREFIX +
      //   "genshin_resource" +
      //   process.env.MONGODB_TOKEN_SUFFIX;
      // const client = await MongoClient.connect(token);
      // const db = client.db();
      // const collection = db.collection("index");
      // const result = await collection.findOne({ name: "character_list" });
      // if (result) {
      //   const path = result.Character.map((char) => {
      //     return "/img/Character/" + char + ".png";
      //   });
      //   res.status(200).json(path);
      // } else {
      //   res.status(404).json({
      //     response: {
      //       data: "character list is lost",
      //       code: 404,
      //     },
      //   });
      // }
      // client.close();

      /* the version of using local file */
      const file = path.join(process.cwd(), "/public/action_card_list.json");
      const content = await fs.readFile(file, "utf8");
      res.status(200).json(JSON.stringify(JSON.parse(content).Character));
    } catch (err) {
      res.status(500).json({
        response: {
          data: err,
          code: 500,
        },
      });
    }
  }
}
