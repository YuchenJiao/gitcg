import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
import { genMongoToken } from "@/helpers/genMongoToken";
import { authenticate } from "@/helpers/authenticate";
// import path from "path";
// import { promises as fs } from "fs";

export default withSessionRoute(handler);

async function handler(req, res) {
  const auth = authenticate(req);
  if (!auth.isValid) {
    res.status(401).json("Unauthorized");
  } else {
    const token = genMongoToken("users");
    const client = await MongoClient.connect(token);
    const db = client.db();
    const collection = db.collection("decks");
    if (req.method === "GET") {
      // get saved deck
      const { uid, deckid, type } = req.query;
      const allDecks = await collection.find({ uid: uid }).toArray();
      if (!allDecks) {
        res.status(404).json("User info not found");
      } else {
        if (!deckid) {
          res.status(200).json(allDecks);
        } else {
          let deck = null;
          allDecks.some((elmt) => {
            if (elmt.deckid === deckid) {
              deck = elmt;
            }
            return elmt.deckid === deckid;
          });
          if (deck) {
            switch (type) {
              case "characterCard":
                res.status(200).json(deck.characters);
                break;
              case "actionCard":
                res.status(200).json(deck.actionCards);
                break;
              default:
                res.status(404).json("Card type not found");
            }
          } else {
            res.status(200).json(deck);
          }
        }
      }
      client.close();
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
        if (result) {
          res.status(200).json("deck updated successfully");
        } else {
          res.status(204).json("No content");
        }
        client.close();
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.method === "DELETE") {
      // delect deck
      try {
        const { uid, deckid } = req.query;
        const result = await collection.deleteOne({ uid: uid, deckid: deckid });
        if (result.acknowledged) {
          res.status(200).json("Delete deck successfully");
        } else {
          res.status(404).json("UID and Deckid not found");
        }
        client.close();
      } catch (error) {
        res.status(500).json(error);
      }
    }
  }
}
