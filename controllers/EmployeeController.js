const express = require('express');
const mongoose = require('mongoose');
const { EmployeeModel, AddressModel } = require('../database/models/Employee');

exports.CreateEmployee = async (req, res) => {
    const employee = await EmployeeModel.create({
        employeeId: req.body.employeeId,
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address
    })
    res.json(employee)
}

exports.UpdateEmployee = async (req, res) => {
    const employeeId = req.params.employeeId

    const updatedEmployee = {
        employeeId: req.body.employeeId,
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address
    }

    const employee = await EmployeeModel.findByIdAndUpdate(employeeId, updatedEmployee, { new: true })
    res.json(employee)

}

exports.DeleteEmployee = async (req, res) => {
    const employeeId = req.params.employeeId

    const deleteEmployee = {
        employeeId: req.body.employeeId,
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        contact: req.body.contact,
        address: req.body.address
    }

    const employee = await EmployeeModel.findByIdAndUpdate(employeeId, deleteEmployee, { new: true })
    res.json(employee)
}

