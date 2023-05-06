import { MongoClient } from "mongodb";
import { genMongoToken } from "@/helpers/genMongoToken";
import { withSessionRoute } from "pages/lib/config/withSession";

export default withSessionRoute(logout);

async function logout(req, res) {
  if (req.method === "GET") {
    try {
      const token = genMongoToken("users");
      const client = await MongoClient.connect(token);
      const db = client.db();
      const collection = db.collection("users");
      const result = await collection.updateOne(
        { username: req.session.user.username },
        { $set: { avatar: req.session?.user?.avatar } },
        { upsert: true }
      );
      req.session.destroy();
      res.status(200).json("saved your status successfully");
    } catch (error) {
      res.status(500).json("failed to save status due to unknown error");
    }
  }
}
