const {
  createUser,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  login,
} = require("./user.controller");
const { checkToken } = require("./middlewares/token_validation");

const router = require("express").Router();

router.post("/", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByUserId);
router.patch("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);

router.post("/login", login);

module.exports = router;
