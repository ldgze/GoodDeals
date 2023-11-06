import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI;
  // || "mongodb://localhost:27017";

  const DBName = "deals"
  const CollName_Beauty = "beauty"

  const client = new MongoClient(uri);

  async function connect() {
    try {
      await client.db(DBName).command({ ping: 1 });
      console.log("Already connected to MongoDB");
    } catch (error) {
      console.log("Connecting to MongoDB");
      await client.connect();
    }
    return client.db(DBName);
  }

  // return { client, db: client.db(DBName) };
  
  myDB.createDeal = async (deal) => {
    const db = await connect();
    return await db.collection(CollName_Beauty).insertOne(deal);
};

  myDB.getDeals = async (query = {}) => {
    const db = await connect();
    const dealCol = db.collection(CollName_Beauty);
    const deals = await dealCol.find(query).toArray();
    return deals;
  };

  myDB.getDealById = async (dealId) => {
    const db = await connect();
    const dealCol = db.collection(CollName_Beauty);
    const deal = await dealCol.findOne({ _id: new ObjectId(dealId) });
    return deal;
  };


  myDB.closeConnection = async () => {
    if (client.isConnected()) {
      await client.close();
    }
  };

  myDB.updateDeal = async function (id, updateData) {

    const db = await connect();
    console.log("in db")
    console.log(id)
    console.log(updateData)
    const result = await db.collection(CollName_Beauty).updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    console.log('Updated quiz:', result);
    return result;

  };

  // myDB.deleteDeal = async function (id) {
  //   const { client, db } = connect();
  //   try {
  //     const result = await db.collection(CollectionBeauty).deleteOne({ "_id": new ObjectId(id) });
  //     return result;
  //   } finally {
  //     await client.close();
  //   }
  // };

  myDB.connect = connect;
  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
