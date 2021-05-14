const express = require('express');
const router = express.Router();
const empController = require("../controller/empController")

const loginController = require("../controller/loginController");
const verify = require('../middleware/jwt');

router.post('/register',verify.verifyToken,empController.registration);

router.get("/findAll",verify.verifyToken, empController.findAllEmp);

router.delete("/deleteEmp/:id",verify.verifyToken,empController.deleteEmpId);

router.put("/updateEmp/:id", verify.verifyToken,empController.updateEmp);

router.get("/findOne/:id",verify.verifyToken, empController.findOneEmp);

router.post('/createlogin',loginController.createLogin); //add to bck

router.post('/login',loginController.userLogin); // check user exist


module.exports = router