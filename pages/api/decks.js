import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
import { genMongoToken } from "@/helpers/genMongoToken";
// import path from "path";
// import { promises as fs } from "fs";

// export default handler;
export default withSessionRoute(handler);

async function handler(req, res) {
  const token = genMongoToken("users");
  const client = await MongoClient.connect(token);
  const db = client.db();
  const collection = db.collection("decks");
  if (req.method === "GET") {
    // get saved deck
    const { deckid, uid } = req.query;
    if (deckid) {
      const result = await collection.findOne({ uid: uid, deckid: deckid });
      if (result) {
        const charList = Array.from(result.characters);
        const cardList = Array.from(result.actionCards);
        res.status(200).json({ charList: charList, cardList: cardList });
      } else {
        res.status(404).json("Card deck not found");
      }
      client.close();
    } else {
      const result = await collection.find({ uid: uid }).toArray();
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json("Card deck not found");
      }
      client.close();
    }
  } else if (req.method === "PUT") {
    // post new deck or edit existing deck
    try {
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
