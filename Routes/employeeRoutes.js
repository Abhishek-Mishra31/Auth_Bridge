const express = require("express");
const app = express.Router();
const Employee = require("../Models/Employee");
const {
  jwtMiddleware,
  generateToken,
} = require("../Middleware/JwtAuthentication");
const dotenv = require("dotenv");
dotenv.config();

app.get("/getEmployees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json({ employees });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.post("/signupEmployee", async (req, res) => {
  try {
    let success = false;
    let employeeData = new Employee(req.body);
    let response = await employeeData.save();

    const payload = {
      id: response.id,
    };

    const token = await generateToken(payload);
    success = true;
    res.json({ success: "Successfully employee created...", token: token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

app.post("/loginEmployee", async (req, res) => {
  try {
    let success = false;
    const { name, password } = req.body;
    const employee = await Employee.findOne({ name: name });

    if (!employee || !(await employee.comparePassword(password))) {
      return res.status(401).json({ error: "Incorrect Name or Password" });
    }

    const payload = {
      id: employee.id,
    };
    let token = await generateToken(payload);
    success = true;
    res.json({
      success: "successfully logged in..",
      employee: employee,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/updateEmployee", jwtMiddleware, async (req, res) => {
  try {
    const employeeData = req.user;
    const employeeId = employeeData.id;
    const { name, postion, salary } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { name, postion, salary },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Successfully Employee Updated..", updatedEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    await Employee.findByIdAndDelete(employeeId);
    res.status(200).json({ message: "Successfully Employee Deleted.." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = app;
