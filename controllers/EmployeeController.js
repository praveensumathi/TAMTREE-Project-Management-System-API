const EmployeeModel = require('../database/models/Employee');

exports.createEmployee = async (req, res) => {

    const { employeeId, firstName, lastName, email, age, gender, contact, address } = req.body
    
    const employee = await EmployeeModel.create({
        employeeId, firstName, lastName, email, age, gender, contact, address
    })
    res.json(employee)
}

exports.updateEmployee = async (req, res) => {
    const id = req.params.id
    const { employeeId, firstName, lastName, email, age, gender, contact, address } = req.body

    const updatedEmployee = { employeeId, firstName, lastName, email, age, gender, contact, address }
    const employee = await EmployeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true })
    res.json(employee)
}

exports.deleteEmployee = async (req, res) => {
    const id = req.params.id
    const result = await EmployeeModel.findByIdAndDelete(id)
    res.json(result)
}

exports.getEmployee = async (req, res) => {
    const employee = await EmployeeModel.find({})
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