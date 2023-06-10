const { UserRepository } = require("../database");
const repository = new UserRepository();

// All Business logic will be here
module.exports = {
  create: (data, callBack) => {
    repository
      .CreateUser({
        rol: data.rol,
        mail: data.mail,
        parola: data.parola,
        nume: data.numeCompanie,
        adresa: data.adresaCompanie,
        cui: data.cuiCompanie,
      })
      .then((user) => {
        callBack(null, user);
      })
      .catch((error) => {
        callBack(error);
      });
  },

  getUserById: (userId, callBack) => {
    repository
      .GetUserById(userId)
      .then((user) => {
        callBack(null, user);
      })
      .catch((error) => {
        callBack(error);
      });
  },

  getUserByEmail: (userEmail, callBack) => {
    repository
      .GetUserByEmail(userEmail)
      .then((user) => {
        callBack(null, user);
      })
      .catch((error) => {
        callBack(error);
      });
  },

  getUsers: (callBack) => {
    repository
      .GetUsers()
      .then((users) => {
        callBack(null, users);
      })
      .catch((error) => {
        callBack(error);
      });
  },

  updateUser: (data, callBack) => {
    repository
      .updateUser(data)
      .then((results) => {
        return callBack(null, results);
      })
      .catch((error) => {
        return callBack(error);
      });
  },

  deleteUser: (userID, callBack) => {
    repository
      .deleteUser(userID)
      .then((deletedCount) => {
        callBack(null, deletedCount > 0);
      })
      .catch((error) => {
        callBack(error);
      });
  },
};
