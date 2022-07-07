const express = require("express");
const app=express();
require("dotenv").config();
const route = require("./route");

app.use(express.json());
const _sendResHeaders=function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Methods","PUT,GET,DELETE,POST");
    res.header("Access-Control-Allow-Headers","Content-Type,Accept");
    next();
};

app.use((req,res,next)=>_sendResHeaders(req,res,next));
app.use(process.env.API_ROUTE,route);


const server =app.listen(process.env.SERVER_PORT,function(){
    let port = server.address().port;
    console.log(process.env.SERVER_RUN_MSG,port);
});