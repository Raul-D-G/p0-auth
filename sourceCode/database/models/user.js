const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    rol: String,
    mail: String,
    parola: String,
    nume: String,
    adresa: String,
    cui: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        // delete ret.parola;
        delete ret.__v;
        ret.id = ret._id; // Adaugă câmpul id bazat pe _id
        delete ret._id; // Șterge câmpul _id
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
