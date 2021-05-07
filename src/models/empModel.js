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
        type:String,
        required:true,
    },
    _gender:{
        type: String,
        required:true
    },
    _department:{
        type:String,
        required: true
    },
    _salary:{
        type:Number,
        required: true
    },
    _startDate:{ 
        type : Date
    },

    // _phone:{
    //     type:Number,
    //     min:10,
    //     require:true,
    // },
    _notes:{
        type:String,
        // required:true
    }
})


const empModel = new mongoose.model('Employee', empSchema);

function empOperation(){}

empOperation.prototype.register = (obj, callback) => {
    empModel.find({_name: obj._name},(error,data) => {
        if(error){
            callback(error, null)  //data will be null
        }
        else{
            if(data.length >0){
                callback({success: false, message:"Name already exists", data:""})
            }else{
                var newEmp = new empModel(obj)
                newEmp.save((err,data) => {
                    if(err){
                       callback(err,null);
                    }else{
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
    
    empModel.findByIdAndUpdate(id,data,{new:true},(error,result) => {
        if (error){
            callback(error ,null);
          }else {
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
