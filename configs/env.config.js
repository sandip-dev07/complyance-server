const dotenv = require("dotenv");
dotenv.config();

const _config = {
  port: process.env.PORT || 8080,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

const envConfig = Object.freeze(_config);

module.exports = envConfig;
