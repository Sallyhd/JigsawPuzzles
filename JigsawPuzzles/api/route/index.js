const express = require("express");
const router=express.Router();
const puzzleRouter = require("./puzzles");
const usersRouter = require("./users");
require("dotenv").config();

router.use(process.env.PUZZLE_ROUTE,puzzleRouter);
router.use(process.env.USER_ROUTE,usersRouter);


module.exports=router;