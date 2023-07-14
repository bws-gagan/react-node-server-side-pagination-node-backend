const mongoose = require("mongoose");

const Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    usertype: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    contact: {
      type: String,
    },
    location: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
