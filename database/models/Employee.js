const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employeeId: String,
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    gender: String,
    contact: Number,
    address: String
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema)

module.exports = EmployeeModel 