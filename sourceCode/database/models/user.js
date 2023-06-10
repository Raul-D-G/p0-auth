const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    role: String,
    email: String,
    password: String,
    name: String,
    address: String,
    cui: String,
    phone: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
