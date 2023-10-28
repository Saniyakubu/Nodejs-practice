const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MOGO_URI);

  console.log(`connected ${conn.connection.host}`);
};

module.exports = connectDB;
