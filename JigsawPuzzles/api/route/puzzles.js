const express = require("express");
const router=express.Router();
const puzzleController = require("../controller/puzzleController");
const storesController = require("../controller/storesController");
const authController = require("../controller/authenticationController");
require("dotenv").config();

router.route("")
.get(puzzleController.getAll)
.post(authController.authenticate,puzzleController.addOne);

router.route(process.env.PUZZLE_GET_ONE)
.get(puzzleController.getOne)
.delete(authController.authenticate,puzzleController.deleteOne)
.put(authController.authenticate,puzzleController.fullUpdatePuzzle)
.patch(authController.authenticate,puzzleController.partialUpdatePuzzle);

router.route(process.env.STORE_ROUTE)
.get(storesController.getAll)
.post(storesController.addStore);

router.route(process.env.STORE_ID_ROUTE)
.get(storesController.getOne)
.delete(storesController.deleteStore)
.put(storesController.fullUpdateStore)
.patch(storesController.partialUpdateStore);

module.exports=router;