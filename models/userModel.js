const { Timestamp } = require("mongodb");
const mongoose = require("../config/dbConnection");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: false,
    },
  }
);

//Create and Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
