const express = require("express");
const cors = require("cors");

const userRouter = require("./api/user.router");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  app.use("/api/users", userRouter);

  // error handling
};
