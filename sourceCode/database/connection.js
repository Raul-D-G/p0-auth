const mongoose = require("mongoose");
const { MONGO_URL, MONGO_PORT, MONGO_USER, MONGO_PASS } = require("../config");

module.exports = async () => {
  try {
    // URL-ul de conexiune la MongoDB
    const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}`;

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
