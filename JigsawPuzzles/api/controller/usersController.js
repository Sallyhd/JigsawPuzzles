const mongoose = require("mongoose");
require("../data/db");
require("dotenv").config();
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const User = mongoose.model(process.env.USER_SCHEMA);
const _generateHash = function(password,salt){
    return bcrypt.hash(password,salt);
}
const _createUser=function(name,username,hashPass){
    return new Promise((resolve,reject)=>{
        let user = {
            name:name,
            username:username,
            password:hashPass
        };
        User.create(user)
            .then((createdUser)=>resolve(createdUser))
            .catch((err)=>reject(err));
    });
}
const addUser= function(req,res){
    const response={
        status:process.env.OK_STATUS,
        message:""
    };
    if(req.body && req.body.username && req.body.password){
        bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS,process.env.BASE_10))
                .then((salt)=>_generateHash(req.body.password,salt))
                .then((hashedPassword)=>_createUser(req.body.name,req.body.username,hashedPassword))
                .then((createdUser)=> _fillResponse(response,process.env.OK_STATUS,createdUser))
                .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
                .finally(()=> _sendResponse(response,res));
    }
    else{
        _fillResponse(response,process.env.USER_ERR_CODE,process.env.NOT_VALID_USERS_DATA);
        _sendResponse(response,res);
    }
}
const _checkIfUserFound = function(user,response){
    return new Promise((resolve,reject)=>{
        if(!user){
            _fillResponse(response,process.env.FORBIDDEN_CODE,process.env.AUTH_MSG);
           reject(response.message);
        }
        else{
            resolve(user);
        }
    });
}
const _checkAccountPassword = function(user,password,response){
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password)
            .then((matchPasswords)=>{
                if(matchPasswords){
                    _fillResponse(response,process.env.OK_STATUS,process.env.LOGGED_IN_SUCCESS);
                    resolve(user);
                }
                else{
                    _fillResponse(response,process.env.AUTHERIZATION_CODE,process.env.AUTH_MSG);
                    reject(response);
                }
            })
            .catch((err)=>reject(err));
    });
}
const _fillErrorResponseIfNotAlreadyAnError=function(response,statusCode,message){
    if(response.status >= parseInt(process.env.OK_STATUS,process.env.BASE_10) 
            && response.status <= parseInt(process.env.CLIENT_CLOSE_CODE,process.env.BASE_10)){
        _fillResponse(response, response.status,response.message);
    }
    else{
        _fillResponse(response, statusCode,message);
    }
}
const _generateToken=function(user,response){
    const token = jwt.sign({name:user.name},process.env.TOKEN_SECRET_KEY,
        {expiresIn:parseInt(process.env.TOKEN_EXPIRATION,process.env.BASE_10)});
    _fillResponse(response,process.env.OK_STATUS,token);
}
const login = function(req,res){
    const response ={
        status:process.env.OK_STATUS,
        message:""
    };

    if(req.body && req.body.username && req.body.password){
        User.findOne({username:req.body.username}).exec()
            .then((user)=> _checkIfUserFound(user,response))
            .then((userFound)=> _checkAccountPassword(userFound,req.body.password,response))
            .then((user)=>_generateToken(user,response))
            .catch((err)=>_fillErrorResponseIfNotAlreadyAnError(response,process.env.INTERNAL_ERR,err))
            .finally(()=> _sendResponse(response,res));
    }
    else{                           
        _fillResponse(response,process.env.USER_ERR_CODE,process.env.NOT_VALID_USERS_DATA);
        _sendResponse(response,res);
    }
}
const _fillResponse = function(response,code,message){
    response.status=code;
    response.message=message;
}
const _sendResponse=function(response,res){
    res.status(response.status).json(response.message);
}


module.exports={
    addUser,
    login
}