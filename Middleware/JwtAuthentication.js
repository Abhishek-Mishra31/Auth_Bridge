const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(500).json("Token not found");
  }

  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const data = jwt.verify(token, process.env.secret_key);
    req.user = data;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = async (userData) => {
  return jwt.sign(userData, process.env.secret_key);
};

module.exports = { generateToken, jwtMiddleware };
