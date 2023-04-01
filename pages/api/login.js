import { MongoClient } from "mongodb";

import { withSessionRoute } from "pages/lib/config/withSession";

// export default handler;
export default withSessionRoute(handler);

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
          username: username,
          isAdmin: true,
        };
        await req.session.save();
        res.status(200).json({
          response: {
            data: {
              msg: "Login succeed",
            },
            code: 200,
          },
        });
      } else {
        res.status(401).json({
          response: {
            data: {
              msg: "Invalid credential",
            },
            code: 401,
          },
        });
      }
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
