import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_CONNECTION_STRING);
let weaponsCollection;

try {
  const db = client.db('genshin-tc');
  weaponsCollection = db.collection('weapons');

  console.log('DB successfully connected');
} catch (error) {
  console.log(error);
}

export { client, weaponsCollection };