import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
import { genMongoToken } from "@/helpers/genMongoToken";
// import path from "path";
// import { promises as fs } from "fs";

// export default handler;
export default withSessionRoute(handler);

async function handler(req, res) {
  if (req.method === "GET") {
    // get saved deck
  } else if (req.method === "PUT") {
    // post new deck or edit existing deck
    const token = genMongoToken("users");
    try {
      const client = await MongoClient.connect(token);
      const db = client.db();
      const collection = db.collection("decks");
      const { characters, actionCards, deckid, uid } = req.body;
      const result = await collection.updateOne(
        { uid: uid, deckid: deckid },
        {
          $set: {
            uid: uid,
            deckid: deckid,
            characters: characters,
            actionCards: actionCards,
          },
        },
        { upsert: true }
      );
      client.close();
      if (result) {
        res.status(200).json("deck updated successfully");
      } else {
        res.status(204).json("No content");
      }
    } catch (error) {
      res.status(500).json("Error");
    }
  } else if (req.method === "DELETE") {
    // delect deck
  }
}
