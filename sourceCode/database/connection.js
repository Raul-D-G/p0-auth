const mongoose = require("mongoose");
const {
  MONGO_URL,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASS,
  NODE_ENV,
  NODE_ENV_PROD,
} = require("../config");

module.exports = async () => {
  try {
    // URL-ul de conexiune la MongoDB
    const mongoURL =
      NODE_ENV === NODE_ENV_PROD
        ? `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}`
        : `mongodb://${MONGO_URL}:${MONGO_PORT}`;

    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected");
  } catch (error) {
    console.error("Error ============ ON DB Connection");
    console.log(error);
  }
};
