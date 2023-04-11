import { MongoClient } from "mongodb";

export default handler;

async function handler(req, res) {
  if (req.method === "POST") {
    const token =
      process.env.MONGODB_TOKEN_PREFIX +
      "users" +
      process.env.MONGODB_TOKEN_SUFFIX;
    try {
      const client = await MongoClient.connect(token);
      const db = client.db();
      const collection = db.collection("users");
      const data = req.body;
      const { username, password } = data;
      const existUsername = await collection.findOne({ username: username });
      if (!existUsername) {
        const bcrypt = require("bcrypt");
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
        const hash = bcrypt.hashSync(password, salt);
        const result = await collection.insertOne({
          username: username,
          password: hash
        });
        res.status(201).json({
          response: {
            data: result,
            code: 201,
          },
        });
      } else {
        res.status(409).json({
          response: {
            data: {
              msg: "Username already exists",
            },
            code: 409,
          },
        });
      }
      client.close();
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
