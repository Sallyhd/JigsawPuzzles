const mongoose = require("mongoose");
require("dotenv").config();

const storeSchema= mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    puzzlePrice:{
        type:Number,
        required:true,
        min:0
    }
});

const puzzleSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    numPieces:{
        type:Number,
        required:true,
        min:0,
        max:5000
    },
    Stores:{
        type:[storeSchema]
    }

});

mongoose.model(process.env.PUZZLE_SCHEMA_NAME,puzzleSchema,process.env.DB_PUZZLE_COLLECTION);
