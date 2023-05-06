import { MongoClient } from "mongodb";
import { genMongoToken } from "@/helpers/genMongoToken";

export default handler;

async function handler(req, res) {
  if (req.method === "POST") {
    const token = genMongoToken("users");
    try {
      const client = await MongoClient.connect(token);
      const db = client.db();
      const collection = db.collection("users");
      const { username, password } = req.body;
      const existUsername = await collection.findOne({ username: username });
      if (!existUsername) {
        const bcrypt = require("bcrypt");
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
        const hash = bcrypt.hashSync(password, salt);
        const result = await collection.insertOne({
          username: username,
          password: hash,
          avatar: "/img/Avatar/jean.png",
        });
        res.status(201).json({
          data: result,
        });
      } else {
        res.status(409).json({
          msg: "Username already exists",
        });
      }
      client.close();
    } catch (err) {
      res.status(500).json({
        err,
      });
    }
  }
}
