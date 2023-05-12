import { MongoClient } from "mongodb";
import { genMongoToken } from "@/helpers/genMongoToken";
import { withSessionRoute } from "lib/config/withSession";
import { genS3Img } from "@/helpers/genS3Img";

export default withSessionRoute(handler);

async function handler(req, res) {
  if (req.method === "GET") {
    const token = genMongoToken("users");
    try {
      const client = await MongoClient.connect(token);
      const db = client.db();
      const collection = db.collection("users");
      const { username, password } = req.query;
      const result = await collection.findOne({ username: username });
      let isCorrectUser = false;
      if (result) {
        const bcrypt = require("bcrypt");
        const parsed = {
          id: result._id.toString(),
          username: result.username,
          hash: result.password,
        };
        isCorrectUser = bcrypt.compareSync(password, parsed.hash);
      }
      client.close();
      if (isCorrectUser) {
        req.session.user = {
          id: result._id.toString(),
          username: result.username,
          avatar: result.avatar ? result.avatar : genS3Img("/img/Avatar/jean.png"),
        };
        await req.session.save();
        res.status(200).json({
          msg: "Login succeed",
        });
      } else {
        res.status(401).json({
          msg: "Invalid credential",
        });
      }
    } catch (err) {
      res.status(500).json({
        err,
      });
    }
  }
}
