// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, default: "" },
    role: { type: String, enum: ["Admin", "Viewer"], default: "Viewer" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
