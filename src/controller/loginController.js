const { generateToken } = require("../middleware/jwt");
const services = require("../services/loginService")

exports.createLogin = (req,res) => {
     req.check('id').not().isEmpty().isLength({min:10,max:10}).withMessage("PhoneNO. cannot be empty")
     console.log("From controller",req.body)
     const error = req.validationErrors()
         if(error.length > 0 ){
             return res.status(422).json({ success: false, message : error[0].msg})                    //smd
         }
         else{
             services.createLoginUser(req.body, (error,result) => {
                 if(error){
                     return res.status(500).send(error);
                 }
                 else{
                     return res.status(200).send(result);
                 }  
             })
         }    
}

exports.userLogin = (req, res) => {
    // const user = {
    //     // email:req.body.id,
    //     // password: req.body.password
    //     id: 9321444798,
    //     password: "Admin@1234"
    // };

    services.loginUser(req.body,(error,data) => {
        if(error){
            return res.status(400).send(error)
        }else{
            return res.status(200).send({success : true, message: 'Login successfull!', Token: generateToken(data)})
        }
    })
}