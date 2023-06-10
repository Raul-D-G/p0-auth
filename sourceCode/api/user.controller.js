const {
  create,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.parola = hashSync(body.parola, salt);

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: results,
      });
    });
  },

  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Inregistrarea nu a fost gasita",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.parola = hashSync(body.parola, salt);

    updateUser(body, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!res) {
        return res.json({
          success: 0,
          message: "Nu s-a realizat modificarea",
        });
      }
      return res.json({
        success: 1,
        message: "Modificare realizata",
      });
    });
  },

  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Inregistrarea nu afost gasita",
        });
      }
      return res.json({
        success: 1,
        message: "User sters",
      });
    });
  },

  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.mail, (err, results) => {
      // console.log(results);
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Probleme server!",
        });
      }
      if (!results) {
        return res.status(404).json({
          error: "Date autentificare incorecte!",
        });
      }
      const result = compareSync(body.parola, results.parola);
      if (result) {
        results.parola = undefined;
        const jsontoken = sign({ user: results }, process.env.QWE, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          success: 1,
          message: "Autentificare reușită!",
          token: jsontoken,
        });
      } else {
        return res.status(402).json({
          error: "Date autentificare incorecte!",
        });
      }
    });
  },
};
