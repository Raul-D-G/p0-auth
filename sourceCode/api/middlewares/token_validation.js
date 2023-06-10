const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("Authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.QWE, (err, decoded) => {
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
