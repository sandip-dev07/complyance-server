const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const authController = require("../controllers/user-controller");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/country", authMiddleware, authController.updateCountry);

module.exports = router;
