import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI;

  const DBName = "deals"
  const CollName_Deal = "dealinfo"
  const CollName_Comment = "comment"

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


  myDB.createDeal = async (deal) => {
    const db = await connect();
    return await db.collection(CollName_Deal).insertOne(deal);
};

  myDB.getDeals = async (query = {}) => {
    const db = await connect();
    const dealCol = db.collection(CollName_Deal);
    const deals = await dealCol.find(query).toArray();
    return deals;
  };

  myDB.getDealById = async (dealId) => {
    const db = await connect();
    const dealCol = db.collection(CollName_Deal);
    const deal = await dealCol.findOne({ _id: new ObjectId(dealId) });
    return deal;
  };

  myDB.updateDeal = async function (id, updateData) {

    const db = await connect();
    const result = await db.collection(CollName_Deal).updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return result;
  };

  // myDB.deleteDeal = async function (id) {
  //   const db = await connect();
  //   const dealCol = db.collection(CollName_Deal);
  //   const deal = await dealCol.deleteOne({ _id: new ObjectId(id) });
  //   return deal;
  // };

  // myDB.deleteDeal = async function (id) {
  //   const db = await connect();
  
  //   try {
  //     // Delete the deal
  //     const dealResult = await db.collection(CollName_Deal).deleteOne({ _id: new ObjectId(id) });
  
  //     // If the deal was deleted, delete related comments
  //     let commentsResult = null;
  //     if (dealResult.deletedCount === 1) {
  //       commentsResult = await db.collection(CollName_Comment).deleteMany({ dealId: new ObjectId(id) });
  //     }
  
  //     // Return both results
  //     return {
  //       dealResult,
  //       commentsResult,
  //     };
  //   } catch (error) {
  //     console.error("Error deleting deal and/or related comments:", error);
  //     throw error; // Rethrow so this can be handled by the caller
  //   }
  // };
  

  myDB.deleteDeal = async function (id) {
    const db = await connect();
    const session = client.startSession();
  
    let deleteResult = {
      dealResult: null,
      commentsResult: null,
    };
  
    try {
      await session.withTransaction(async () => {
        deleteResult.dealResult = await db.collection(CollName_Deal).deleteOne({ _id: new ObjectId(id) }, { session });

        if (deleteResult.dealResult.deletedCount === 1) {
          deleteResult.commentsResult = await db.collection(CollName_Comment).deleteMany({ dealId: id }, { session });
        }
      });
    } catch (error) {
      console.error("Error occurred during transaction, it will be aborted:", error);
      throw error; // Rethrow so this can be handled by the caller
    } finally {
      await session.endSession(); // End the session
    }
    return deleteResult;
  };



  myDB.getDealsByCategory = async (category) => {
    const db = await connect();
    const deals = await db.collection(CollName_Deal).find({ category }).toArray();
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
