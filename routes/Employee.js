const express = require("express")
const router = express.Router()
const EmployeeController = require("../controllers/EmployeeController")


const use = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res)).catch(next)

router.post("/createAddress",
    use(EmployeeController.CreateAddress))

router.post("/createAddress",
    use(EmployeeController.CreateEmployee))

module.exports = router