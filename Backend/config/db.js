const mongoose = require("mongoose");
const Connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB Connect Sucessful ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB Connection Failed");
  }
};
module.exports = Connectdb;
