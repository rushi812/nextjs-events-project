import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://rushi812:0xsgozX4Vmtkx6z5@cluster0.8btyp9c.mongodb.net/events?retryWrites=true&w=majority";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(uri);
  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db(); // need to add the db name if not added in the connection url
  const res = await db.collection(collection).insertOne(document);
  return res;
};

export const getAllDocuments = async (
  client,
  collection,
  sort,
  filter = {}
) => {
  const db = client.db();
  const res = await db.collection(collection).find(filter).sort(sort).toArray();
  return res;
};
