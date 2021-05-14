const mongoose = require("mongoose");
const validator = require("express-validator");
const { response } = require("express");

const empSchema = new mongoose.Schema({
    _name:{
        type:String,
        required: [true,"Employee Name is required."],
        maxLength: 30
    },
    _profile_image:{
        type:String
    },
    _gender:{
        type: String,
        required:true
    },
    _department:{
        type: Object,
        required: true
    },
    _salary:{
        type:Number,
        required: true
    },
    _startDate:{ 
        type : String
    },

    _notes:{
        type:String,
        // required:true
    },
    _phoneNo:{
        type:String,
        required: [true,"User Number is required."],
        maxLength: 30
    },
    _password:{
        type:String,
        required: [true,"Password is required."]
    }
})


const empModel = new mongoose.model('Employee', empSchema);

function empOperation(){}

empOperation.prototype.register = (obj, callback) => {
    console.log("In MOdel",obj)
    empModel.find({_name: obj._name},(error,data) => {
        if(error){
            console.log("Inside if ",obj)
            callback(error, null)  //data will be null
        }
        else{
            console.log("Inside else ",obj)
            if(data.length >0){
                // console.log("Inside else....if",obj)
                callback({success: false, message:"Name already exists", data:""})
            }else{
                console.log("Inside else....else ",obj)
                var newEmp = new empModel(obj)
                newEmp.save((err,data) => {
                    console.log("Inside newEmp Save ",obj)
                    if(err){
                       console.log("Inside Model error ",err)
                       
                       callback(err,null);

                    }else{
                        console.log("Inside Model data save ",obj)
                        var response = {success: true, message:"Emp registered successful", data: ""};
                        callback(null,response);
                    }
                    })
            }
        }
    })
}


empOperation.prototype.findAll = ((obj,callback) =>{
    empModel.find({},(error,data) => {
        if(error){
            callback(error, null)  //data will be null
        }
        else{
            var response = {success: true, message:"Name exists", data: data}
            callback(null,response);
        }
    })
})


empOperation.prototype.deleteEmp =((obj,callback) =>{
    empModel.findByIdAndDelete(obj,(error,result) =>{
        if(error){
            callback(error ,null);
          }else {
            callback(null ,result);
          }
    })
})

empOperation.prototype.updateEmp = ((id,data,callback) =>{
    console.log("Id = ",id,"  data : ",data)
    let newData = JSON.stringify(data);
    console.log("Newdata : ",newData)
    empModel.findByIdAndUpdate(id,data,{new:true},(error,result) => {
        if (error){
            console.log("error in Model", error)
            callback(error ,null);
          }else {
            console.log("result in Model", result)
            callback(null ,result);
          }
      });
})


empOperation.prototype.findEmpById = ((obj,callback) =>{
    empModel.findById(obj,(error,data) => {
        if(error){
            callback(error, null)  //data will be null
        }
        else{
            var response = {success: true, message:"Name exists", data: data}
            callback(null,response);
        }
    })
})

module.exports = new empOperation();
