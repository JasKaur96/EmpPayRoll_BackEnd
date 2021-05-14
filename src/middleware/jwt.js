let jwt = require("jsonwebtoken");

// const payload ={
//     id : 9321444798,
//     password: "Admin@1234"
// }



exports.generateToken = (payload) => {
    
payload ={
    id : 9321444798,
    password: "Admin@1234"
}
    return jwt.sign(payload, "secretkey", { expiresIn: "2d"})
    // return token;
}

exports.verifyToken = (req,res,next) =>{
    console.log("Header jwt",req.headers);
    console.log("Header token jwt",req.headers.Token)
    let token = req.headers.token;
    jwt.verify(token, "secretkey", (error,data) => {
        if(error){
            res.status(401).send('Unauthorized User.');
        }else{
            res.decoded = data;
            next();
        }
    })
}
