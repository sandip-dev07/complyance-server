const mongoose = require("mongoose");
const envConfig = require("./env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
