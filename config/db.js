const mongoose = require("mongoose");

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connecting to ${db.connection.host} on ${db.connection.port}`.cyan
        .underline.bold
    );
  } catch (error) {
    console.log("Error connecting to MongoDB:".red.bold);
    console.log(`${error.message}`.red.bold);
    process.exit(1);
  }
}

module.exports = connectDB;
