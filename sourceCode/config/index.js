// const dotEnv = require("dotenv");

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

const NODE_ENV_PROD = "prod";

module.exports = {
  PORT: process.env.PORT || 8001,
  MONGO_URL: process.env.MONGO_HOSTS || "localhost",
  MONGO_PORT: process.env.MONGO_PORT || "27017",
  APP_SECRET: process.env.APP_SECRET || "test",
  MONGO_USER: process.env.MONGODB_ADMINUSERNAME,
  MONGO_PASS: process.env.MONGODB_ADMINPASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  NODE_ENV_PROD: NODE_ENV_PROD,
};
