const express = require("express");

const {
  getAllPlayers,
  updatePlayerById,
  getPlayerById,
  deletePlayerById,
} = require("../controllers/playersController");

const router = express.Router();

router.get("/players", getAllPlayers);
router.get("/:id", getPlayerById);
router.put("/update/:id", updatePlayerById);
router.delete("/delete/:id", deletePlayerById);

module.exports = router;
