const loginModel = require("../models/loginModel")


exports.createLoginUser = (userLogin,callback) => {
    loginModel.createUser(userLogin,(error, result) => {
        if(error){
            callback(error,null)
        }else{
            callback(null, result)
        }
    })
}

exports.loginUser = (userLogin,callback) => {
    loginModel.findUser(userLogin,(error, result) => {
        if(error){
            console.log(error)
            callback(error,null)
        }else{
            console.log(result)
            callback(null, result)
        }
    })
}