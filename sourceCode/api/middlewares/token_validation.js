const { verify } = require("jsonwebtoken");

const { APP_SECRET } = require("../../config");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
      token = token.slice(7);
      verify(token, APP_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({
            error: "Acesul nu este permis! Token invalid",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({
        error: "Acesul nu este permis! Lipseste Token-ul",
      });
    }
  },
};
