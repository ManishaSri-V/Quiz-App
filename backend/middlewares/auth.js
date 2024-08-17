const jwt = require("jsonwebtoken");
const secretkey = "manisha123";

const generateToken = (player) => {
  return jwt.sign(
    {
      id: player.playername,
    },
    secretkey,
    {
      expiresIn: "48h",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, secretkey);
};

module.exports = {
  generateToken,
  verifyToken,
};
