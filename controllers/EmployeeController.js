const express = require('express');
const { EmployeeModel, AddressModel } = require('../database/models/Employee');

exports.createEmployee = async (req, res) => {

    const { employeeId, firstName, lastName, email, age, gender, contact, address } = req.body

    const employee = await EmployeeModel.create({
        employeeId: employeeId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        gender: gender,
        contact: contact,
        address: address
    })
    res.json(employee)
}

exports.updateEmployee = async (req, res) => {
    const id = req.params.id

    const { employeeId, firstName, lastName, email, age, gender, contact, address } = req.body

    const updatedEmployee = {
        employeeId: employeeId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        gender: gender,
        contact: contact,
        address: address
    }

    const employee = await EmployeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true })
    res.json(employee)
}

exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.employeeId

    const employee = await EmployeeModel.findByIdAndDelete(employeeId, { new: true })
    res.json(employee)
}

exports.getEmployee = async (req, res) => {
    const employee = await EmployeeModel.find()
    res.json(employee)
}

exports.getEmployeeBasicDetails = async (req, res) => {
    const employee = await EmployeeModel.aggregate(
        [{
            $project: {
                employeeId: 1,
                name: {
                    $concat: [
                        "$firstName", " ", "$lastName"
                    ]
                }

            }
        }])
    res.json(employee)
}