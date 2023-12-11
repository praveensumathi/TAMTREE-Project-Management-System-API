const express = require('express');
const { EmployeeModel, AddressModel } = require('../database/models/Employee');

exports.createEmployee = async (req, res) => {

    const employee = await EmployeeModel.create({
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address
    })
    res.json(employee)
}

exports.updateEmployee = async (req, res) => {
    const employeeId = req.params.employeeId

    const updatedEmployee = {
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address
    }

    const employee = await EmployeeModel.findByIdAndUpdate(employeeId, updatedEmployee, { new: true })
    res.json(employee)
}

exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.employeeId

    const deleteEmployee = {
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address
    }
    const employee = await EmployeeModel.findByIdAndDelete(employeeId, deleteEmployee, { new: true })
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