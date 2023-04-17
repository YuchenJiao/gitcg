import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
import { json2Str } from "@/helpers/json2Str";
// import path from "path";
// import { promises as fs } from "fs";

// export default handler;
export default withSessionRoute(handler);

async function handler(req, res) {
  const excludeKeqingSkill = (path) => {
    return !path.includes("lightning_stiletto");
  }

  if (req.method === "GET") {
    try {
      const token =
        process.env.MONGODB_TOKEN_PREFIX +
        "genshin_resource" +
        process.env.MONGODB_TOKEN_SUFFIX;
      const client = await MongoClient.connect(token);
      const db = client.db();
      const collection = db.collection("index");
      const result = await collection.findOne({ name: "action_card_list" });
      if (result) {
        const content = json2Str(result.ActionCard).filter(excludeKeqingSkill);
        res.status(200).json(
          content.map((path) => {
            return "/img/ActionCard" + path;
          })
        );
      } else {
        res.status(404).json({
          response: {
            data: "character list is lost",
            code: 404,
          },
        });
      }
      client.close();

      /* the version of using local file */
      // const file = path.join(process.cwd(), "/public/action_card_list.json");
      // const content = await fs.readFile(file, "utf8");
      // const obj = JSON.parse(content);
      // const jsonContent = json2Str(obj).filter(excludeKeqingSkill);
      // res.status(200).json(
      //   jsonContent.map((path) => {
      //     return "/img" + path;
      //   })
      // );
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
