//All queries related to the entity.
const services = require("../services/empService") 
const validator = require("express-validator");

exports.registration = (req,res) =>{
    // req.check('_name').not().isEmpty().isLength({min:5,max:30}).withMessage("First Name must not be empty")
    console.log("From controller",req.body)
    const error = req.validationErrors()
        if(error.length > 0 ){
            return res.status(422).json({ success: false, message : error[0].msg})                    //smd
        }
        else{
            services.registration(req.body, (error,result) => {
                if(error){
                    return res.status(500).send(error);
                }
                else{
                    return res.status(200).send(result);
                }  
            })
        }    
}

exports.findAllEmp = (req, res, next) => {
        services.findAllEmp(req.body, (error,result) => {
            if(error){
                return res.status(500).send(error);
            }
            else{
                return res.status(200).send(result)//smd
     
            }  
        })
}

exports.deleteEmpId = (req, res) => {
        services.deleteEmployee(req.params.id, (error,result) => {
           if(result === null){
               return res.status(404).json({success: false, message : "Id not found",data: req.params.id})        
           }
            else{
                return res.status(200).send({success: true, message : "Employee data Deleted successfully"})                                             
            }  
        })
}

exports.updateEmp = (req, res) => {
    console.log("Body : ",req.body)
    const empData ={
        _name : req.body._name,
        _profile_image : req.body._profile_image,
        _gender : req.body._gender,
        _department : req.body._department,
        _salary: req.body._salary,
        _startDate: req.body._startDate,
        _notes: req.body._notes
   };
   console.log("In update controller")
   if(!empData) {
    console.log("Inside !empData controller",empData)
    return res.status(400).json({success: false, message: "Fields content cannot be empty"});
   }
    services.findAndUpdateEmp(req.params.id,empData,(error,result)=>{
        if(result === null)
        {
            console.log("Inside if controller",empData)
            res.status(404).json({success: false, message: "Emp Not Found With the ID", data: req.params.id});
        }else {
            
            console.log("Inside else controller",empData)
            res.status(200).send({success: true, message: "Emp Found And Updated", data: result});
        }
    })
}



exports.findOneEmp = (req, res) => {
    services.findEmp(req.params.id, (error,result) => {
        if(error){
            return res.status(500).send(error);
        }
        else{
            return res.status(200).send(result)//smd
 
        }  
    })
}