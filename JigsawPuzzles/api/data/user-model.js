const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    }
});

mongoose.model(process.env.USER_SCHEMA, userSchema, process.env.USERS_SCHEMA_COLL);
