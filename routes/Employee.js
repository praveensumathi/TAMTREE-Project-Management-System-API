const express = require("express")
const router = express.Router()
const EmployeeController = require("../controllers/EmployeeController")


const use = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res)).catch(next)

router.post("/createEmployee",
    use(EmployeeController.CreateEmployee))
router.put("/updateEmployee/:employeeId",
    use(EmployeeController.UpdateEmployee))
router.delete("/deleteEmployee/:employeeId",
    use(EmployeeController.DeleteEmployee))
router.get("/getEmployee",
    use(EmployeeController.GetEmployee))

module.exports = router