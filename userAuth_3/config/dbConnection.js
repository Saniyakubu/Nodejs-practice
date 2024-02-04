import mongoose from "mongoose";

const ConnectToDb = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI);
};

export default ConnectToDb;
