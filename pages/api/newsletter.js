import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userEmail = req.body.email;
      if (!userEmail || !userEmail.includes("@")) {
        return res.status(422).json({ message: "Invalid email address" });
      }

      const client = await MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db();

      await db.collection("emails").insertOne({ email: userEmail });

      client.close();

      return res.status(201).json({ message: "Signed up" });
    } catch (err) {
      console.error(err);
      console.log(err.message);
      return res.status(400).json({ message: "Bad request" });
    }
  }
}

export default handler;
