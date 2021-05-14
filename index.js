//require modules/library'
const mongoose = require("mongoose");
const express = require('express');
const router = require('./src/routes/routes');
const expressValidator = require("express-validator");
const path = require('path');
const cors = require("cors");
// const bodyParser = require("body-parser");
const url = "mongodb://localhost:27017/empDb"

//app constants variables
const app = express() //instance of express generated
const port = "8000"  //or 8080

//config
//all config will be here


//routes
app.use(express.json())
app.use(expressValidator())
app.use(cors())
app.use('',router)

const client = mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false})
    .then(console.log("Connected succefully in db")).catch(err => {
            console.log("Error in connection", err);
    })

console.log("Server Test", client);
//server activation

app.listen(port,()=>{
    console.log(`Listening to requests on http://localhost:${port}`);
})