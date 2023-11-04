import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI;
  // || "mongodb://localhost:27017";

  const DBName = "deals"
  const CollectionBeauty = "beauty"

  const client = new MongoClient(uri);

  // function connect() {
  //   const client = new MongoClient(uri);
  //   const db = client.db(DBName);
  //   return { client, db };
  // }

  async function connect() {
    try {
      await client.db(DBName).command({ serverStatus: 1 });
    } catch (error) {
      await client.connect();
      console.log("Connected to MongoDB");
    }
    return client.db(DBName);
  }

  myDB.createDeal = async function (deal) {
    const { client, db } = connect();
    try {
      const result = await db.collection(CollectionBeauty).insertOne(deal);
      return result;
    } finally {
      await client.close();
    }
  };

  myDB.getDeals = async function (query = {}) {
    const { client, db } = connect();
    try {
      const deals = await db.collection(CollectionBeauty).find(query).toArray();
      return deals;
    } finally {
      await client.close();
    }
  };

  myDB.getDealById = async function (id) {
    const { client, db } = connect();
    try {
      const deal = await db.collection(CollectionBeauty).findOne({ "_id": new ObjectId(id) });
      return deal;
    } finally {
      await client.close();
    }
  };

  myDB.updateDeal = async function (id, updateData) {
    const { client, db } = connect();
    try {
      const result = await db.collection(CollectionBeauty).updateOne({ "_id": new ObjectId(id) }, { $set: updateData });
      return result;
    } finally {
      await client.close();
    }
  };

  myDB.deleteDeal = async function (id) {
    const { client, db } = connect();
    try {
      const result = await db.collection(CollectionBeauty).deleteOne({ "_id": new ObjectId(id) });
      return result;
    } finally {
      await client.close();
    }
  };

  myDB.connect = connect;
  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
