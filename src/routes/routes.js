const express = require('express');
const router = express.Router();
const empController = require("../controller/empController")

router.post('/register',empController.registration);

router.get("/register", empController.findAllEmp);

router.delete("/register/:id",empController.deleteEmpId);

router.put("/register/:id", empController.updateEmp);

router.get("/register/:id", empController.findOneEmp);

module.exports = router