const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    employeeId: String,
    first_Name: String,
    last_Name: String,
    email: String,
    age: Number,
    gender: String,
    contact: Number,
    address: {
        district: String,
        state: String,
        zip_code: String,
        country: String
    }
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema)

module.exports = { EmployeeModel }