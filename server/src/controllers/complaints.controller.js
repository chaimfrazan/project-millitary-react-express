import { getDb } from "../db/connect.js";

const COLLECTION_NAME = "complaints";

export const getComplaints = async (req, res) => {
  try {
    const db = await getDb();
    const complaints = await db.collection(COLLECTION_NAME).find({}).toArray();
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const createComplaints = async (req, res) => {
  try {
    const { category, message  } = req.body;
    const db = await getDb();
    const now = new Date();

    const result = await db.collection(COLLECTION_NAME).insertOne({
      category,
      message,
      created_at: now,
    });

    const complaint = await db.collection(COLLECTION_NAME).findOne({ _id: result.insertedId });
    res.status(201).json({ success: true, data: complaint });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Duplicate title" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};


export const loginAdmin = async (req,res)=>{
try {
  const {password} = req.body
  const passEnv = process.env.PASSWORD_ADMIN
  console.log(passEnv)
  
} catch (error) {
  
}
}

