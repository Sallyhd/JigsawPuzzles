const express = require("express");
const app=express();
require("dotenv").config();
const route = require("./api/route");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const _sendResHeaders=function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:4200");
    res.header("Access-Control-Allow-Methods","PUT,GET,DELETE,POST,PATCH");
    res.header("Access-Control-Allow-Headers","Content-Type,Accept,authorization");
    next();
};

app.use((req,res,next)=>_sendResHeaders(req,res,next));
app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(process.env.API_ROUTE,route);

const server =app.listen(process.env.SERVER_PORT,function(){
    let port = server.address().port;
    console.log(process.env.SERVER_RUN_MSG,port);
});