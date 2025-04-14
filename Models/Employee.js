const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  position: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true
  },

  salary: {
    type: Number,
    required: true,
  },
});

employeeSchema.pre("save", async function (next) {
  const employee = this;
  if (!employee.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(employee.password, salt);
    employee.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

employeeSchema.methods.comparePassword = async function (employeePassword) {
  try {
    const isMatch = await bcrypt.compare(employeePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;
