const { Player } = require("../models/playersModel");
const { generateToken } = require("../middlewares/auth");

exports.registerPlayer = async (req, res) => {
  const { playername, email, password } = req.body;
  try {
    // player is a mongodb document
    const player = new Player({
      playername: playername,
      email: email,
      password: password,
    });

    // save this player inside mongodb. We are inserting the player mongodb document inside Player mongoDb collectin
    await player.save();

    // generate the token for this player who has just been registered for the quiz application
    const token = generateToken(player._id);

    res.status(201).json({
      success: true,
      token: token,
      data: player,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.loginPlayer = async (req, res) => {
  const { email, password } = req.body;
  try {
    // mongoDb operation to find the player
    const player = await Player.findOne({ email: email });

    if (player && (await player.matchPassword(password))) {
      const token = generateToken(player._id);

      res.json({
        success: true,
        token: token,
        data: player,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
