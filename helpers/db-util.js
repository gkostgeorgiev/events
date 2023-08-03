import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (client) {
    console.log("DB connected");
  }
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  if (db) {
    console.log("connected");
  }

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
