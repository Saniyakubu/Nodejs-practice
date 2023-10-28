const mongoose = require('mongoose');

const connectMongoDb = async () => {
  const connect = await mongoose.connect(process.env.MONGO_API_KEY);
  console.log(`mongDb has Connect: ${connect.connection.host}`);
};

module.exports = connectMongoDb;
