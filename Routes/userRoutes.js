const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const {
  jwtMiddleware,
  generateToken,
} = require("../Middleware/JwtAuthentication");

router.post("/signup", async (req, res) => {
  try {
    let success = false;
    let userData = new User(req.body);
    let response = await userData.save();

    const payload = {
      id: response.id,
    };

    const token = await generateToken(payload);
    success = true;
    res.json({ success: "User Signup Done...", token: token });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let success = false;
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Incorrect Username or Password" });
    }

    const payload = {
      id: user.id,
    };
    let token = await generateToken(payload);
    success = true;
    res.json({ success: "User Login Successful..", user: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/profile", jwtMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
