import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address" });
    }

    let client;

    try {
      client = await connectDatabase();
      if (client){
        console.log('Database Connected!');
      }
    } catch (err) {
      res.status(500).json({ message: "Connecing to the database failed" });
      console.log('Connection to the database failed');
      return;
    }

    try {
      const response = await insertDocument(client, 'newsletter', { email: userEmail });
      if (response){
        console.log('Email successfully registered');
      }
      await client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
      console.log('Unable to register email')
      return;
    }

    return res.status(201).json({ message: "Signed up" });
  }
}

export default handler;
