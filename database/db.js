import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function myMongoDB() {
  const myDB = {};
  const MONGODB_URI = process.env.MONGODB_URI;
  const DB_NAME = "deals";
  const COllCECTION_1 = "beauty";

  const client = new MongoClient(MONGODB_URI);

  async function connect() {
    try {
      await client.db(DB_NAME).command({ serverStatus: 1 });
    } catch (error) {
      await client.connect();
      console.log("Connected to MongoDB");
    }
    return client.db(DB_NAME);
  }


  myDB.closeConnection = async () => {
    if (client.isConnected()) {
      await client.close();
    }
  };

  myDB.connect = connect;
  return myDB;
}

export default myMongoDB();
