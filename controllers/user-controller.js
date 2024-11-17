const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../utils/token-generate");
const handleError = require("../utils/error-response");

// Register
exports.register = async (req, res) => {
  const { username, password, role, country } = req.body;

  if (!username || !password || !role || !country) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      country,
    });
    const savedUser = await newUser.save();

    const token = generateToken({
      id: savedUser._id,
      username: savedUser.username,
      role: savedUser.role,
      country: savedUser.country,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
        country: savedUser.country,
      },
      token,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      id: user._id,
      username: user.username,
      role: user.role,
      country: user.country,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        country: user.country,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Update user's country
exports.updateCountry = async (req, res) => {
  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ error: "Country is required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { country },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = generateToken({
      id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role,
      country: updatedUser.country,
    });

    res.json({
      message: "Country updated successfully",
      token,
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
        country: updatedUser.country,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};
