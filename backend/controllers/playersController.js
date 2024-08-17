const Player = require("../models/playersModel");

// This function gets me all the players present inside the MongoDB collection Users
exports.getAllPlayers = async (req, res) => {
  try {
    const players = Player.findAll();

    return res.status(200).json({
      success: true,
      data: players,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// This function updates a player by its id
exports.updatePlayerById = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findByIdAndUpdate(id);

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

exports.getPlayerById = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id);

    if (!player) {
      res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deletePlayerById = async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id);

    player.isDeleted = true;
    player.save();

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
