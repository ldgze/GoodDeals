import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI;

  const DBName = "deals"
  const CollName_Beauty = "beauty"
  const CollName_Comment = "comment"
  // const CollName_Grocery = "grocery"
  // const CollName_Fashion = "fashion"
  // const CollName_Electronics = "electronics"

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

  // const getCollection = (category) => {
  //   switch (category.toLowerCase()) {
  //     case 'beauty':
  //       return CollName_Beauty;
  //     case 'grocery':
  //       return CollName_Grocery;
  //     case 'fashion':
  //       return CollName_Fashion;
  //     case 'electronics':
  //       return CollName_Electronics;
  //     default:
  //       throw new Error(`No collection found for category: ${category}`);
  //   }
  // };

  
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

  myDB.updateDeal = async function (id, updateData) {

    const db = await connect();
    const result = await db.collection(CollName_Beauty).updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return result;
  };

  myDB.deleteDeal = async function (id) {
    const db = await connect();
    const dealCol = db.collection(CollName_Beauty);
    const deal = await dealCol.deleteOne({ _id: new ObjectId(id) });
    return deal;
  };

  myDB.getDealsByCategory = async (category) => {
    const db = await connect();
    const deals = await db.collection(CollName_Beauty).find({ category }).toArray();
    return deals;
  };

  myDB.createComment = async (comment) => {
    const db = await connect();
    return await db.collection(CollName_Comment).insertOne(comment);
  };
  
  myDB.getCommentsByDealId = async (dealId) => {
    const db = await connect();
    return await db.collection(CollName_Comment).find({ dealId }).toArray();
  };
  
  myDB.deleteComment = async (commentId) => {
    const db = await connect();
    return await db.collection(CollName_Comment).deleteOne({ _id: new ObjectId(commentId) });
  };

  myDB.closeConnection = async () => {
    if (client.isConnected()) {
      await client.close();
    }
  };

  myDB.connect = connect;
  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
