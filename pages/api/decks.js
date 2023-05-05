import { MongoClient } from "mongodb";
import { withSessionRoute } from "@/lib/config/withSession";
// import path from "path";
// import { promises as fs } from "fs";

// export default handler;
export default withSessionRoute(handler);

async function handler(req, res) {
  if (req.method === "GET") { // get saved deck

  } else if (req.method === "POST") { // post new deck

  } else if (req.method === "PUT") { // edit existing deck

  } else if (req.method === "DELETE") { // delect deck

  }
}