const mongoose = require("mongoose");
const { verifyToken } = require("../middleware/jwt");

const loginSchema = new mongoose.Schema({
    id:{
        type:Number,
        required: [true,"User Number is required."],
        maxLength: 10
    },
    password:{
        type:String,
        required: [true,"Password is required."]
    }
})

const loginModel = mongoose.model('Login', loginSchema);

function login(){}


login.prototype.createUser = (obj, callback) => {
    loginModel.find({id: obj.id}, (error, data) => {
        if(error){
            callback(error, null);
        }
        else{
            let newLogin = new loginModel(obj);
            newLogin.save((err, data) => {
                if(err){
                    console.log(err);
                    callback(err, null);
                }
                else{
                    var response = {success: true, message: "User login successull", data:""}
                    callback(null, response)
                }
            })
        }
    })
}

login.prototype.findUser = ((obj,callback) =>{
    loginModel.findOne(obj,(error,data) => {
        if(error){
            callback(error, null)  //data will be null
        }
        else{
            // verifyToken();
            console.log(data)
            console.log(data.password," :  ", obj)
            if(data.password == obj.password){
                var response = {success: true, message:"UserName exists.", data: data}
                callback(null,response);
            }else{
                var response = {success: false, message:"UserName doesnt exists Password incorrect.", data: ""}
                callback(response,null)
            }
          
            
        }
    })
})

module.exports = new login()