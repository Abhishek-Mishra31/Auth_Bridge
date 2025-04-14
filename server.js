require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./Db");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 1000;
const path = require("path");

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/user/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/userSignup.html"));
});

app.get("/user/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/userLogin.html"));
});

app.get("/employee/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/employeeSignup.html"));
});

app.get("/employee/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/employeeLogin.html"));
});

const userRoutes = require("./Routes/userRoutes");
const employeeRoutes = require("./Routes/employeeRoutes");

app.use("/user", userRoutes);
app.use("/employee", employeeRoutes);

app.listen(port, () => {
  console.log(`listening on port number : ${port}`);
});
