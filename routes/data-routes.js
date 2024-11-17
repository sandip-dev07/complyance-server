const express = require("express");
const dataController = require("../controllers/data-controller");
const roleMiddleware = require("../middlewares/role-middleware");

const router = express.Router();

// Routes
router.get("/", dataController.getDataByCountry);
router.post("/", roleMiddleware(["Admin"]), dataController.createData);
router.put("/:id", roleMiddleware(["Admin"]), dataController.updateData);
router.delete("/:id", roleMiddleware(["Admin"]), dataController.deleteData);

module.exports = router;
