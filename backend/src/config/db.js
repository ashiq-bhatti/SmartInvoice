import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const mongoUrl = process.env.MONGO_URI;
    if (!mongoUrl) throw new Error("MONGO_URI not defined in .env");
 
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully!!");
  } catch (err) {
    console.error("MongoDB connection error!!", err);
    process.exit(1);
  }
};

export default dbConnection;