const express = require("express")
const router = express.Router()
const EmployeeController = require("../controllers/EmployeeController")


const use = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res)).catch(next)

router.post("/createEmployee",
    use(EmployeeController.createEmployee))
router.put("/updateEmployee/:id",
    use(EmployeeController.updateEmployee))
router.delete("/deleteEmployee/:id",
    use(EmployeeController.deleteEmployee))
router.get("/getEmployee",
    use(EmployeeController.getEmployee))
router.get("/employeeBasicDetails",
    use(EmployeeController.getEmployeeBasicDetails))

module.exports = router