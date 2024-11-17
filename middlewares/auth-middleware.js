const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const envConfig = require("../configs/env.config");

dotenv.config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, envConfig.jwtSecret);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", message: error.message });
  }
};
