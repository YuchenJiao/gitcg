import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
import { json2Str } from "@/helpers/json2Str";
import { genMongoToken } from "@/helpers/genMongoToken";
import { authenticate } from "@/helpers/authenticate";
// import path from "path";
// import { promises as fs } from "fs";

// export default handler;
export default withSessionRoute(handler);

async function handler(req, res) {
  const excludeKeqingSkill = (path) => {
    return !path.includes("lightning_stiletto");
  };
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
        const result = await collection.findOne({ name: "action_card_list" });
        if (result) {
          const content = json2Str(result.ActionCard).filter(
            excludeKeqingSkill
          );
          res.status(200).json(
            content.map((path) => {
              return "/img/ActionCard" + path;
            })
          );
        } else {
          res.status(404).json({
            msg: "character list is lost",
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
          err,
        });
      }
    }
  }
}
