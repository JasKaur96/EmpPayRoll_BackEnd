//micro and other services required in emp. eg jwt
const empOpr = require("../models/empModel")

exports.registration = (data,callback) =>{
    empOpr.register(data,(error,result) =>{
        if(error){
            callback(error,null)
        }else{
            callback(null, result)
        }
    })
}

exports.findAllEmp = (data,callback) =>{
    empOpr.findAll(data,(error,result) =>{
        if(error){
            callback(error,null)
        }else{
            callback(null, result)
        }
    })
}

exports.deleteEmployee = (id,callback) => {
    empOpr.deleteEmp(id,(error,result) => {
        if(error){
            callback(error,null)
        }else{
            callback(null, result)
        }
    })
}

exports.findAndUpdateEmp = (id,data,callback) =>{
    empOpr.updateEmp(id,data,(error,result) =>{
        if(error){
            callback(error,null)
        }else{
            callback(null, result)
        }
    })
}


exports.findEmp = (data,callback) =>{
    empOpr.findEmpById(data,(error,result) =>{
        if(error){
            callback(error,null)
        }else{
            callback(null, result)
        }
    })
}