const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wxlw6qm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => console.log("  db connection erreur ", err));


module.exports = mongoose
