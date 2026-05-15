const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use Google DNS to bypass local network SRV query blocks
dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("🔥 ACTUAL MONGO_URI USED =", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn.connection.host} 😎`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
