const mongoose = require("mongoose");
require("./puzzle-model");
require("./user-model");
require("dotenv").config();

mongoose.connect(process.env.DB_URL);
mongoose.connection.on(process.env.CONNECTED,function(){
    console.log(process.env.DB_CONN_MSG);
});

mongoose.connection.on(process.env.DISCONNECTED,function(){
    console.log(process.env.DB_DISCONN_MSG);
});
mongoose.connection.on(process.env.ERROR,function(err){
    console.log(process.env.DB_ERR_MSG,err);
});

process.on(process.env.SIGINT,function(err){
    mongoose.connection.close();
    console.log(process.env.DB_SIGINT_MSG);
    process.exit(0);
});

process.on(process.env.SIGTERM, function() {
    mongoose.connection.close(function() {
    console.log(process.env.SIGTERM_MESSAGE);
    process.exit(0);
});
});
    

module.exports=mongoose;