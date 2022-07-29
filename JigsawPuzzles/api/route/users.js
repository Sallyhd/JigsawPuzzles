const express = require("express");
const usersController = require("../controller/usersController");
const router=express.Router();

require("dotenv").config();

router.route("")
    .post(usersController.addUser);

router.route(process.env.LOGIN_ROUTE)
    .post(usersController.login);

module.exports=router;