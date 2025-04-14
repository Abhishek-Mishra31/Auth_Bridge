const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/Experiment6";

const db = mongoose.connection;

mongoose.connect(url);

db.on("connected", () => {
  console.log("connected to database");
});

db.on("disconnected", () => {
  console.log("disconnected with database");
});

db.on("error", () => {
  console.log("error with database");
});

module.exports = db;
