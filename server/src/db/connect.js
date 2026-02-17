import { MongoClient } from "mongodb";

const MONGO_URL = process.env.MONGO_URL || "mongodb://admin:password123@localhost:27018/todos?authSource=admin";
const DB_NAME = "complaints";
const COLLECTION_NAME = "complaints";

let mongocClient = null;
let mongoConn = null;

export async function initMongoDb() {
  try {
    mongocClient = new MongoClient(MONGO_URL);
    await mongocClient.connect();
    mongoConn = mongocClient.db(DB_NAME);
    
    const complaintsCollection = mongoConn.collection(COLLECTION_NAME);
    await complaintsCollection.createIndex({ id: 1 }, { unique: true });
    
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

export async function getDb() {
  if (!mongoConn) {
    if (!mongocClient) {
      mongocClient = new MongoClient(MONGO_URL);
      await mongocClient.connect();
    }
    mongoConn = mongocClient.db(DB_NAME);
  }
  return mongoConn;
}

export async function closeConnection() {
  if (mongocClient) {
    await mongocClient.close();
    mongocClient = null;
    mongoConn = null;
  }
}
