const jwt = require("jsonwebtoken");
const envConfig = require("../configs/env.config");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, country: user.country },
    envConfig.jwtSecret,
    { expiresIn: "1h" }
  );
};

module.exports = { generateToken };
