const mongoose = require("mongoose");

const dbConnect = async function () {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnect;
